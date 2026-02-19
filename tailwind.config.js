/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          white: '#F5F5F5',
          yellow: '#FFD600',
          pink: '#E91E90',
          green: '#00E676',
          gray: {
            900: '#1A1A1A',
            800: '#2A2A2A',
            400: '#999999',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tdr: '-0.03em',
        tdrtight: '-0.04em',
      },
      lineHeight: {
        compact: '1.1',
        snugger: '1.3',
      },
    },
  },
  plugins: [],
}
