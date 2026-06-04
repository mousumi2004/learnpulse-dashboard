import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#050505",
          900: "#0a0b0c",
          850: "#101214",
          800: "#171a1d",
          700: "#252a2f"
        },
        signal: {
          cyan: "#63f3ff",
          amber: "#ffbf5f",
          green: "#8fffcb"
        }
      },
      boxShadow: {
        "signal-cyan": "0 0 0 1px rgba(99,243,255,0.18), 0 28px 80px rgba(99,243,255,0.08)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
