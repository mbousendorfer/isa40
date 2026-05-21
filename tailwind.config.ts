import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#221C23",
        rosewood: "#8F3F50",
        blush: "#F8DDE3",
        champagne: "#F8E8C7",
        honey: "#D99C37",
        spruce: "#2F6F69",
        twilight: "#28324F",
        porcelain: "#FFF9F2"
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Avenir Next", "Nunito Sans", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(80, 45, 52, 0.16)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%, 100%": { opacity: "0.42", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.18)" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
