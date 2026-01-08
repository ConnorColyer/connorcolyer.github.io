import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0c10",
          900: "#111321",
          800: "#1a1d2b",
          700: "#2a2f3f",
          600: "#3f4559"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Satoshi", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 40px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top, rgba(99,102,241,0.2), transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;
