/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#171717",
        volt: "#CCFF00",
        runGreen: "#10B981",
        walkBlue: "#3B82F6",
        alertRed: "#EF4444",
        warningYellow: "#F59E0B"
      }
    },
  },
  plugins: [],
}