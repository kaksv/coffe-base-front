/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FFF8E7',
          100: '#FFF1D7',
          200: '#FFE4B5',
          300: '#FFD08A',
          400: '#FFBD5C',
          500: '#FFA72E',
          600: '#FF9500',
          700: '#CC7700',
          800: '#996B33',
          900: '#6F4E37',
        },
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};