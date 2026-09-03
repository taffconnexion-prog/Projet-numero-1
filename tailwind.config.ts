import type { Config } from 'tailwindcss'

// Palette « Golfe de Guinée » — 3 couleurs actives (océan 80 %, sable 15 %,
// corail 5 % CTA), le reste en nuances et opacités.
// Contraste texte courant : minimum 7:1 (AAA).
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ocean-deep': '#0A2E3C',
        'ocean-deeper': '#07212C',
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
        // Texte secondaire sur fond clair — 8:1 minimum sur sand-pale / foam.
        harbor: '#274B59',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        nav: '0.02em',
      },
      lineHeight: {
        display: '1.1',
        body: '1.75',
      },
      maxWidth: {
        prose: '42.5rem', // 680px — largeur max du texte éditorial
        content: '72rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config
