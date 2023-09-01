/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset -18px -16px 1px 1px #fff',
      },
      width: {
        lg: '1280px',
      },
      backgroundImage: {
        'asset': "url('assets')",
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

