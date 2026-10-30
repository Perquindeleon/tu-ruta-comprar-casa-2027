/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#102C46',
          'navy-light': '#1C4368',
          'navy-dark': '#0B1E30',
          green: '#2B7A55',
          'green-light': '#36986A',
          'green-dark': '#215D41',
          lightGreen: '#C7E7A4',
          'lightGreen-soft': '#F1F9EC',
          gold: '#D5AD57',
          'gold-light': '#E4C57F',
          'gold-dark': '#B88F35',
          bgLight: '#F8FAFC',
          cardBg: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
