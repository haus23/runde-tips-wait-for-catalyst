import { commitSession, getSession } from '#utils/server/session.server';
import { ColorScheme } from '#utils/theme';
import { json, type ActionFunctionArgs } from '@remix-run/node';
import { z } from 'zod';

const RequestedColorScheme = ColorScheme.or(z.literal('system'));

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);

  // Parsing the body
  const bodyParams = await request.formData();
  const colorScheme = RequestedColorScheme.parse(bodyParams.get('colorScheme'));

  const themeColor = 'default';
  const effectiveColorScheme =
    colorScheme === 'system' ? undefined : colorScheme;

  session.set('theme', { themeColor, colorScheme: effectiveColorScheme });

  return json(null, {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
}
