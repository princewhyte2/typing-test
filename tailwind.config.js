/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    typography: (theme) => ({}),
    extend: {
      fontFamily: {
        Pacifico: ["Pacifico", "cursive"],
        Roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
}
