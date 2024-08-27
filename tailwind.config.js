/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        // black: " #00000080",
        white: "rgba(255, 255, 255, 1)",
        //gray: "gray",
      },
      boxShadow: {
        gray: "0 4px 6px rgba(0, 0, 0, 0.5)"
      }
    },
  },
  plugins: [],
};
