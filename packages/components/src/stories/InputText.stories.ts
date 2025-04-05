import type { Meta, StoryObj } from '@storybook/vue3'
import { InputText } from '../components/InputText'
import type { InputTextProps } from '../components/InputText'
import { within, userEvent, expect } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import { ref, watch } from 'vue'

const meta: Meta<typeof InputText> = {
  title: 'Components / Form / InputText',
  component: InputText,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      description: 'コンポーネントのサイズを変更します。',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    modelValue: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    fluid: {
      control: 'boolean',
    },
  },
  args: {
    size: 'medium',
    disabled: false,
    invalid: false,
    required: false,
    modelValue: '',
    placeholder: '名前を入力してください',
    fluid: false,
  } satisfies InputTextProps,
  render: (args: InputTextProps) => {
    const [, updateArgs] = useArgs<typeof InputText>()
    return {
      components: {
        InputText,
      },
      setup() {
        const model = ref(args.modelValue)

        watch(
          () => args.modelValue,
          value => {
            model.value = value
          },
        )

        const handlers: (typeof InputText)['emits'] = {
          'update:modelValue': (value: string | undefined) => updateArgs({ modelValue: value }),
          'value-change': (value: string | undefined) => updateArgs({ modelValue: value }),
        }

        return {
          model,
          handlers,
          args,
        }
      },
      template: `
        <InputText
          v-model="model"
          v-on="handlers"
          :disabled="args.disabled"
          :invalid="args.invalid"
          :placeholder="args.placeholder"
          :size="args.size"
          :required="args.required"
          :fluid="args.fluid"
        />
      `,
    }
  },
}

export default meta
type Story = StoryObj<typeof InputText>

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await step("'Hello'と入力すると、'Hello'と表示される", async () => {
      await userEvent.clear(input)
      await userEvent.type(input, 'Hello')
      await expect(input).toHaveValue('Hello')
    })
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'Disabled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await expect(input).toBeDisabled()
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    modelValue: 'Invalid',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await expect(input).toHaveAttribute('aria-invalid', 'true')
  },
}

export const Fluid = {
  args: {
    fluid: true,
    modelValue: 'Hello',
  },
} satisfies Story
