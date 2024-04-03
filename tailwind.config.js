/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        error: '#e3342f',
        success: '#38c172',
        background: 'rgb(241 245 249)',
        white: '#fff',
        black: '#000',
        'text-color': '#000'
      }
    }
  },
  plugins: []
};
