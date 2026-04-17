import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['intro', 'one-page', 'installation', 'tokens'],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        'components/button',
        'components/icon-button',
        'components/checkbox',
        'components/radio',
        'components/toggle',
        'components/input',
        'components/select',
        'components/chip',
        'components/badge',
        'components/card',
        'components/divider',
        'components/toolbar',
        'components/tabs',
        'components/menu',
        'components/spinner',
        'components/toast',
        'components/dialog',
        'components/tooltip',
        'components/link',
        'components/list',
        'components/empty-state',
      ],
    },
  ],
};

export default sidebars;
