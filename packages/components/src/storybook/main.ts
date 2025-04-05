import type { StorybookConfig } from '@storybook/vue3-vite'

const config = {
  staticDirs: ['./public'],
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/experimental-addon-test',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.mts',
      },
      docgen: 'vue-component-meta',
    },
  },
  core: {
    disableTelemetry: true,
  },
} satisfies StorybookConfig

export default config
