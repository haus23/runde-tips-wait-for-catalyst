import type { Theme } from '#utils/theme';
import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
  theme: Theme;
};

const { getSession, commitSession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: 'runde-tips-session',
  },
});

export { getSession, commitSession };
