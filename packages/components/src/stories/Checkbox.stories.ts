import type { Meta, StoryObj } from '@storybook/vue3';
import { Checkbox } from '@digital-agency-design-system-with-primevue/components/checkbox';
import type { CheckboxProps } from '@digital-agency-design-system-with-primevue/components/checkbox';
import { useArgs } from '@storybook/preview-api';
import { ref, watch } from 'vue';

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
    disabled: false,
    invalid: false,
    binary: true,
    indeterminate: false,
  } satisfies CheckboxProps,
  render: (args: CheckboxProps) => {
    const [, updateArgs] = useArgs<typeof Checkbox>();
    return {
      components: {
        Checkbox,
      },
      setup() {
        const model = ref(args.modelValue);

        watch(
          () => args.modelValue,
          value => {
            model.value = value;
          },
        );

        const handlers: (typeof Checkbox)['emits'] = {
          'update:modelValue': (value: boolean) => updateArgs({ modelValue: value }),
        };

        return {
          model,
          handlers,
          args
        }
      },
      template: `<Checkbox
        v-model="model"
        v-on="handlers"
        :model-value="args.modelValue"
        :disabled="args.disabled"
        :invalid="args.invalid"
        :indeterminate="args.indeterminate"
        :binary="args.binary"
        :size="args.size"
      />`
    }
  }
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
