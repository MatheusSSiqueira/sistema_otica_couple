import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFCE0',
          100: '#FFF6B8',
          200: '#FFF08A',
          300: '#FFE85C',
          400: '#FFE02E',
          500: '#FFD700',
          600: '#D4B800',
          700: '#A88E00',
          800: '#7C6800',
          900: '#554700'
        },
        accent: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CFCFCF',
          300: '#A8A8A8',
          400: '#707070',
          500: '#000000',
          600: '#111111',
          700: '#1E1E1E',
          800: '#2B2B2B',
          900: '#3A3A3A'
        },
        neutral: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F3F3F3',
          300: '#E9E9E9',
          400: '#D9D9D9',
          500: '#FFFFFF',
          600: '#BFBFBF',
          700: '#8F8F8F',
          800: '#5C5C5C',
          900: '#262626'
        },
        danger: '#dc2626'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;