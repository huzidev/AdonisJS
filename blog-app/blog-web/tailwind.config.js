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
      'xl': { 'min': '1025px', 'max': '1280px' },
      '2xl': { 'min': '1279px', 'max': '1400px' },
      '3xl': { 'min': '1401px', 'max': '1800px' },
      'full': { 'min': '1801px' }
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

