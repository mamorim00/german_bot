/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'duolingo-green': '#58CC02',
        'duolingo-light-green': '#89E219',
        'duolingo-yellow': '#FFC800',
        'duolingo-orange': '#FF9600',
        'duolingo-red': '#FF4B4B',
        'duolingo-blue': '#1CB0F6',
        'duolingo-purple': '#CE82FF',
        'warm-bg': '#FEF9F0',
        'warm-card': '#FFFFFF',
      },
      fontFamily: {
        'display': ['Nunito', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 12px rgba(255, 152, 0, 0.15)',
        'green': '0 4px 12px rgba(88, 204, 2, 0.2)',
      },
    },
  },
  plugins: [],
}
