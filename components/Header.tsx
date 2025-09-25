"use client";
import Link from "next/link";
import { useState } from "react";
import NavDrawer from "./NavDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="container py-3">
        <div className="glass flex items-center justify-between px-4 py-3">
          {/* Left: Logo + wordmark */}
          <Link href="/" className="flex items-center gap-3">
            {/* Simple SVG mark for now */}
            <div className="w-7 h-7 rounded-md bg-web flex items-center justify-center">
              <span className="text-black font-bold text-sm">T</span>
            </div>
            <span className="select-none" style={{
              letterSpacing: "-0.02em",
              fontWeight: 600,
              fontSize: "18px",
              WebkitFontSmoothing: "antialiased",
            }}>
              Tablature
            </span>
          </Link>

          {/* Right: Hamburger (always visible) + avatar stub */}
          <div className="flex items-center gap-3">
            <Link href="/profile" className="hidden md:inline-flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5">
              <div className="w-6 h-6 rounded-full bg-white/15" />
              <span className="text-white/80 text-sm">Account</span>
            </Link>

            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="btn border-white/10 hover:bg-white/10"
            >
              {/* minimalist hamburger */}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="white" strokeOpacity=".9" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <NavDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
