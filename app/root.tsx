import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  useNavigate,
} from '@remix-run/react';
import { RouterProvider } from 'react-aria-components';

import styles from '~/styles/tailwind.css';
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  const navigate = useNavigate();

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
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
