/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // D&D Theme shorthand colors
        'dnd-gold': '#d4af37',
        'dnd-red': '#8b0000',
        'dnd-dark': '#1a1a2e',
        // D&D Theme colors
        parchment: {
          50: '#fdfcfa',
          100: '#f9f5ed',
          200: '#f3ebdb',
          300: '#e8d9bf',
          400: '#d4be94',
          500: '#c4a66e',
          600: '#b08c4a',
          700: '#8a6d3b',
          800: '#6d5530',
          900: '#574428',
        },
        // Fantasy gold accents
        gold: {
          50: '#fffdf0',
          100: '#fff9c4',
          200: '#fff176',
          300: '#ffeb3b',
          400: '#fdd835',
          500: '#d4af37',
          600: '#b8860b',
          700: '#8b6914',
          800: '#6b4f12',
          900: '#523c0f',
        },
      },
      fontFamily: {
        fantasy: ['Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
