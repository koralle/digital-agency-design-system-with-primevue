import type { Meta, StoryObj } from '@storybook/vue3'
import { Checkbox } from '@digital-agency-design-system-with-primevue/components/checkbox'
import type { CheckboxProps } from '@digital-agency-design-system-with-primevue/components/checkbox'
import { useArgs } from '@storybook/preview-api'
import { ref, watch } from 'vue'

const meta = {
  title: 'Components / Checkbox',
  component: Checkbox,
  tags: ['autodocs', 'components'],
  argTypes: {
    binary: {
      control: 'boolean',
      description: 'チェックボックスの状態',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'チェックボックスのサイズ',
    },
    label: {
      control: 'text',
      description: 'チェックボックスのラベル',
    },
    disabled: {
      control: 'boolean',
      description: 'チェックボックスの無効状態',
    },
    invalid: {
      control: 'boolean',
      description: 'チェックボックスの無効状態',
    },
    indeterminate: {
      control: 'boolean',
      description: 'チェックボックスの不確定状態',
    },
    required: {
      control: 'boolean',
      description: 'チェックボックスの必須状態',
    },
    readonly: {
      control: 'boolean',
      description: 'チェックボックスの読み取り専用状態',
    },
  },
  args: {
    binary: false,
    value: '選択肢',
    size: 'medium',
    label: '選択肢',
    invalid: false,
    disabled: false,
    indeterminate: false,
    required: false,
    readonly: false,
  } satisfies CheckboxProps,
  render: (args: CheckboxProps) => {
    const [, updateArgs] = useArgs<typeof Checkbox>()
    return {
      components: {
        Checkbox,
      },
      setup() {
        const model = ref(args.modelValue)
        const indeterminate = ref(args.indeterminate)
        watch(
          () => args.modelValue,
          value => {
            model.value = value
          },
        )
        watch(
          () => args.indeterminate,
          value => {
            indeterminate.value = value
          },
        )

        const handlers: (typeof Checkbox)['emits'] = {
          'update:modelValue': (value: boolean) => updateArgs({ modelValue: value }),
          'update:indeterminate': (value: boolean) => updateArgs({ indeterminate: value }),
        }

        return {
          model,
          indeterminate,
          handlers,
          args,
        }
      },
      template: `<Checkbox
        v-model="model"
        v-model:indeterminate="indeterminate"
        v-on="handlers"
        :value="args.value"
        :label="args.label"
        :disabled="args.disabled"
        :invalid="args.invalid"
        :binary="args.binary"
        :size="args.size"
        :required="args.required"
        :readonly="args.readonly"
      />`,
    }
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default = {
} satisfies Story

export const Indeterminate = {
  args: {
    indeterminate: true,
    value: '選択肢',
  }
}
