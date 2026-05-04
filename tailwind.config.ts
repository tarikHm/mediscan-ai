import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'rotate3d': 'rotating 20s linear infinite',
      },
      keyframes: {
        rotating: {
          '0%': { transform: 'perspective(1000px) rotateX(-15deg) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateX(-15deg) rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
