import { z } from 'zod';
import { useRouteLoaderData } from '@remix-run/react';
import { loader } from '#root';
import { invariant } from './misc';

const ColorScheme = z.literal('light').or(z.literal('dark'));
type ColorScheme = z.infer<typeof ColorScheme>;

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

export { ColorScheme, Theme, useTheme };
