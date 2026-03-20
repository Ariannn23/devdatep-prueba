/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F79D23",
        secondary: "#F75323",
        danger: "#F72E23",
        light: "#FAD683",
        accent: "#F7A975",
      }
    },
  },
  plugins: [],
}