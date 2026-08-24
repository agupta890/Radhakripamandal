/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f1',
          100: '#feeedc',
          200: '#fed9b4',
          300: '#fdbd83',
          400: '#fb944e',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        maroon: {
          50: '#fcf2f4',
          100: '#f9e6e9',
          200: '#f4d0d7',
          300: '#e9abb7',
          400: '#da798e',
          500: '#c44a67',
          600: '#a73351',
          700: '#86243e',
          800: '#6f2136',
          900: '#5c1d2e',
          950: '#3d0c1b',
        },
        gold: {
          50: '#fbf9eb',
          100: '#f6f1cc',
          200: '#eee29c',
          300: '#e3cd65',
          400: '#d7b539',
          500: '#c29b26',
          600: '#a67b1e',
          700: '#84591b',
          800: '#6f471c',
          900: '#5d3b1b',
        },
        cream: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5edd9',
          300: '#eedebb',
          400: '#e4c896',
          500: '#d8b072',
        },
      },
      fontFamily: {
        hindi: ['"Noto Sans Devanagari"', '"Hind"', 'sans-serif'],
        spiritual: ['"Noto Serif Devanagari"', '"Noto Sans Devanagari"', '"Rozha One"', 'serif'],
        sans: ['"Noto Sans Devanagari"', '"Hind"', 'sans-serif'],
        serif: ['"Noto Serif Devanagari"', 'serif'],
      },
      backgroundImage: {
        'spiritual-gradient': 'linear-gradient(135deg, #7A1A2A 0%, #5B1420 50%, #3D0C1B 100%)',
        'saffron-gradient': 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D4AF37 50%, #B45309 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FDFBF7 0%, #F5EDD9 100%)',
      },
      boxShadow: {
        'divine': '0 10px 30px -5px rgba(122, 26, 42, 0.15), 0 4px 6px -2px rgba(249, 115, 22, 0.1)',
        'divine-hover': '0 20px 40px -10px rgba(122, 26, 42, 0.25), 0 8px 12px -4px rgba(249, 115, 22, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
