import { createCookie } from '@remix-run/node';

export const userPrefs = createCookie('user-prefs');

type UserTheme = 'light' | 'dark' | undefined;
export async function getTheme(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const { theme: cookieTheme } = (await userPrefs.parse(cookieHeader)) || {
    theme: undefined,
  };

  const theme =
    typeof cookieTheme === 'string' &&
    (cookieTheme === 'light' || cookieTheme === 'dark')
      ? cookieTheme
      : undefined;

  return theme satisfies UserTheme;
}
