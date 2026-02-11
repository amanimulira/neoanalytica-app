"use client";
import { useState } from "react";

export default function SubscribeForm({ source = "website", magnetName }: { source?: string; magnetName?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, magnetName }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p style={{ color: "var(--accent)", fontSize: "14px", marginTop: "24px" }}>\u2713 Check your inbox!</p>;
  }

  return (
    <div className="ef">
      <input
        type="email"
        className="ei"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className="eb" onClick={handleSubmit} disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Download Free \u2192"}
      </button>
    </div>
  );
}
