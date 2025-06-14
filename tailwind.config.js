/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',         // ✅ pages in app directory
    './components/**/*.{js,ts,jsx,tsx}',  // ✅ custom components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F2800A",
        secondary: "#21243D",
        text_color: "#1E1E1E", // Added missing hash #
        White: "rgba(255, 255, 255)",
        card: '#EBEAEA',
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [tailwindcssAnimate],
};
