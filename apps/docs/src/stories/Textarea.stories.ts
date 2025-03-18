import type { Meta, StoryObj } from '@storybook/vue3';
import { Textarea } from '@digital-agency-design-system-with-primevue/components/textarea';
import type { TextareaProps } from '@digital-agency-design-system-with-primevue/components/textarea';
import { within, userEvent, expect } from '@storybook/test';
import { useArgs } from '@storybook/preview-api';
import { ref, watch } from 'vue';

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
    readonly: {
      control: 'boolean',
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
    const [, updateArgs] = useArgs<typeof Textarea>();
    return {
      components: {
        Textarea,
      },
      setup() {
        const model = ref(args.modelValue);

        watch(
          () => args.modelValue,
          value => {
            model.value = value;
          },
        );

        const handlers: (typeof Textarea)['emits'] = {
          'update:modelValue': (value: string) => updateArgs({ modelValue: value }),
        };

        return {
          model,
          handlers,
          args,
        };
      },
      template:
        `<Textarea
          v-model="model"
          v-on="handlers"
          :model-value="args.modelValue"
          :disabled="args.disabled"
          :invalid="args.invalid"
          :placeholder="args.placeholder"
          :maxlength="args.maxlength"
          :autoResize="args.autoResize"
        />`,
    };
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.clear(input)
    await userEvent.type(input, 'Hello');

    await expect(input).toHaveValue('Hello');
  },
  args: {
    modelValue: ''
  },
};
