/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  darkMode: "class",
  theme: {
    screens : {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': { 'max': '1700px' },
    },
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

