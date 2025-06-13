/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          foreground: '#ffffff',
          dark: '#ffffff',
          'dark-foreground': '#000000',
        },
        secondary: {
          DEFAULT: '#f3f4f6',
          foreground: '#1f2937',
          dark: '#374151',
          'dark-foreground': '#f9fafb',
        },
        muted: {
          DEFAULT: '#f9fafb',
          foreground: '#6b7280',
          dark: '#1f2937',
          'dark-foreground': '#9ca3af',
        },
        accent: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
          dark: '#60a5fa',
          'dark-foreground': '#1e3a8a',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        'surface-variant': {
          DEFAULT: '#f9fafb',
          dark: '#1f2937',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}