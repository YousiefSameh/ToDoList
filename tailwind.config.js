/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        'bgcolor': '#F0f8ff',
      },
    },
    width: {
      '1000': '1000px',
      '850': '850px',
      'full': '100%'
    },
  },
  plugins: [],
}
