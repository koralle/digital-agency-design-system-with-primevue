import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import StyleClass from 'primevue/styleclass'
import './styles.css'

setup(app => {
  app.use(PrimeVue, {
    unstyled: true,
  })

  app.directive('styleclass', StyleClass)
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    layout: 'fullscreen',
  },
  decorators: [
    (_, { parameters }) => {
      const { componentType } = parameters

      switch (componentType) {
        case 'layout':
          return {
            template: `
              <div
                :class="[
                  'grid place-items-center',
                  'w-[100cqi] h-[100cqb]',
                ]"
              >
                <story />
              </div>
            `,
          }
        default:
          return {
            template: `
              <div
                :class="[
                  'grid place-items-center',
                  'w-full h-full p-[2rem]',
                ]"
              >
                <story />
              </div>
            `,
          }
      }
    },
  ],
}

export default preview
