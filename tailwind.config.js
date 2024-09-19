/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#202d46',
          white2: '#f5f6f8',
          white3: '#e5e5e5',
          white4: '#ced4da',
          grey: '#b9c0c7',
          grey2: '#a6afb7',
          grey3: '#58595b',
          grey4: '#8a939b',
          black: '#333',
          blue: '#273652',
          blue2: '#6e7cad',
          blue3: '#202d46',
          blue4: '#30405b',
          orange: '#f60',
          red: '#ff6d6d',
          yellow: '#ffac00'
        }
      }
    },
  },
  plugins: [],
}

