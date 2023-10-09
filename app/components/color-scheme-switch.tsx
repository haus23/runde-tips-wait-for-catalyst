import {
  MenuTrigger,
  Popover,
  Menu,
  Item,
  type Selection,
} from 'react-aria-components';
import { Button } from './(ui)/button';
import { Icon, type IconName } from './(ui)/icon';
import { useTheme } from '~/utils/color-scheme';
import { useReducer, useState, type Key } from 'react';
import { invariant } from '~/utils/misc';

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
] satisfies { id: string; label: string; iconName: IconName }[];

export function ColorSchemeSwitch() {
  const { theme, userSelected } = useTheme();

  const selectedTheme: Selection = new Set([userSelected ? theme : 'system']);
  function setSelectedTheme(themeSelection: Key) {
    invariant(
      typeof themeSelection === 'string',
      'Not possible to select all themes'
    );
    console.log(themeSelection);
  }

  return (
    <MenuTrigger>
      <Button
        aria-label="Farbschema wechseln"
        variant="toolbar"
        className={userSelected ? 'text-fg' : 'text-fg-subtle'}
      >
        {theme === 'light' && <Icon name="sun" />}
        {theme === 'dark' && <Icon name="moon" />}
      </Button>
      <Popover>
        <Menu
          className="flex flex-col gap-y-2 p-2 bg-bg-subtle border-ui-border border text-fg-subtle rounded"
          selectionMode="single"
          selectedKeys={selectedTheme}
          onAction={setSelectedTheme}
        >
          {options.map((o) => (
            <Item
              key={o.id}
              id={o.id}
              textValue={o.label}
              className="flex items-center gap-x-2 px-4 py-1
              data-[focused]:outline-none data-[focused]:bg-ui-hover rounded data-[focused]:text-fg
              data-[selected]:text-accent-fg-subtle data-[selected]:data-[focused]:text-accent-fg
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
