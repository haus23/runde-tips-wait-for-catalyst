import { useHints } from './client-hints';

export function useTheme() {
  const hints = useHints();

  return { theme: hints.theme, userSelected: false } satisfies {
    theme: typeof hints.theme;
    userSelected: boolean;
  };
}
