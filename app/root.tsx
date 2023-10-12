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
  useNavigate,
} from '@remix-run/react';

import { RouterProvider } from 'react-aria-components';

import styles from '#styles/tailwind.css';
import { ClientHintCheck, getHints } from '#utils/client-hints';
import { getSession } from '#utils/server/session.server';
import { useTheme } from '#utils/theme';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      clientHints: getHints(request),
      userSession: await getSession(request),
    },
  });
}

export default function App() {
  const navigate = useNavigate();
  const { colorScheme } = useTheme();

  return (
    <html lang="de" className={colorScheme}>
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
