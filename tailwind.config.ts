import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./stories/**/*.{ts,tsx}"],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: { paper: "var(--paper)", ink: "var(--ink)", line: "var(--line)", muted: "var(--muted)", accent: "var(--accent)" },
      fontFamily: {
        sans: ["ABC Favorit", "Arial", "Helvetica", "sans-serif"],
        mono: ["ABC Favorit Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
