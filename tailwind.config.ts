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
      'bg-subtle': 'var(--bg-subtle)',
      fg: 'var(--fg)',
      'fg-subtle': 'var(--fg-subtle)',

      ui: 'var(--ui)',
      'ui-hover': 'var(--ui-hover)',
      'ui-active': 'var(--ui-active)',
      'ui-border': 'var(--ui-border)',
      'ui-border-hover': 'var(--ui-border-hover)',

      border: 'var(--border)',

      accent: {
        fg: 'var(--accent-fg)',
        'fg-subtle': 'var(--accent--fg-subtle)',

        ui: 'var(--accent-ui)',
        'ui-hover': 'var(--accent-ui-hover)',
        'ui-active': 'var(--accent-ui-active)',
        'ui-border': 'var(--accent-ui-border)',
        'ui-border-hover': 'var(--accent-ui-border-hover)',

        'ui-solid': 'var(--accent-ui-solid)',
        'ui-solid-hover': 'var(--accent-ui-solid-hover)',
      },
    },
  },
  plugins: [],
} satisfies Config;
