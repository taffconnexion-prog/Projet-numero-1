import type { Config } from 'tailwindcss'

// Palette « Golfe de Guinée » — voir brief design.
// Règles de contraste : texte courant toujours >= 4.5:1 sur son fond.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ocean-deep': '#0A2E3C',
        'ocean-mid': '#1B5E74',
        'ocean-light': '#4AAFCB',
        'sand-warm': '#E8C98A',
        'sand-pale': '#F5EDD6',
        coral: {
          DEFAULT: '#C65D3A',
          dark: '#A04828',
        },
        mangrove: '#1A3028',
        foam: '#F9F7F2',
        mist: '#B0C8D0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        nav: '0.02em',
      },
      lineHeight: {
        body: '1.7',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
}

export default config
