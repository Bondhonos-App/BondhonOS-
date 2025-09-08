/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#ff7a7a',
        neon: {
          cyan: '#00e5ff',
          purple: '#9b5cff',
        }
      },
      boxShadow: {
        glass: '0 8px 40px rgba(15, 23, 42, 0.12)',
        neon: '0 0 24px rgba(0, 229, 255, 0.35)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
