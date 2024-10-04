/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        petrol: {
          DEFAULT: '#216477',
          light: '#4d8691',
          dark: '#1a4f5a',
        },
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}

