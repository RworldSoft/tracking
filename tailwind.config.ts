import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#5a189a",
        "primary-hover": "#3c0e63",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #5a189a, #7b2cbf)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },

  plugins: [],
};

export default config;
