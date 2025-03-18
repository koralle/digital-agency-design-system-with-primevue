<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { Icon } from '../Icon';
import type {
  CheckboxEmits,
  CheckboxProps,
  CheckboxSlots,
  CheckboxPassThroughOptions,
} from './types';
import { computed, defineComponent, h } from 'vue';
import { clsx } from 'clsx';

const {
  size = 'medium',
  disabled = false,
  invalid = false,
  ...rest
} = defineProps<CheckboxProps>();

defineSlots<CheckboxSlots>();
defineEmits<CheckboxEmits>();

type CSSClassName = string;

const sizeClass = computed<{ [key in keyof CheckboxPassThroughOptions]: CSSClassName }>(() => {
  switch (size) {
    case 'small':
      return {
        icon: 'w-[1.5em] h-[1.5em]',
      };
    case 'medium':
      return {
        icon: 'w-[2em] h-[2em]',
      };
    case 'large':
      return {
        icon: 'w-[2.75em] h-[2.75em]',
      };
  }
});

const checkboxOutlineBlankIcon = defineComponent({
  name: 'CheckboxOutlineBlankIcon',
  setup() {
    return () =>
      h(Icon, {
        name: 'CheckboxOutlineBlank',
        class: clsx([
          sizeClass.value.icon,
          disabled ? 'text-solid-gray-300' : invalid ? 'text-error-1' : 'text-solid-gray-600',
        ])
      });
  }
})

const checkboxIcon = defineComponent({
  name: 'CheckboxIcon',
  setup() {
    return () => {
      return h(Icon, {
        name: 'Checkbox',
        class: clsx([
        sizeClass.value.icon,
      ]),
      });
    }
  }
});

const indeterminateCheckboxIcon = defineComponent({
  name: 'IndeterminateCheckboxIcon',
  setup() {
    return () => {
      return h(Icon, {
        name: 'IndeterminateCheckbox',
      class: clsx([
        sizeClass.value.icon
      ])
      });
    }
  }
});
</script>

<template>
  <Checkbox
    unstyled
    :disabled="disabled"
    :invalid="invalid"
    :pt="{
      root: () => {
        return {
          class: clsx(['text-16 w-max h-max']),
        };
      },
      input: {
        hidden: true,
      },
      box: []
    }"
    :rest
  >
    <template #icon="{ checked, indeterminate }">
      <component
        :is="checkboxOutlineBlankIcon"
      />
    </template>
  </Checkbox>
</template>
