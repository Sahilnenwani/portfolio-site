import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors - mapped to CSS variables
        background: "var(--background)",
        "background-light": "var(--background-light)",
        "background-card": "var(--background-card)",

        // Professional accent colors
        accent: {
          primary: "#6366f1", // Indigo-500
          secondary: "#f97316", // Orange-500
          tertiary: "#14b8a6", // Teal-500
          gold: "#f59e0b", // Amber-500
          rose: "#f43f5e", // Rose-500
        },

        border: "var(--border-color)",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        blob: "blob-float 20s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "gradient-x": "gradient-x 3s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "blob-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(20px, -30px) scale(1.05)" },
          "50%": { transform: "translate(-20px, 20px) scale(0.95)" },
          "75%": { transform: "translate(30px, 10px) scale(1.02)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99, 102, 241, 0.15)",
        "glow-lg": "0 0 60px rgba(99, 102, 241, 0.2)",
        premium: "0 4px 20px rgba(0, 0, 0, 0.04)",
        "premium-lg": "0 20px 40px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
