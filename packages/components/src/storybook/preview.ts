import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import PrimeVue from 'primevue/config';
import './styles.css';

setup(app => {
  app.use(PrimeVue, {
    unstyled: true,
  });
});

const preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    layout: 'centered',
  },
} satisfies Preview;

export default preview;
