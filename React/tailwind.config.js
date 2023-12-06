/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "edu-tas": ["'Edu TAS Beginner'", "cursive"],
      },

      colors: {
        primary: "#F94700",
        secondary: "#030057",
        bgc: "#e7e7e7",
      },
    },
  },
  plugins: [],
};
