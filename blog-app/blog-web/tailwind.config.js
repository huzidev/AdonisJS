/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  darkMode: "class",
  theme: {
    screens : {
      'ham': { 'max': '1000px'},
      'menu': { 'min': '1000px'},
      'xxs': { 'max': '349px' },
      'xs': { 'min': '350px', 'max': '449px'},
      'sm': { 'min': '450px', 'max': '650px' },
      'md': { 'min': '651px', 'max': '800px' },
      'lg': { 'min': '801px', 'max': '1000px' },
      'xl': { 'min': '1001px', 'max': '1280px' },
      '2xl': { 'min': '1281px', 'max': '1400px' },
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

