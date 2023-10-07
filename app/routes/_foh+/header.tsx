import { NavDesktop } from './nav-desktop';
import { NavMobile } from './nav-mobile';

export function Header() {
  return (
    <header className="h-16 border-b shadow px-2 sm:px-4 bg-bg-subtle">
      <NavMobile />
      <NavDesktop />
    </header>
  );
}
