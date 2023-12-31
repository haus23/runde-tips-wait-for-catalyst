import { useEffect, useState } from 'react';
import { useLocation, useParams } from '@remix-run/react';

import {
  Dialog,
  Heading,
  Link,
  Modal,
  ModalOverlay,
} from 'react-aria-components';

import LogoImage from '#assets/logo.svg';
import { Button } from '#components/(ui)/button';
import { Icon } from '#components/(ui)/icon';
import { ColorSchemeMenu } from '#components/color-scheme-menu';
import { useChampionships } from '#utils/hooks/use-championships';

const navItems = [
  { label: 'Tabelle', viewSegment: '' },
  { label: 'Spieler', viewSegment: 'tipps/spieler' },
  { label: 'Spiele', viewSegment: 'tipps/spiel' },
];

export function NavMobile() {
  const { championship: championshipSegment } = useParams();
  const championships = useChampionships();
  const location = useLocation();

  const championship = championshipSegment
    ? championships.find((c) => c.slug === championshipSegment)
    : championships[0];

  // Open/Close Dialog
  const [open, setOpen] = useState(false);

  // Workaround: Opening the dialog triggers home link immediatly
  function delayedOpen() {
    setTimeout(() => setOpen(true), 10);
  }

  // Close on navigation
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close on device rotation
  useEffect(() => {
    function closeDialog(ev: MediaQueryListEvent) {
      ev.matches && setOpen(false);
    }

    const query = window.matchMedia('(min-width: 640px)');

    query.addEventListener('change', closeDialog);
    return () => query.removeEventListener('change', closeDialog);
  }, []);

  return (
    <div className="flex h-full sm:hidden">
      <div className="flex items-center gap-x-2">
        <Button
          onPress={delayedOpen}
          aria-label="Öffne Hauptmenu"
          variant="toolbar"
        >
          <Icon name="menu" />
        </Button>
        <ModalOverlay
          isOpen={open}
          onOpenChange={setOpen}
          isDismissable
          className="fixed inset-0 z-20 backdrop-blur-sm"
        >
          <Modal className="fixed inset-4 bottom-auto mx-auto max-w-xl rounded-md bg-bg-subtle shadow-md ring-1 ring-border">
            <Dialog className="focus:outline-none">
              {({ close }) => (
                <div className="flex flex-col font-medium">
                  <Heading className="sr-only">Hauptmenü</Heading>
                  <div className="flex items-center justify-between border-b p-2">
                    <Link
                      href="/"
                      className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ui-border focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <div className="flex items-center gap-x-1 pr-1">
                        <svg className="h-12 w-12 fill-current">
                          <use href={`${LogoImage}#logo`} />
                        </svg>
                        <h1 className="text-xl font-semibold">runde.tips</h1>
                      </div>
                    </Link>
                    <Button variant="toolbar" onPress={close}>
                      <Icon name="close" />
                    </Button>
                  </div>
                  <nav className="flex flex-col border-b p-2">
                    {navItems.map((item, ix) => {
                      const href = `/${[championshipSegment, item.viewSegment]
                        .filter(Boolean)
                        .join('/')}`;
                      return (
                        <Link
                          key={ix}
                          aria-current={
                            href === location.pathname ? 'page' : null
                          }
                          href={href}
                          className="my-1 rounded border-l-4 border-transparent
                          px-4 py-2 first:mt-0 hover:border-ui-border-hover focus:outline-none focus-visible:ring-2
                          focus-visible:ring-ui-border focus-visible:ring-offset-2 focus-visible:ring-offset-bg aria-[current=page]:border-accent-ui-border-hover"
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="flex flex-col p-2">
                    <div className="mb-1 flex items-center justify-between py-1 pl-5">
                      <span>Hell/Dunkel-Modus</span>
                      <ColorSchemeMenu />
                    </div>
                  </div>
                </div>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
        <h2 className="text-xl font-semibold">
          {championship?.name || 'Kein Turnier'}
        </h2>
      </div>
    </div>
  );
}
