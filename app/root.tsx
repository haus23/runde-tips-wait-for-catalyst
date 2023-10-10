import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import { RouterProvider } from 'react-aria-components';

import { ClientHintCheck, getHints } from './utils/client-hints';

import styles from '~/styles/tailwind.css';
import { getTheme } from './utils/server/user-prefs.server';
import { useTheme } from './utils/color-scheme';
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      userPrefs: {
        theme: await getTheme(request),
      },
    },
  });
}

export default function App() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <html lang="de" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <ClientHintCheck />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>runde.tips</title>
        <Links />
      </head>
      <body>
        <RouterProvider navigate={navigate}>
          <Outlet />
        </RouterProvider>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
