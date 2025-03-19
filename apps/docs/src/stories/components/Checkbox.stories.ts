import type { Meta, StoryObj } from '@storybook/vue3';
import { Checkbox } from '@digital-agency-design-system-with-primevue/components/checkbox';
import type { CheckboxProps } from '@digital-agency-design-system-with-primevue/components/checkbox';

const meta = {
  title: 'Components / Checkbox',
  component: Checkbox,
  // tags: ['autodocs'],
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
  },
  args: {
    binary: false,
    size: 'medium',
  } satisfies Pick<CheckboxProps, 'binary' | 'size'>
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default = {
  args: {
    size: 'large',
    disabled: true,
    invalid: false
  } satisfies Pick<CheckboxProps, 'size' | 'disabled' | 'invalid'>
} satisfies Story

// export const Checked = {
//   args: {
//     size: 'large',
//     disabled: false,
//     invalid: false,
//   } satisfies Pick<CheckboxProps, 'size' | 'disabled' | 'invalid'>
// } satisfies Story
//
// export const Disabled = {
//   args: {
//     size: 'large',
//     disabled: true,
//     invalid: false,
//   } satisfies Pick<CheckboxProps, 'size' | 'disabled' | 'invalid'>
// } satisfies Story
//
// export const Invalid = {
//   args: {
//     size: 'large',
//     disabled: false,
//     invalid: true,
//   } satisfies Pick<CheckboxProps, 'size' | 'disabled' | 'invalid'>
// } satisfies Story
