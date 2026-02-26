export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6ff',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#05417f',
          900: '#0e2d4a',
          950: '#0a1a2e',
        },
        secondary: {
          50: '#fafaf9',
          100: '#f4f5f4',
          200: '#e4e6e3',
          300: '#d1d5d0',
          400: '#a3a8a0',
          500: '#7f9183',
          600: '#5c6d5e',
          700: '#454d41',
          800: '#2f352e',
          900: '#1a1b1a',
          950: '#0f100f',
        },
        accent: {
          50: '#fff5f7',
          100: '#fed7d7',
          200: '#feb2b2',
          300: '#fc8181',
          400: '#ef4444',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#5f2121',
          950: '#3a1414',
        },
        neon: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6ff',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#05417f',
          900: '#0e2d4a',
          950: '#0a1a2e',
        },
        glass: {
          bg: 'rgba(10, 26, 46, 0.8)',
          border: 'rgba(14, 45, 74, 0.3)',
        }
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slideIn': 'slideIn 0.5s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.8)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(14, 45, 74, 0.1)',
        'neon': '0 0 20px rgba(14, 165, 233, 0.5)',
        'neon-glow': '0 0 40px rgba(14, 165, 233, 0.8)',
      },
    },
  },
  plugins: [],
}
