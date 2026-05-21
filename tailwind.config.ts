import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#0A0A0A",
        accent: "#C00000",
        "accent-dark": "#5A0000",
        ink: "#EAEAEA",
        smoke: "#1A1A1A"
      },
      boxShadow: {
        glow: "0 0 40px rgba(192,0,0,0.25)",
        edge: "0 32px 80px rgba(0,0,0,0.45)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        grain: "grain 8s steps(6) infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-14px,0) scale(1.03)" }
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-4%, 3%)" },
          "40%": { transform: "translate(3%, -2%)" },
          "60%": { transform: "translate(-3%, 1%)" },
          "80%": { transform: "translate(2%, 4%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
