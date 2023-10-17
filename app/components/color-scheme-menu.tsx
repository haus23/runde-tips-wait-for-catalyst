import { type Key } from 'react';
import { useFetcher } from '@remix-run/react';

import {
  Item,
  Menu,
  MenuTrigger,
  Popover,
  type Selection,
} from 'react-aria-components';

import { UserColorScheme, useTheme } from '#utils/theme';

import { Button } from './(ui)/button';
import { Icon, type IconName } from './(ui)/icon';

const options = [
  {
    id: 'light',
    label: 'Hell',
    iconName: 'sun',
  },
  {
    id: 'dark',
    label: 'Dunkel',
    iconName: 'moon',
  },
  {
    id: 'system',
    label: 'System',
    iconName: 'computer',
  },
] satisfies { id: UserColorScheme; label: string; iconName: IconName }[];

export function ColorSchemeMenu() {
  const { colorScheme, userRequested } = useTheme();
  const fetcher = useFetcher();

  const selectedScheme: Selection = new Set([
    userRequested ? colorScheme : 'system',
  ]);
  function setSelectedScheme(schemeSelection: Key) {
    const scheme = UserColorScheme.parse(schemeSelection);
    fetcher.submit(
      { colorScheme: scheme },
      { method: 'POST', action: '/resource/theme' },
    );
  }

  return (
    <MenuTrigger>
      <Button
        aria-label="Farbschema-Auswahl öffnen"
        variant="toolbar"
        className={userRequested ? 'text-fg' : 'text-fg-subtle'}
      >
        {colorScheme === 'light' && <Icon name="sun" />}
        {colorScheme === 'dark' && <Icon name="moon" />}
      </Button>
      <Popover>
        <Menu
          aria-label="Farbschema-Auswahl Dialog"
          className="flex flex-col gap-y-2 rounded border border-ui-border bg-bg-subtle p-2 text-fg-subtle"
          selectionMode="single"
          defaultSelectedKeys={selectedScheme}
          onAction={setSelectedScheme}
        >
          {options.map((o) => (
            <Item
              key={o.id}
              id={o.id}
              textValue={o.label}
              className="flex items-center gap-x-2 rounded px-4 py-1
              data-[focused]:bg-ui-hover data-[focused]:text-fg data-[selected]:data-[focused]:text-accent-fg
              data-[selected]:text-accent-fg-subtle data-[focused]:outline-none
              "
            >
              <Icon name={o.iconName} />
              <span className="select-none">{o.label}</span>
            </Item>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
