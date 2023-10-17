import { useRouteLoaderData } from '@remix-run/react';

import { z } from 'zod';

import { loader } from '#root';

import { invariant } from './misc';

// Effective Color Scheme: 'light' or 'dark'
const ColorScheme = z.literal('light').or(z.literal('dark'));
type ColorScheme = z.infer<typeof ColorScheme>;

// User-Selected Color Scheme: includes 'system' as well
const UserColorScheme = ColorScheme.or(z.literal('system'));
type UserColorScheme = z.infer<typeof UserColorScheme>;

const Theme = z.object({
  themeColor: z.literal('default'),
  colorScheme: ColorScheme.optional(),
});
type Theme = z.infer<typeof Theme>;

function useTheme() {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  invariant(rootLoaderData !== undefined, 'No root route data present');

  return {
    themeColor:
      rootLoaderData.requestInfo.userSession.data.theme?.themeColor ||
      'default',
    colorScheme:
      rootLoaderData.requestInfo.userSession.data.theme?.colorScheme ||
      rootLoaderData.requestInfo.clientHints.colorScheme,
    userRequested:
      typeof rootLoaderData.requestInfo.userSession.data.theme?.colorScheme !==
      'undefined',
  };
}

export { ColorScheme, UserColorScheme, Theme, useTheme };
