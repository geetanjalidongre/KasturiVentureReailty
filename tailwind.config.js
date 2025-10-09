/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kasturi-gold': '#D4AF37',
        'kasturi-gold-light': '#E6C866',
        'kasturi-gold-dark': '#B8941F',
        'kasturi-brown': '#8B4513',
        'kasturi-brown-light': '#A0522D',
        'kasturi-brown-dark': '#654321',
      }
    },
  },
  plugins: [],
};
