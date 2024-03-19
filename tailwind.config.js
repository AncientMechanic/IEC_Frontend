/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "IEC-primary": "#007bff",
        "IEC-secondary": "",
      }
    },
    fontFamily: {
      GolosText: ["Golos Text, sans-serif"],
    }
  },
  plugins: [],
}

