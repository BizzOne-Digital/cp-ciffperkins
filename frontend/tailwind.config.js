/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brown: '#4B1F0E',
        espresso: '#241008',
        darkbg: '#120A06',
        warmbrown: '#71330F',
        gold: '#C58A32',
        softgold: '#D9A94E',
        cream: '#F8F2E8',
        ivory: '#FFF9F1',
        charcoal: '#171717',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
}
