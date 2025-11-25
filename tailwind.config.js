/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#00f0ff',
        'accent-secondary': '#ff006e',
        'bg-base': '#0a0a0a',
        'bg-elevated': '#121212',
        'text-secondary': '#a0a0a0',
      },
      fontFamily: {
        sans: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
