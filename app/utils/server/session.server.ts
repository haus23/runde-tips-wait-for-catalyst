import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {};

const { getSession, commitSession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: 'runde-tips-session',
  },
});

export { getSession, commitSession };
