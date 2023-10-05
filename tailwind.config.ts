import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,

      bg: 'var(--bg)',
      fg: 'var(--fg)',

      border: 'var(--border)',

      accent: {
        bg: 'var(--accent-bg)',
        fg: 'var(--accent-fg)',

        border: 'var(--accent-border)',
      },
    },
  },
  plugins: [],
} satisfies Config;
