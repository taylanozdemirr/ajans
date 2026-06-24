/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

/** Wrap an OKLCH component-triplet CSS var so /opacity utilities work. */
const oklchVar = (name) => `oklch(var(${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,astro}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bodoni Moda"', 'ui-serif', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        border: oklchVar("--border"),
        input: oklchVar("--input"),
        ring: oklchVar("--ring"),
        background: oklchVar("--background"),
        foreground: oklchVar("--foreground"),
        primary: {
          DEFAULT: oklchVar("--primary"),
          foreground: oklchVar("--primary-foreground"),
        },
        secondary: {
          DEFAULT: oklchVar("--secondary"),
          foreground: oklchVar("--secondary-foreground"),
        },
        destructive: {
          DEFAULT: oklchVar("--destructive"),
          foreground: oklchVar("--destructive-foreground"),
        },
        muted: {
          DEFAULT: oklchVar("--muted"),
          foreground: oklchVar("--muted-foreground"),
        },
        accent: {
          DEFAULT: oklchVar("--accent"),
          foreground: oklchVar("--accent-foreground"),
        },
        popover: {
          DEFAULT: oklchVar("--popover"),
          foreground: oklchVar("--popover-foreground"),
        },
        card: {
          DEFAULT: oklchVar("--card"),
          foreground: oklchVar("--card-foreground"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      letterSpacing: {
        brand: "0.34em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
