import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1f4d3b',
          2: '#2c6b53',
          soft: '#e3ede5',
        },
        terracotta: {
          DEFAULT: '#c75a3a',
          soft: '#f4e2d8',
        },
        cream: {
          DEFAULT: '#f6f3ec',
          2: '#efe9dd',
        },
        ink: {
          DEFAULT: '#1d2a22',
          2: '#4b5a52',
          3: '#7d8a82',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      animation: {
        'gradient-shift': 'gradientShift 7s ease infinite',
        'carousel-scroll': 'carouselScroll 18s linear infinite',
        'fade-up': 'fadeUp .5s ease both',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        carouselScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
    },
  },
  plugins: [forms],
} satisfies Config
