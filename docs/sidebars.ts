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
        'components/panel-stack',
      ],
    },
    {
      type: 'category',
      label: 'Styleguide',
      collapsed: false,
      items: [
        'styleguide/styleguide-overview',
        'styleguide/styleguide-principles',
        'styleguide/styleguide-checklist',
        'styleguide/styleguide-anti-patterns',
        {
          type: 'category',
          label: 'Foundations',
          collapsed: true,
          items: [
            'styleguide/styleguide-layout',
            'styleguide/styleguide-typography',
            'styleguide/styleguide-spacing',
            'styleguide/styleguide-color',
          ],
        },
        {
          type: 'category',
          label: 'Composition',
          collapsed: true,
          items: [
            'styleguide/styleguide-sections-and-rows',
            'styleguide/styleguide-forms',
            'styleguide/styleguide-dialogs',
            'styleguide/styleguide-navigation',
          ],
        },
        {
          type: 'category',
          label: 'Patterns',
          collapsed: true,
          items: [
            'styleguide/patterns/styleguide-pattern-settings-page',
            'styleguide/patterns/styleguide-pattern-bookmarks-manager',
            'styleguide/patterns/styleguide-pattern-side-panel',
            'styleguide/patterns/styleguide-pattern-extension-popup',
          ],
        },
        {
          type: 'category',
          label: 'Samples',
          collapsed: true,
          items: [
            'styleguide/samples/styleguide-sample-link-collector',
            'styleguide/samples/styleguide-sample-reader-mode',
            'styleguide/samples/styleguide-sample-tab-manager',
          ],
        },
        'styleguide/styleguide-chromium-reference',
      ],
    },
  ],
};

export default sidebars;
