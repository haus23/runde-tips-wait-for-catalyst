import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/server/db.server';

export async function loader() {
  const championship = await db.championship.findFirst({
    orderBy: { nr: 'desc' },
    where: { published: true },
  });

  if (!championship) {
    throw new Error('No championship found');
  }

  return json(championship);
}

export default function StandingsRoute() {
  const championship = useLoaderData<typeof loader>();

  return (
    <h2>
      {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}{' '}
      {championship.name}
    </h2>
  );
}
