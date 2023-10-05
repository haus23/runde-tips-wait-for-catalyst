import { json, type DataFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { db } from '~/utils/server/db.server';

export async function loader({ params }: DataFunctionArgs) {
  const { championship: slug } = params;

  const championship = await db.championship.findFirst({
    orderBy: { nr: 'desc' },
    where: { published: true, slug },
  });

  if (!championship) {
    throw new Error('No championship found');
  }

  const ranking = await db.player.findMany({
    where: { championship },
    orderBy: { rank: 'asc' },
    include: { user: { select: { name: true, username: true } } },
  });

  return json({ championship, ranking });
}

export default function StandingsRoute() {
  const { championship, ranking } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="text-accent-fg">
        {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}
        {championship.name}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Platz</th>
            <th>Name</th>
            {championship.completed && <th>Zusatzpunkte</th>}
            <th>{championship.completed ? 'Gesamtpunkte' : 'Punkte'}</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r) => (
            <tr key={r.id}>
              <td>{r.rank}</td>
              <td>{r.user.name}</td>
              {championship.completed && <td>{r.extraPoints}</td>}
              <td>{r.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
