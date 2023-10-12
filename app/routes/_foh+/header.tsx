import { NavDesktop } from './nav-desktop';
import { NavMobile } from './nav-mobile';

export function Header() {
  return (
    <header className="h-16 border-b bg-bg-subtle px-2 shadow sm:px-4">
      <NavMobile />
      <NavDesktop />
    </header>
  );
}
