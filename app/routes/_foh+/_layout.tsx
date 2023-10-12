import { Outlet, useLoaderData } from '@remix-run/react';

import { db } from '#utils/server/db.server';

import { Header } from './header';

export async function loader() {
  const championships = await db.championship.findMany({
    orderBy: { nr: 'desc' },
    where: { published: true },
  });

  return championships;
}

export default function FohLayout() {
  const championships = useLoaderData<typeof loader>();

  return (
    <div>
      <Header />
      <main className="mx-auto mt-4 max-w-5xl pb-10 text-fg-subtle sm:mt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
