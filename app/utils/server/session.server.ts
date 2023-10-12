import { createCookieSessionStorage } from '@remix-run/node';

import type { Theme } from '#utils/theme';

type SessionData = {
  theme: Theme;
};

const { getSession: getRawSession, commitSession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: 'runde-tips-session',
    },
  });

async function getSession(request: Request) {
  return getRawSession(request.headers.get('Cookie'));
}

export { getSession, commitSession };
