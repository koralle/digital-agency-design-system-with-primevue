import type { Meta, StoryObj } from '@storybook/vue3'
import RadioButton from '../components/RadioButton/RadioButton.vue'
import type { RadioButtonProps } from '../components/RadioButton/types'
import { useArgs } from '@storybook/preview-api'
import { ref, watch } from 'vue'
import { within, userEvent, expect } from '@storybook/test'
import { RadioButtonGroup } from '../components/RadioButtonGroup'
import { TabStyle } from 'primevue'

const meta = {
  title: 'Components / RadioButton',
  component: RadioButton,
  tags: ['autodocs', 'components'],
  argTypes: {
    value: {
      control: 'boolean',
      description: 'ラジオボタンの値',
    },
    modelValue: {
      control: 'object',
      description: 'ラジオボタンの状態',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'ラジオボタンのサイズ',
    },
    label: {
      control: 'text',
      description: 'ラジオボタンのラベル',
    },
    disabled: {
      control: 'boolean',
      description: 'ラジオボタンの無効状態',
    },
    invalid: {
      control: 'boolean',
      description: 'ラジオボタンのエラー状態',
    },
    binary: {
      control: 'boolean',
      description: 'ラジオボタンのバイナリ状態',
    },
    readonly: {
      control: 'boolean',
      description: 'ラジオボタンの読み取り専用状態',
    },
    tabindex: {
      table: {
        disable: true
      }
    },
    ariaLabel: {
      table: {
        disable: true
      }
    },
    ariaLabelledby: {
      table: {
        disable: true
      }
    },
  },
  args: {
    value: true,
    size: 'medium',
    label: 'オプション',
    invalid: false,
    disabled: false,
    readonly: false,
    binary: false,
  } satisfies RadioButtonProps,
  render: (args: RadioButtonProps) => {
    const [, updateArgs] = useArgs<typeof RadioButton>()
    return {
      components: {
        RadioButton,
      },
      setup() {
        const model = ref(args.modelValue)
        watch(
          () => args.modelValue,
          value => {
            model.value = value
          },
        )

        const handlers = {
          'update:modelValue': (value: boolean) => updateArgs({ modelValue: value }),
        } satisfies Partial<typeof RadioButton['emits']>

        return {
          model,
          handlers,
          args,
        }
      },
      template: `
        <RadioButton
          v-model="model"
          v-on="handlers"
          :value="args.value"
          :label="args.label"
          :disabled="args.disabled"
          :invalid="args.invalid"
          :binary="args.binary"
          :size="args.size"
          :readonly="args.readonly"
        />
      `,
    }
  },
} satisfies Meta<typeof RadioButton>

export default meta

type Story = StoryObj<typeof RadioButton>

export const Default: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioButton = await canvas.findByRole('radio', { name: args.label ?? '' })

    await step('コンポーネントが正しくレンダリングされていること', async () => {
      await expect(radioButton).toBeInTheDocument()
    })

    await step('ラジオボタンが選択されていること', async () => {
      await userEvent.click(radioButton)
      await expect(radioButton).toBeChecked()
    })
  },
}

export const Binary = {
  argTypes: {
    modelValue: {
      control: 'boolean',
    },
  },
  args: {
    value: true,
    modelValue: false,
    binary: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioButton = await canvas.findByRole('radio', { name: args.label ?? '' })

    await step('ラジオボタンが選択されていないこと', async () => {
      await expect(radioButton).not.toBeChecked()
    })

    await step('ラジオボタンが選択されていること', async () => {
      await userEvent.click(radioButton)
      await expect(radioButton).toBeChecked()
    })
  }
} satisfies Story

export const Selected = {
  args: {
    modelValue: true,
  }
} satisfies Story

export const Disabled = {
  argTypes: {
    value: {
      control: 'boolean',
      description: 'ラジオボタンの値',
    },
    modelValue: {
      control: 'boolean',
      description: 'ラジオボタンの状態',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'ラジオボタンのサイズ',
    },
    label: {
      control: 'text',
      description: 'ラジオボタンのラベル',
    },
    disabled: {
      control: 'boolean',
      description: 'ラジオボタンの無効状態',
    },
    invalid: {
      control: 'boolean',
      description: 'ラジオボタンのエラー状態',
    },
    binary: {
      control: 'boolean',
      description: 'ラジオボタンのバイナリ状態',
    },
    readonly: {
      control: 'boolean',
      description: 'ラジオボタンの読み取り専用状態',
    },
    tabindex: {
      table: {
        disable: true
      }
    },
    ariaLabel: {
      table: {
        disable: true
      }
    },
    ariaLabelledby: {
      table: {
        disable: true
      }
    },
  },
  args: {
    disabled: true,
    modelValue: true,
    binary: true
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioButton = await canvas.findByRole('radio', { name: args.label ?? '' })
    await step('ラジオボタンが無効状態であること', async () => {
      await expect(radioButton).toBeDisabled()
    })
  }
} satisfies Story

export const Invalid = {
  args: {
    invalid: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioButton = await canvas.findByRole('radio', { name: args.label ?? '' })

    await step('ラジオボタンがエラー状態であること', async () => {
      await expect(radioButton).toBeInvalid()
    })
  }
} satisfies Story

export const Group: Story = {
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
    value: {
      table: {
        disable: true
      }
    },
    name: {
      table: {
        disable: true
      }
    },
    modelValue: {
      control: 'select',
      options: ['option1', 'option2', 'option3'],
    },
    defaultValue: {
      control: 'select',
      options: ['option1', 'option2', 'option3'],
    },
    binary: {
      table: {
        disable: true
      }
    },
    inputId: {
      table: {
        disable: true
      }
    },
    ariaLabel: {
      table: {
        disable: true
      }
    },
    ariaLabelledby: {
      table: {
        disable: true
      }
    },
    tabindex: {
      table: {
        disable: true
      }
    },
  },
  args: {
    modelValue: 'option1',
    defaultValue: 'option1',
    binary: false
  },
  render: (args: RadioButtonProps) => {
    const [, updateArgs] = useArgs<typeof RadioButton>()
    return {
      components: {
        RadioButton,
        RadioButtonGroup
      },
      setup() {
        const model = ref(args.modelValue)
        watch(
          () => args.modelValue,
          value => {
            model.value = value
          },
        )

        const handlers = {
          'update:modelValue': (value: boolean) => updateArgs({ modelValue: value }),
        } satisfies Partial<typeof RadioButton['emits']>

        return {
          model,
          handlers,
          args,
        }
      },
      template: `
      <div>
        <div>
          <RadioButton
            v-model="model"
            v-on="handlers"
            name="group"
            value="option1"
            :invalid="args.invalid"
            :default-value="args.defaultValue"
            label="オプション1"
          />
          <RadioButton
            v-model="model"
            v-on="handlers"
            name="group"
            value="option2"
            :invalid="args.invalid"
            :default-value="args.defaultValue"
            label="オプション2"
          />
          <RadioButton
            v-model="model"
            v-on="handlers"
            name="group"
            value="option3"
            :invalid="args.invalid"
            label="オプション3"
          />
        </div>
        <div>選択値: {{ model }}</div>
      </div>
      `,
    }
  },
}
