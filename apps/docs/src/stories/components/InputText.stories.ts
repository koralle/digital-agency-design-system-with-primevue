import type { Meta, StoryObj } from '@storybook/vue3';
import { InputText } from '@digital-agency-design-system-with-primevue/components/input-text';
import type { InputTextProps } from '@digital-agency-design-system-with-primevue/components/input-text';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof InputText> = {
  title: 'Components / InputText',
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
    readonly: {
      control: 'boolean',
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
    readonly: false,
    required: false,
    modelValue: '',
    placeholder: 'This is placeholder.',
    fluid: false,
  } satisfies InputTextProps,
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Hello');

    await expect(input).toHaveValue('Hello');
  },
  args: {
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'Disabled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await expect(input).toBeDisabled();
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    modelValue: 'Invalid',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

export const Fluid = {
  args: {
    fluid: true,
    modelValue: 'Hello',
  },
} satisfies Story;
