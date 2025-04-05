import type { Meta, StoryObj } from '@storybook/vue3'
import { Select } from '@digital-agency-design-system-with-primevue/components/select'
import type { SelectProps } from '@digital-agency-design-system-with-primevue/components/select'
import { within, userEvent, expect } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import { ref, watch } from 'vue'

const meta: Meta<typeof Select> = {
  title: 'Components / Form /  Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      description: 'コンポーネントのサイズを変更します。',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    options: {
      control: 'object',
      description: 'セレクトボックスの選択肢',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
    modelValue: {
      control: 'object',
      description: '選択された値',
    },
    invalid: {
      control: 'boolean',
      description: '無効状態',
    },
    fluid: {
      control: 'boolean',
    },
  },
  args: {
    size: 'medium',
    disabled: false,
    options: ['選択肢1', '選択肢2', '選択肢3'],
    placeholder: '選択してください',
    modelValue: '',
    invalid: false,
    fluid: false,
  } satisfies SelectProps,
  render: (args: SelectProps) => {
    const [, updateArgs] = useArgs<typeof Select>()
    return {
      components: {
        Select,
      },
      setup() {
        const model = ref(args.modelValue)

        watch(
          () => args.modelValue,
          value => {
            model.value = value
          },
        )

        const handlers: (typeof Select)['emits'] = {
          'update:modelValue': (value: string) => updateArgs({ modelValue: value }),
        }

        return {
          model,
          handlers,
          args,
        }
      },
      template: `<InputText
        :id="args.id"
        v-model="model"
        v-on="handlers"
        :model-value="args.modelValue"
        :disabled="args.disabled"
        :invalid="args.invalid"
        :placeholder="args.placeholder"
        :size="args.size"
        :readonly="args.readonly"
      />`,
    }
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    size: 'medium',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')

    await expect(select).toHaveAttribute('aria-disabled', 'true')
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')

    await expect(select).toHaveAttribute('aria-invalid', 'true')
  },
}

export const WithPreselectedValue: Story = {
  args: {
    modelValue: { name: '選択肢2', value: 'option2' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')

    await expect(select).toHaveTextContent('選択肢2')
  },
}
