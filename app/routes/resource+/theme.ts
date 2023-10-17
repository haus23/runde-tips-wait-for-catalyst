import { json, type ActionFunctionArgs } from '@remix-run/node';

import { commitSession, getSession } from '#utils/server/session.server';
import { UserColorScheme } from '#utils/theme';

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);

  // Parsing the body
  const bodyParams = await request.formData();
  const colorScheme = UserColorScheme.parse(bodyParams.get('colorScheme'));

  const themeColor = 'default';
  const effectiveColorScheme =
    colorScheme === 'system' ? undefined : colorScheme;

  session.set('theme', { themeColor, colorScheme: effectiveColorScheme });

  return json(null, {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
}
