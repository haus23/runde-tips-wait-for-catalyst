import { useLocation, useParams } from '@remix-run/react';

import { Link } from 'react-aria-components';

import LogoImage from '#assets/logo.svg';
import { ColorSchemeSwitch } from '#components/color-scheme-switch';

const navItems = [
  { label: 'Tabelle', viewSegment: '' },
  { label: 'Spieler', viewSegment: 'tipps/spieler' },
  { label: 'Spiele', viewSegment: 'tipps/spiel' },
];

export function NavDesktop() {
  const { championship: championshipSegment } = useParams();
  const { pathname } = useLocation();

  return (
    <div className="hidden h-full justify-between font-semibold sm:flex">
      <nav className="flex items-center gap-x-6">
        <Link
          className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-border focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          href="/"
        >
          <div className="flex items-center gap-x-1 pr-1">
            <svg className="h-12 w-12 fill-current">
              <use href={`${LogoImage}#logo`} />
            </svg>
            <span className="text-xl">runde.tips</span>
          </div>
        </Link>
        <div className="flex h-full gap-x-2">
          {navItems.map((item, ix) => {
            const href = `/${[championshipSegment, item.viewSegment]
              .filter(Boolean)
              .join('/')}`;
            return (
              <Link
                className="group mx-1 flex translate-y-[1.5px] items-center border-b-2 border-transparent px-2 hover:border-ui-border-hover focus:outline-none aria-[current=page]:border-accent-ui-border-hover"
                key={ix}
                aria-current={href === pathname ? 'page' : null}
                href={href}
              >
                <span
                  className="rounded-md px-2 py-1 group-hover:bg-ui-hover
                group-focus-visible:ring-2 group-focus-visible:ring-ui-border group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-bg"
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="flex items-center">
        <ColorSchemeSwitch />
      </div>
    </div>
  );
}
