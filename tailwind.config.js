/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Natural earth tones for equestrian theme
        forest: {
          50: '#f0f5f0',
          100: '#d8e6d8',
          200: '#b5d1b5',
          300: '#8fb88f',
          400: '#6a9e6a',
          500: '#4a7c4a',
          600: '#3d663d',
          700: '#324f32',
          800: '#283f28',
          900: '#1f311f',
        },
        saddle: {
          50: '#faf6f3',
          100: '#f2e8e0',
          200: '#e4cfc0',
          300: '#d4b199',
          400: '#c49272',
          500: '#a67650',
          600: '#8b6043',
          700: '#704c37',
          800: '#5a3d2d',
          900: '#4a3226',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf8f4',
          200: '#f5f1e8',
          300: '#ede6d8',
          400: '#e2d8c6',
          500: '#d4c7b0',
          600: '#b8a88f',
          700: '#968772',
          800: '#7a6d5c',
          900: '#655a4c',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/hero.png')",
      }
    },
  },
  plugins: [],
}
