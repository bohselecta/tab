"use client";
import Link from "next/link";
import { useEffect } from "react";
import clsx from "clsx";

export default function NavDrawer({ open, onClose }:{
  open: boolean; onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className={clsx("fixed inset-0 z-50 transition", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        className={clsx("absolute inset-0 bg-black/50 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <aside className={clsx(
        "absolute right-0 top-0 h-full w-[320px] p-4 glass translate-x-0 transition-transform",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="mt-2 space-y-1">
          <Link className="block px-3 py-2 rounded-md hover:bg-white/5" href="/studio">Studio</Link>
          <Link className="block px-3 py-2 rounded-md hover:bg-white/5" href="/gallery">Gallery</Link>
          <Link className="block px-3 py-2 rounded-md hover:bg-white/5" href="/docs">Docs</Link>
          <Link className="block px-3 py-2 rounded-md hover:bg-white/5" href="/profile">Profile</Link>
        </nav>
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="text-sm text-white/70">Mode Colors</p>
          <div className="mt-2 flex gap-2">
            <span className="badge" style={{borderColor:"#08B0D5", color:"#08B0D5"}}>Video</span>
            <span className="badge" style={{borderColor:"#F632B3", color:"#F632B3"}}>Audio</span>
            <span className="badge" style={{borderColor:"#7CFF8C", color:"#7CFF8C"}}>Web</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
