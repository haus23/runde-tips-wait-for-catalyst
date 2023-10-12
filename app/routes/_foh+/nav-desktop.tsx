import { useLocation, useParams } from '@remix-run/react';
import LogoImage from '~/assets/logo.svg';
import { ColorSchemeSwitch } from '~/components/color-scheme-switch';
import { Link } from 'react-aria-components';

const navItems = [
  { label: 'Tabelle', viewSegment: '' },
  { label: 'Spieler', viewSegment: 'tipps/spieler' },
  { label: 'Spiele', viewSegment: 'tipps/spiel' },
];

export function NavDesktop() {
  const { championship: championshipSegment } = useParams();
  const { pathname } = useLocation();

  return (
    <div className="hidden sm:flex h-full justify-between font-semibold">
      <nav className="flex items-center gap-x-6">
        <Link
          className="rounded focus:outline-none focus-visible:ring-offset-bg focus-visible:ring-2 focus-visible:ring-ui-border focus-visible:ring-offset-2"
          href="/"
        >
          <div className="flex items-center gap-x-1 pr-1">
            <svg className="h-12 w-12 fill-current">
              <use href={`${LogoImage}#logo`} />
            </svg>
            <span className="text-xl">runde.tips</span>
          </div>
        </Link>
        <div className="flex gap-x-2 h-full">
          {navItems.map((item, ix) => {
            const href = `/${[championshipSegment, item.viewSegment]
              .filter(Boolean)
              .join('/')}`;
            return (
              <Link
                className="group mx-1 px-2 translate-y-[1.5px] flex items-center border-b-2 border-transparent hover:border-ui-border-hover aria-[current=page]:border-accent-ui-border-hover focus:outline-none"
                key={ix}
                aria-current={href === pathname ? 'page' : null}
                href={href}
              >
                <span
                  className="px-2 py-1 rounded-md group-hover:bg-ui-hover
                group-focus-visible:ring-offset-bg group-focus-visible:ring-2 group-focus-visible:ring-ui-border group-focus-visible:ring-offset-2"
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
