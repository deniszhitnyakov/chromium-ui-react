import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Chromium UI React',
  tagline: 'React components that look like Chromium\'s native cr_elements',
  favicon: 'img/favicon.svg',

  url: 'https://ztnkv.github.io',
  baseUrl: '/chromium-ui-react/',
  trailingSlash: false,

  organizationName: 'ztnkv',
  projectName: 'chromium-ui-react',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    './plugins/raw-markdown',
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-B7N5Q2MHXK',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    navbar: {
      title: 'Chromium UI React',
      logo: {
        alt: 'Chromium UI React Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/ztnkv/chromium-ui-react',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/' },
            { label: 'One-page LLM doc', to: '/one-page' },
            { label: 'Components', to: '/components/button' },
          ],
        },
        {
          title: 'Source',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ztnkv/chromium-ui-react',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chromium UI React. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'tsx', 'jsx'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
