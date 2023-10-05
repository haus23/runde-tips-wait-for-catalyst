import { Outlet } from '@remix-run/react';

export default function AppLayout() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">runde.tips</h1>
      <Outlet />
    </div>
  );
}
