import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#059669", dim: "#047857", light: "#D1FAE5" },
        cream: { 50: "#FAF8F5", 100: "#F5F2ED", 200: "#EFEAE2", 300: "#E8E3DB" },
        dark: { DEFAULT: "#2D2A26", light: "#5E5A54", lighter: "#8B8580" },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
