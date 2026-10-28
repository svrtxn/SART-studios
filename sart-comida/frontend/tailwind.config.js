/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: '#1976FF',
        navy: '#0A0F1F',
        bg: {
          light: '#FFFFFF',
          dark: '#06080D',
        },
        surface: {
          light: '#F8FAFC',
          dark: '#111827',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          darkPrimary: '#FFFFFF',
        },
        border: {
          light: '#E5E7EB',
          dark: '#273142',
        },
        success: {
          DEFAULT: '#22C55E',
          bg: '#DCFCE7',
          border: '#86EFAC',
        },
        warning: {
          DEFAULT: '#F59E0B',
          bg: '#FEF3C7',
          border: '#FCD34D',
        },
        danger: {
          DEFAULT: '#EF4444',
          bg: '#FEE2E2',
          border: '#FCA5A5',
        },
        info: {
          DEFAULT: '#3B82F6',
          bg: '#DBEAFE',
          border: '#93C5FD',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        }
      },
      spacing: {
        // Tailwind default spacing relies on rem (1 = 0.25rem = 4px)
        // 8px base unit -> multiple of 2 in tailwind (e.g. p-2 = 8px, p-4 = 16px, p-6 = 24px)
        // Adding explicit ones from SART scale if needed, but defaults are mostly matching
        '18': '4.5rem', // 72px
        '20': '5rem',   // 80px
        '30': '7.5rem', // 120px
        '40': '10rem',  // 160px
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '999px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0,0,0,.05)',
        'md': '0 8px 24px rgba(0,0,0,.08)',
        'lg': '0 20px 60px rgba(0,0,0,.12)',
      },
      transitionDuration: {
        'instant': '0ms',
        'ultra-fast': '100ms',
        'fast': '150ms',
        'normal': '200ms',
        'medium': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'primary': 'ease-out',
        'secondary': 'ease-in-out',
      }
    },
  },
  plugins: [],
}
