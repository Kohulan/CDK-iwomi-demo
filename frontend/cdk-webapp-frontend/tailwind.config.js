/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace'],
        display: ['Quicksand', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'pastel-blue': '#a3d9ff',
        'pastel-purple': '#c9a7eb',
        'pastel-pink': '#ffcbf2',
        'pastel-green': '#9fe7c3', 
        'pastel-yellow': '#ffd6a5',
        'pastel-red': '#ffb3b3',
        'pastel-orange': '#ffcc99',
        'science-blue': '#0061ab',
        'science-teal': '#00a7c3',
        'science-green': '#00b27f',
        'science-purple': '#6e4de1',
        'science-indigo': '#344fa1',
        'science-gray': '#334155',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradientAnimation 8s ease infinite',
        'appear': 'appear 0.6s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientAnimation: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        appear: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-strong': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'neo': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%)',
        'science-gradient': 'linear-gradient(135deg, #0061ab 0%, #6e4de1 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}