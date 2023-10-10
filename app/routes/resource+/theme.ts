import { json, type ActionFunctionArgs } from '@remix-run/node';
import { invariant } from '~/utils/misc';
import { userPrefs } from '~/utils/server/user-prefs.server';

export async function action({ request }: ActionFunctionArgs) {
  let cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const bodyParams = await request.formData();

  const theme = bodyParams.get('theme');
  invariant(
    theme !== null && typeof theme === 'string',
    'No theme setting in request body'
  );

  if (theme === 'system') {
    cookieHeader = await userPrefs.serialize('', {
      expires: new Date(0),
    });
  } else {
    invariant(
      ['light', 'dark'].includes(theme),
      'Unknown theme setting in request body'
    );
    cookieHeader = await userPrefs.serialize({ ...cookie, theme });
  }
  return json(null, { headers: { 'Set-Cookie': cookieHeader } });
}
