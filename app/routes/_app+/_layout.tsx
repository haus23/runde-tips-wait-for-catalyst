import { Outlet } from '@remix-run/react';

export default function AppLayout() {
  return (
    <div>
      <h1>runde.tips</h1>
      <Outlet />
    </div>
  );
}
