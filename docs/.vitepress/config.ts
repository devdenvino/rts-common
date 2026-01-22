import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@devdenvino/rts-common",
  description: "Shared component library and utilities for micro-frontend applications",
  base: '/rts-common/',
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'rts-common | Shared Component Library' }],
    ['meta', { property: 'og:site_name', content: 'rts-common' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/overview' },
      { text: 'API', link: '/api/overview' },
      { 
        text: 'Resources',
        items: [
          { text: 'Contributing', link: 'https://github.com/devdenvino/rts-common/blob/main/CONTRIBUTING.md' },
          { text: 'Security', link: 'https://github.com/devdenvino/rts-common/blob/main/SECURITY.md' },
          { text: 'Changelog', link: 'https://github.com/devdenvino/rts-common/blob/main/CHANGELOG.md' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'Theme Management', link: '/guide/theming' },
            { text: 'Layout System', link: '/guide/layouts' },
          ]
        },
        {
          text: 'Guides',
          items: [
            { text: 'Building MFEs', link: '/guide/micro-frontends' },
            { text: 'Styling', link: '/guide/styling' },
            { text: 'API Client', link: '/guide/api-client' },
            { text: 'Best Practices', link: '/guide/best-practices' },
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/overview' },
            { text: 'Component Index', link: '/components/index' },
          ]
        },
        {
          text: 'UI Components',
          items: [
            { text: 'Button', link: '/components/ui/button' },
            { text: 'Card', link: '/components/ui/card' },
            { text: 'Dialog', link: '/components/ui/dialog' },
            { text: 'Form', link: '/components/ui/form' },
            { text: 'Input', link: '/components/ui/input' },
            { text: 'Select', link: '/components/ui/select' },
            { text: 'Table', link: '/components/ui/table' },
            { text: 'All UI Components', link: '/components/ui/all' },
          ]
        },
        {
          text: 'Layout Components',
          items: [
            { text: 'AppBase', link: '/components/layout/app-base' },
            { text: 'Sidebar', link: '/components/layout/sidebar' },
            { text: 'TopNav', link: '/components/layout/topnav' },
          ]
        },
        {
          text: 'Magic UI',
          items: [
            { text: 'Animated Theme Toggler', link: '/components/magicui/animated-theme-toggler' },
            { text: 'Aurora Text', link: '/components/magicui/aurora-text' },
            { text: 'Magic Card', link: '/components/magicui/magic-card' },
            { text: 'Meteors', link: '/components/magicui/meteors' },
            { text: 'Typing Animation', link: '/components/magicui/typing-animation' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/overview' },
          ]
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useAuth', link: '/api/hooks/use-auth' },
            { text: 'useApiClient', link: '/api/hooks/use-api' },
            { text: 'useIsMobile', link: '/api/hooks/use-mobile' },
            { text: 'useControlledState', link: '/api/hooks/use-controlled-state' },
          ]
        },
        {
          text: 'Utilities',
          items: [
            { text: 'cn', link: '/api/utils/cn' },
            { text: 'Animations', link: '/api/utils/animations' },
            { text: 'Constants', link: '/api/utils/constants' },
          ]
        },
        {
          text: 'Context',
          items: [
            { text: 'AppNavProvider', link: '/api/context/navigation' },
            { text: 'SearchProvider', link: '/api/context/search' },
          ]
        },
        {
          text: 'Types',
          items: [
            { text: 'Type Definitions', link: '/api/types' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/devdenvino/rts-common' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 DevDenvino'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/devdenvino/rts-common/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  ignoreDeadLinks: [
    // Ignore localhost links in development
    /^http:\/\/localhost/,
    // Ignore LICENSE file (exists in root, not docs)
    /\/LICENSE$/,
  ]
})
