import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./src/**/*.js",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: "6px",
      },
    },
  },
  plugins: [],
} satisfies Config;
