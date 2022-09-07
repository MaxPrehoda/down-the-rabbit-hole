/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'surface-1': '#121212',
      'surface-2': '#1a1a1a',
      'surface-3': '#222222',
      'surface-4': '#2a2a2a',
      'surface-5': '#323232',
      'surface-6': '#3a3a3a',
      'surface-7': '#424242',
      'indigo': colors.indigo,
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },

      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  plugins: [],
}
