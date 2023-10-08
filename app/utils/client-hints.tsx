const clientHints = {
  theme: {
    cookieName: 'CH-prefers-color-scheme',
    getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
    fallback: 'light',
    transform(value: string | null) {
      return value === 'dark' ? 'dark' : 'light';
    },
  },
};

export function ClientHintCheck() {
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
