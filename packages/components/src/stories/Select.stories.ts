import type { Meta, StoryObj } from '@storybook/vue3'
import { Select } from '../components/Select'
import type { SelectProps } from '../components/Select'
import { useArgs } from '@storybook/preview-api'
import { ref, watch } from 'vue'

const meta: Meta<typeof Select> = {
  title: 'Components / Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    //componentType: 'layout',
  },
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
    optionLabel: {
      control: 'text',
      description: 'セレクトボックスの選択肢のラベル',
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
    editable: {
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
    editable: false,
    optionLabel: '',
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
          'update:modelValue': (value: any) => updateArgs({ modelValue: value }),
        }

        return {
          model,
          handlers,
          args,
        }
      },
      template: `
        <Select
          :id="args.id"
          v-model="model"
          v-on="handlers"
          :disabled="args.disabled"
          :invalid="args.invalid"
          :placeholder="args.placeholder"
          :size="args.size"
          :readonly="args.readonly"
          :fluid="args.fluid"
          :options="args.options"
          :option-label="args.optionLabel"
          :editable="args.editable"
        />
      `,
    }
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
export const Invalid: Story = {
  args: {
    invalid: true,
  },
}
