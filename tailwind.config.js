/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      "sans": ["ABeeZee", "sans-serif"],
    },
    extend: {
      colors: {
        "light-grey": "#F8F8F8",
      }
    }
  },
  plugins: []
}
