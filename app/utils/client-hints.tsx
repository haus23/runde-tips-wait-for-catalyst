import { useRevalidator } from '@remix-run/react';
import { useEffect } from 'react';

const clientHints = {
  colorScheme: {
    cookieName: 'CH-prefers-color-scheme',
    getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
    fallback: 'light',
    transform(value: string | null) {
      return value === 'dark' ? 'dark' : 'light';
    },
  },
};

type ClientHintNames = keyof typeof clientHints;

// Dark Mode Schritt 1: Script das den aktuell gewünschten Color-Mode des Browsers ausliest und sicherstellt,
// dass ein entsprechendes Cookie gesetzt ist bzw. wird

export function ClientHintCheck() {
  // Dark Mode Schritt 3: Überwachen des Color-Modes auf Browser-seitige Änderungen
  const { revalidate } = useRevalidator();
  useEffect(() => {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function handleThemeChange() {
      document.cookie = `${clientHints.colorScheme.cookieName}=${
        themeQuery.matches ? 'dark' : 'light'
      }`;
      revalidate();
    }
    themeQuery.addEventListener('change', handleThemeChange);
    return () => {
      themeQuery.removeEventListener('change', handleThemeChange);
    };
  }, [revalidate]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
    const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
      const [key, value] = cur.split('=');
      key && (acc[key] = value);
      return acc;
    }, {});
    let cookieChanged = false;
    const hints = [
      ${Object.values(clientHints)
        .map((hint) => {
          const cookieName = JSON.stringify(hint.cookieName);
          return `{ name: ${cookieName}, actual: String(${hint.getValueCode}), cookie: cookies[${cookieName}] }`;
        })
        .join(',\n')}
      ];
    for (const hint of hints) {
      if (decodeURIComponent(hint.cookie) !== hint.actual) {
        cookieChanged = true;
        document.cookie = encodeURIComponent(hint.name) + '=' + encodeURIComponent(hint.actual) + ';path=/';
      }
    }
    if (cookieChanged && navigator.cookieEnabled) {
      window.location.reload();
    }
    `,
      }}
    ></script>
  );
}

// Dark Mode Schritt 2: - Schritt 2: Auslesen des Client-Hint Cookie

function getCookieValue(cookieString: string, name: ClientHintNames) {
  const hint = clientHints[name];
  if (!hint) {
    throw new Error(`Unknown client hint: ${name}`);
  }
  const value = cookieString
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(hint.cookieName + '='))
    ?.split('=')[1];

  return value ? decodeURIComponent(value) : null;
}

/**
 *
 * @param request {Request} - optional request object (only used on server)
 * @returns an object with the client hints and their values
 */
export function getHints(request?: Request) {
  const cookieString =
    typeof document !== 'undefined'
      ? document.cookie
      : typeof request !== 'undefined'
      ? request.headers.get('Cookie') ?? ''
      : '';

  return Object.entries(clientHints).reduce(
    (acc, [name, hint]) => {
      const hintName = name as ClientHintNames;
      acc[hintName] = hint.transform(
        getCookieValue(cookieString, hintName) ?? hint.fallback
      );
      return acc;
    },
    {} as {
      [name in ClientHintNames]: (typeof clientHints)[name] extends {
        transform: (value: any) => infer ReturnValue;
      }
        ? ReturnValue
        : (typeof clientHints)[name]['fallback'];
    }
  );
}
