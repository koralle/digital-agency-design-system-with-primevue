import type { Meta, StoryObj } from '@storybook/vue3';
import { Textarea } from '@digital-agency-design-system-with-primevue/components/textarea';
import type { TextareaProps } from '@digital-agency-design-system-with-primevue/components/textarea';
import { within, userEvent, expect } from '@storybook/test';

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
    modelValue: '',
    placeholder: 'This is placeholder.',
    autoResize: false,
    maxlength: 100,
  } satisfies TextareaProps,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Hello');

    await expect(input).toHaveValue('Hello');
  },
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Hello');

    await expect(input).toHaveValue('Hello');
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

export const Maxlength: Story = {
  args: {
    maxlength: 200,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Hello');

    await expect(input).toHaveValue('Hello');
  },
};
