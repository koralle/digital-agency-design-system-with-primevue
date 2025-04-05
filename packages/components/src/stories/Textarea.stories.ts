import type { Meta, StoryObj } from '@storybook/vue3'
import { Textarea } from '@digital-agency-design-system-with-primevue/components/textarea'
import type { TextareaProps } from '@digital-agency-design-system-with-primevue/components/textarea'
import { within, userEvent, expect } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import { ref, watch } from 'vue'

const meta: Meta<typeof Textarea> = {
  title: 'Components / Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    modelValue: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    autoResize: {
      control: 'boolean',
    },
    maxlength: {
      control: 'number',
    },
  },
  args: {
    disabled: false,
    invalid: false,
    placeholder: 'This is placeholder.',
    autoResize: false,
    maxlength: 100,
    modelValue: '',
  } satisfies TextareaProps,

  render: (args: TextareaProps) => {
    const [, updateArgs] = useArgs<typeof Textarea>()
    return {
      components: {
        Textarea,
      },
      setup() {
        const model = ref(args.modelValue)

        watch(
          () => args.modelValue,
          value => {
            model.value = value
          },
        )

        const handlers: (typeof Textarea)['emits'] = {
          'update:modelValue': (value: string) => updateArgs({ modelValue: value }),
        }

        return {
          model,
          handlers,
          args,
        }
      },
      template: `<Textarea
          :id="args.id"
          v-model="model"
          v-on="handlers"
          :model-value="args.modelValue"
          :disabled="args.disabled"
          :invalid="args.invalid"
          :placeholder="args.placeholder"
          :maxlength="args.maxlength"
          :autoResize="args.autoResize"
        />`,
    }
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')

    // 基本的なASCII文字
    await step('ASCII文字のみの場合、文字数は正確にカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'Hello, world!')

      const counter = await canvas.findByText(/13 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 結合文字と発音区別符号
    await step('アクセント記号付きラテン文字は1文字としてカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'résumé')

      const counter = await canvas.findByText(/6 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // サロゲートペア（絵文字以外）
    await step('サロゲートペアの漢字は1文字としてカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, '𠮷野家')

      const counter = await canvas.findByText(/3 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 複数のサロゲートペアを含む文字列
    await step('複数のサロゲートペアを含む文字列は正確にカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, '𠮷野家で𩸽を食べる')

      const counter = await canvas.findByText(/9 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 異体字セレクタを含む文字
    await step('異体字セレクタを含む文字は1文字としてカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, '葛󠄀城')

      const counter = await canvas.findByText(/2 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // ZWJ (Zero Width Joiner) シーケンス
    await step('ZWJシーケンスを含む家族絵文字は1文字としてカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, '👨‍👩‍👧‍👦')

      const counter = await canvas.findByText(/1 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 合字
    await step('合字は1文字としてカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'café') // fとeの合字

      const counter = await canvas.findByText(/4 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 結合絵文字シーケンス
    await step('結合絵文字シーケンスは1文字としてカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, '👩‍🚀')

      const counter = await canvas.findByText(/1 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 修飾絵文字シーケンス
    await step('肌の色修飾子を含む絵文字は1文字としてカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, '👋🏽')

      const counter = await canvas.findByText(/1 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 複合的なケース
    await step('さまざまな種類の文字を含む文字列は正確にカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'こんにちは🌏résumé𠮷野家👨‍👩‍👧‍👦')

      const counter = await canvas.findByText(/16 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 特殊なWhitespace文字
    await step('特殊なWhitespace文字もカウントされる', async () => {
      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'a\u00A0b\u2003c') // ノーブレークスペースとemスペース

      const counter = await canvas.findByText(/5 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    // 制御文字
    await step('制御文字はカウントに含まれる', async () => {
      await userEvent.clear(textarea)
      const testString = 'a\tb\nc' // タブと改行
      await userEvent.type(textarea, testString)

      const counter = await canvas.findByText(/5 \/ 100/i)
      expect(counter).toBeInTheDocument()
    })

    await step('tabキーを入力すると、フォーカスされること', async () => {
      await userEvent.tab()
      await userEvent.tab()
      expect(textarea).toHaveFocus()
    })
  },
  args: {
    modelValue: '',
  },
}

export const Disabled: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')

    await step('disabled属性をtrueにすると、テキスト入力ができない', async () => {
      expect(textarea).toBeDisabled()
    })
  },
  args: {
    modelValue: 'disabled',
    disabled: true,
  } satisfies TextareaProps,
}

export const Invalid: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')

    await step('invalid属性をtrueにすると、invalidモードになる', async () => {
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
    })
  },
  args: {
    modelValue: 'invalid',
    invalid: true,
  } satisfies TextareaProps,
}

export const AutoResize: Story = {
  args: {
    modelValue: '',
    autoResize: true,
  } satisfies TextareaProps,
}

export const Maxlength: Story = {
  args: {
    modelValue: '',
    maxlength: 200,
  } satisfies TextareaProps,
}
