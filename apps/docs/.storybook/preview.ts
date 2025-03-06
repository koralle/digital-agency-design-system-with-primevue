import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import './styles.css';
import PrimeVue from 'primevue/config';

setup(app => {
  app.use(PrimeVue, {
    unstyled: true,
  });
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
