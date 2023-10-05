import { LiveReload } from '@remix-run/react';

export default function App() {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>runde.tips</title>
      </head>
      <body>
        <h1>runde.tips</h1>
        <LiveReload />
      </body>
    </html>
  );
}
