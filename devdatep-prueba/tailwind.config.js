/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Bricolage Grotesque", "sans-serif"],
        body: ["Ubuntu", "sans-serif"],
      },
      colors: {
        // Cremas
        cream_dark: "#d4ceb8",
        cream_base: "#e8e2cc",
        cream_light: "#f5f0dc",

        // Naranjas
        orange_dark: "#c47d0e",
        orange_base: "#f5a623",
        orange_light: "#f7bc57",
          

        // Verdes
        green_dark: "#2d4f2a",
        green_base: "#4a7c46",
        green_light: "#6da668",
        green_soft: "#9fcc9b",

        // Rojos
        red_dark: "#5c1f1f",
        red_base: "#8b3030",
        red_base_light: "#a14a4a",
        red_light: "#b85050",
        red_soft: "#d48080",

        // Oscuros
        dark_darkest: "#111111",
        dark_base: "#1f1f1f",
        dark_medium: "#2d2d2d",
        dark_light: "#3d3d3d",

        // Blancos
        white: "#fff",
      },
    },
  },
  plugins: [],
}