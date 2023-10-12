import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '~/root';

import { invariant } from '../misc';

export function useRequestInfo() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data?.requestInfo, 'No requestInfo found in root loader');

  return data.requestInfo;
}
