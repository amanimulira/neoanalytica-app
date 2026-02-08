"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LoginDetector() {
  const buffer = useRef("");
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      buffer.current += e.key;
      if (buffer.current.length > 10)
        buffer.current = buffer.current.slice(-10);
      if (buffer.current.includes("/login")) {
        buffer.current = "";
        router.push("/login");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
