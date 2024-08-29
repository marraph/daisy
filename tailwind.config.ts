import type { Config } from "tailwindcss";
import colors = require("tailwindcss/colors");

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      "black": "#090909",
      "black-light": "#111111",
      "dark": "#171717",
      "dark-light": "#1C1C1C",
      "edge": "#363636",
      "marcador": "#878787",
      "gray": "#A6A6A6",
      "white": "#ECECEC",
      "white-dark": "#C7C7C7",

      "success": "#1AA60E",
      "warning": "#F2CF19",
      "error": "#C51919",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;