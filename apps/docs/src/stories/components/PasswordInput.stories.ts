import type { Meta, StoryObj } from '@storybook/vue3';
import { PasswordInput } from '@digital-agency-design-system-with-primevue/components/password-input';
import type { PasswordInputProps } from '@digital-agency-design-system-with-primevue/components/password-input';
import { within, expect } from '@storybook/test';
import { useArgs } from '@storybook/preview-api';
import { ref, watch } from 'vue';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components / PasswordInput',
  component: PasswordInput,
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
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    disabled: false,
    invalid: false,
    placeholder: 'This is placeholder.',
    modelValue: '',
    size: 'medium',
  } satisfies PasswordInputProps,

  render: (args: PasswordInputProps) => {
    const [, updateArgs] = useArgs<typeof PasswordInput>();
    return {
      components: {
        PasswordInput,
      },
      setup() {
        const model = ref(args.modelValue);

        watch(
          () => args.modelValue,
          value => {
            model.value = value;
          },
        );

        const handlers: (typeof PasswordInput)['emits'] = {
          'update:modelValue': (value: string) => updateArgs({ modelValue: value }),
        };

        return {
          model,
          handlers,
          args,
        };
      },
      template: `<PasswordInput
          :id="args.id"
          v-model="model"
          v-on="handlers"
          :model-value="args.modelValue"
          :disabled="args.disabled"
          :invalid="args.invalid"
          :placeholder="args.placeholder"
          :size="args.size"
        />`,
    };
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    modelValue: '',
  },
};

export const Disabled: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByRole('textbox');

    await step('disabled属性をtrueにすると、テキスト入力ができない', async () => {
      expect(passwordInput).toBeDisabled();
    });
  },
  args: {
    modelValue: 'disabled',
    disabled: true,
  } satisfies PasswordInputProps,
};

export const Invalid: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByRole('textbox');

    await step('invalid属性をtrueにすると、invalidモードになる', async () => {
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
    });
  },
  args: {
    modelValue: 'invalid',
    invalid: true,
  } satisfies PasswordInputProps,
};
