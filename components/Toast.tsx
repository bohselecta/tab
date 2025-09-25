"use client";
import { useState, useEffect } from "react";

export function useToast() {
  const [msg, setMsg] = useState<string | undefined>();
  
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(undefined), 1800);
    return () => clearTimeout(t);
  }, [msg]);
  
  return { msg, setMsg };
}

export function Toast({ msg }: { msg?: string }) {
  if (!msg) return null;
  
  return (
    <div className="fixed bottom-6 right-6 glass px-4 py-2 rounded-lg z-50">
      {msg}
    </div>
  );
}
