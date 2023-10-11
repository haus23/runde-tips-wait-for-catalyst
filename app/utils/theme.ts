import { z } from 'zod';
const colorSchemeNames = ['light', 'dark'] as const;

const ColorScheme = z.literal('light').or(z.literal('dark'));
type ColorScheme = z.infer<typeof ColorScheme>;

const Theme = z.object({
  themeColor: z.literal('default'),
  colorScheme: ColorScheme.optional(),
});
type Theme = z.infer<typeof Theme>;

export { ColorScheme, Theme };
