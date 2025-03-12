import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@digital-agency-design-system-with-primevue/components/button';
import type { ButtonProps } from '@digital-agency-design-system-with-primevue/components/button';
import { within, expect, userEvent, fn, waitFor } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import Add from '~icons/mdi/add';

const meta = {
  title: 'Components / Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'ボタンに表示するテキスト',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'ボタンの種類',
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'medium', 'large'],
      description: 'ボタンのサイズ',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
    onClick: {
      action: 'on-click',
      description: 'クリック時のアクション',
    },
  },
  args: {
    label: 'ボタン',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    onClick: action('on-click'),
  } satisfies ButtonProps,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {
    label: 'プライマリボタン',
    variant: 'tertiary',
    onClick: fn(),
    disabled: false,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'プライマリボタン' });
    await userEvent.click(button);

    await waitFor(() => expect(args.onClick).toHaveBeenCalled());
  },
} satisfies Story;

export const Secondary = {
  args: {
    label: 'セカンダリボタン',
    variant: 'secondary',
    fluid: false,
  },
} satisfies Story;

export const Tertiary = {
  args: {
    label: 'ターシャリボタン',
    variant: 'tertiary',
  },
} satisfies Story;

export const Disabled = {
  args: {
    label: '無効ボタン',
    disabled: true,
    loading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '無効ボタン' });

    await expect(button).toBeDisabled();
  },
} satisfies Story;

export const XSmall = {
  args: {
    label: 'X-Smallサイズ',
    size: 'x-small',
  },
} satisfies Story;

export const Small = {
  args: {
    label: '小サイズ',
    size: 'small',
  },
} satisfies Story;

export const Medium = {
  args: {
    label: '中サイズ',
    size: 'medium',
  },
} satisfies Story;

export const Large = {
  args: {
    label: '大サイズ',
    size: 'large',
  },
} satisfies Story;

export const WithIcon = {
  args: {
    label: '追加',
    size: 'large',
    variant: 'primary',
    disabled: false,
    onClick: action('on-click'),
  },
  render: ({
    label,
    size,
    variant,
    disabled,
    onClick,
  }: Pick<ButtonProps, 'label' | 'size' | 'variant' | 'disabled' | 'onClick'>) => ({
    components: { Button, Add },
    setup() {
      return { label, size, variant, disabled, onClick };
    },
    template: `
      <Button :label="label" :size="size" :variant="variant" :disabled="disabled" @click="onClick">
        <template #icon>
          <Add />
        </template>
      </Button>
    `,
  }),
} satisfies Story;
