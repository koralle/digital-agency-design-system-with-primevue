import type { Meta, StoryObj } from '@storybook/vue3';
import { Select } from '@digital-agency-design-system-with-primevue/components/select';
import type { SelectProps } from '@digital-agency-design-system-with-primevue/components/select';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof Select> = {
  title: 'Components / Select',
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
  },
  args: {
    size: 'medium',
    disabled: false,
    options: [
      "選択肢1",
      "選択肢2",
      "選択肢3",
    ],
    placeholder: '選択してください',
    modelValue: '選択肢1',
    invalid: false,
  } satisfies SelectProps,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveAttribute('aria-disabled', 'true');
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveAttribute('aria-invalid', 'true');
  },
};

export const WithPreselectedValue: Story = {
  args: {
    modelValue: { name: '選択肢2', value: 'option2' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveTextContent('選択肢2');
  },
};
