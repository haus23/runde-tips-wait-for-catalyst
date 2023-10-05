import { json } from '@remix-run/node';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { db } from '~/utils/server/db.server';

export async function loader() {
  const championships = await db.championship.findMany({
    orderBy: { nr: 'desc' },
    where: { published: true },
  });

  return json(championships);
}

export default function AppLayout() {
  const championships = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-semibold">runde.tips</h1>
      <div className="flex gap-x-4">
        {championships.map((c) => (
          <NavLink
            key={c.id}
            to={`/${c.slug}`}
            className={({ isActive }) =>
              isActive ? 'text-black' : 'text-gray-600'
            }
          >
            {c.name}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
