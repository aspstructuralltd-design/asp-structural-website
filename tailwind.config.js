/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf6',
          100: '#faf5e9',
          200: '#f3e9cf',
          300: '#ead8a8',
          400: '#dcc16f',
          500: '#c69a3b', // primary accent
          600: '#b8862a',
          700: '#976822',
          800: '#7d531f',
          900: '#6a451e',
        },
        gold2: {
          400: '#e6c478',
          500: '#d8b15a', // secondary accent
          600: '#c69a3b',
        },
        ink: {
          50: '#faf8f5', // page background
          100: '#f5f1ea',
          200: '#ece6da', // border
          300: '#d8d0c2',
          400: '#a89f8e',
          500: '#666666', // secondary text
          600: '#555555',
          700: '#3d3d3d',
          800: '#2d2d2d', // primary text
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 20px -8px rgba(45, 45, 45, 0.08)',
        card: '0 8px 40px -12px rgba(45, 45, 45, 0.10)',
        gold: '0 8px 30px -8px rgba(198, 154, 59, 0.35)',
        'gold-lg': '0 12px 40px -8px rgba(198, 154, 59, 0.45)',
        luxe: '0 20px 60px -20px rgba(45, 45, 45, 0.15)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.7s ease both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        ripple: 'ripple 0.6s ease-out',
      },
    },
  },
  plugins: [],
};
