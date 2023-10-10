import { useRequestInfo } from './hooks/use-request-info';

export function useTheme() {
  const requestInfo = useRequestInfo();

  const wantedTheme =
    requestInfo.userPrefs.theme ??
    (requestInfo.hints.theme as 'light' | 'dark');

  return {
    theme: wantedTheme,
    userSelected: requestInfo.userPrefs.theme !== undefined,
  };
}
