/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Semantic surface tokens — a single tonal ramp from the canvas up.
        canvas: '#070709',
        surface: '#0e0e13',
        elevated: '#15151d',
        raised: '#1c1c27',
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          muted: '#4f46e5',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(0,0,0,0.5), 0 12px 32px -16px rgba(0,0,0,0.7)',
        'card-hover': '0 1px 2px 0 rgba(0,0,0,0.5), 0 20px 48px -20px rgba(0,0,0,0.8)',
        glow: '0 0 0 1px rgba(99,102,241,0.35), 0 0 32px -4px rgba(99,102,241,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(150%)' },
        },
        progress: {
          '0%': { transform: 'translateX(-100%) scaleX(0.4)' },
          '50%': { transform: 'translateX(40%) scaleX(0.7)' },
          '100%': { transform: 'translateX(220%) scaleX(0.4)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.3s ease-out both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 1.6s infinite',
        progress: 'progress 1.1s cubic-bezier(0.4,0,0.2,1) infinite',
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
