import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F14",
        inkAlt: "#0C1219",
        glass: "rgba(255,255,255,0.06)",
        glassStroke: "rgba(255,255,255,0.12)",
        subtle: "#9FB2C8",
        video: "#08B0D5",
        audio: "#F632B3",
        web:   "#7CFF8C",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 12px 40px rgba(0,0,0,0.45)",
      },
      borderRadius: { xl2: "1.25rem" },
      fontFamily: {
        // Use system stack for "Mac-like"; swap to 'Inter var' if you add it.
        ui: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
    },
  },
  plugins: [],
} satisfies Config;
