"use client";
import { useState } from "react";

interface SubscribeFormProps {
  source?: string;
  magnetName?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export default function SubscribeForm({
  source = "website",
  magnetName,
  buttonText = "Download Free →",
  placeholder = "you@company.com",
  className = "",
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, magnetName }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're in! Check your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-3 p-4 bg-accent-light rounded-lg ${className}`}>
        <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
        <span className="text-sm font-medium text-accent">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-accent transition-colors placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-3 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dim transition-all disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-500">{message}</p>
      )}
    </form>
  );
}
