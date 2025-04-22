import type { Meta, StoryObj } from '@storybook/vue3'
import DateInput from '../components/DateInput/DateInput.vue'
import type { DatePickerProps } from '../components/DateInput/types'
import { useArgs } from '@storybook/preview-api'
import { ref, watch } from 'vue'
import { within, userEvent, expect } from '@storybook/test'

const meta = {
  title: 'Components / Form / DateInput',
  component: DateInput,
  tags: ['autodocs', 'components'],
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
    modelValue: {
      control: 'date',
      description: '日付の値',
    },
    name: {
      table: {
        disable: true
      }
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: '日付選択モード',
    },
    dateFormat: {
      control: 'text',
      description: '日付の形式',
    },
    inline: {
      control: 'boolean',
      description: 'インラインカレンダー表示',
    },
    showOtherMonths: {
      control: 'boolean',
      description: '他の月の日付を表示',
    },
    selectOtherMonths: {
      control: 'boolean',
      description: '他の月の日付を選択可能にする',
    },
    numberOfMonths: {
      control: 'number',
      description: '表示するカレンダーの数',
    },
    view: {
      control: 'select',
      options: ['date', 'month', 'year'],
      description: '表示モード',
    },
    minDate: {
      control: 'date',
      description: '最小選択可能日付',
    },
    maxDate: {
      control: 'date',
      description: '最大選択可能日付',
    },
    disabledDates: {
      table: {
        disable: true
      }
    },
    disabledDays: {
      table: {
        disable: true
      }
    },
    maxDateCount: {
      table: {
        disable: true
      }
    },
    showOnFocus: {
      control: 'boolean',
      description: 'フォーカス時に表示',
    },
    showWeek: {
      control: 'boolean',
      description: '週を表示',
    },
    manualInput: {
      control: 'boolean',
      description: '手動入力',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'コンポーネントのサイズ',
    },
    invalid: {
      control: 'boolean',
      description: '無効状態のスタイル表示',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    readonly: {
      control: 'boolean',
      description: '読み取り専用状態',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
    fluid: {
      control: 'boolean',
      description: '親要素の幅いっぱいに表示',
    },
    ariaLabelledBy: {
      table: {
        disable: true
      }
    },
    ariaLabel: {
      table: {
        disable: true
      }
    }
  },
  args: {
    selectionMode: 'single',
    dateFormat: 'yy/mm/dd',
    inline: false,
    showOtherMonths: true,
    selectOtherMonths: true,
    numberOfMonths: 1,
    view: 'date',
    showOnFocus: true,
    size: 'medium',
    invalid: false,
    disabled: false,
    readonly: false,
    placeholder: '日付を選択',
    fluid: false,
  } satisfies DatePickerProps,
  render: (args: DatePickerProps) => {
    const [, updateArgs] = useArgs<typeof DateInput>()
    return {
      components: {
        DateInput,
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
          'update:modelValue': (value: Date | Date[] | null | (Date | null)[]) => updateArgs({ modelValue: value }),
          'value-change': (value: Date | Date[] | null | (Date | null)[]) => updateArgs({ modelValue: value }),
        }

        return {
          model,
          handlers,
          args,
        }
      },
      template: `
        <DateInput
          v-model="model"
          v-on="handlers"
          :selection-mode="args.selectionMode"
          :date-format="args.dateFormat"
          :inline="args.inline"
          :show-other-months="args.showOtherMonths"
          :select-other-months="args.selectOtherMonths"
          :number-of-months="args.numberOfMonths"
          :view="args.view"
          :min-date="args.minDate"
          :max-date="args.maxDate"
          :disabled-dates="args.disabledDates"
          :disabled-days="args.disabledDays"
          :max-date-count="args.maxDateCount"
          :show-on-focus="args.showOnFocus"
          :show-week="args.showWeek"
          :manual-input="args.manualInput"
          :size="args.size"
          :invalid="args.invalid"
          :disabled="args.disabled"
          :readonly="args.readonly"
          :placeholder="args.placeholder"
          :fluid="args.fluid"
        />
      `,
    }
  },
} satisfies Meta<typeof DateInput>

export default meta

type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await step('コンポーネントが正しくレンダリングされていること', async () => {
      await expect(input).toBeInTheDocument()
    })
  },
}

export const Inline: Story = {
  args: {
    inline: true,
  },
}

export const MultipleMonths: Story = {
  args: {
    numberOfMonths: 2,
  },
}

export const RangeSelection: Story = {
  args: {
    selectionMode: 'range',
  },
}

export const MonthView: Story = {
  args: {
    view: 'month',
  },
}

export const YearView: Story = {
  args: {
    view: 'year',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await step('入力フィールドが無効状態であること', async () => {
      await expect(input).toBeDisabled()
    })
  }
}

export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await step('入力フィールドがエラー状態であること', async () => {
      await expect(input).toBeInvalid()
    })
  }
}

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: new Date(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await step('入力フィールドが読み取り専用状態であること', async () => {
      await expect(input).toHaveAttribute('readonly')
    })
  }
}

export const Fluid: Story = {
  args: {
    fluid: true,
  },
}
