"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModePills from "./ModePills";

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/studio", label: "Studio" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <div className="min-h-screen bg-ink">
      {/* Header */}
      <header className="border-b border-glassStroke">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Tablature.io
            </Link>
            
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-glassStroke mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm opacity-60">
              © 2024 Tablature.io — AI-powered creative tools
            </div>
            <div className="flex items-center gap-4 text-sm opacity-60">
              <span>Built with Next.js + Vercel AI Gateway</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
