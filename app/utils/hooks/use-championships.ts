import { useRouteLoaderData } from '@remix-run/react';

import type { loader } from '#routes/_foh+/_layout';

import { invariant } from '../misc';

export function useChampionships() {
  const championships = useRouteLoaderData<typeof loader>(
    'routes/_foh+/_layout',
  );
  invariant(championships, 'No championships found in foh loader');

  return championships;
}
