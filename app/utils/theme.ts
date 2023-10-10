const colorSchemeNames = ['light', 'dark'] as const;
type ColorScheme = (typeof colorSchemeNames)[number];

type Theme = {
  themeColor: 'default';
  colorScheme: ColorScheme;
};

export { type Theme };
