import type { Championship } from '@prisma/client';
import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/_foh+/_layout';

export function useChampionships() {
  const championships = useRouteLoaderData<typeof loader>(
    'routes/_foh+/_layout'
  );

  return championships as Championship[];
}
