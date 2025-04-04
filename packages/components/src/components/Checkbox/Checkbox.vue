<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { Icon } from '../Icon';
import type { CheckboxEmits, CheckboxProps } from './types';
import { computed, defineComponent, h, useId } from 'vue';
import { clsx } from 'clsx';
import type { CheckboxPassThroughOptions, CheckboxSlots } from 'primevue/checkbox';

const {
  id = useId(),
  size = 'medium',
  disabled = false,
  invalid = false,
  indeterminate = false,
  modelValue = null,
  defaultValue = null,
  name = '',
  binary = false,
  readonly = false,
  required = false,
  trueValue = null,
  falseValue = null,
  inputId = useId(),
} = defineProps<CheckboxProps>();

defineSlots<CheckboxSlots>();
const emit = defineEmits<CheckboxEmits>();

const handleChange = (e: Event) => {
  console.error('handleChange', e);
  const value = (e.target as HTMLInputElement).checked;
  emit('update:modelValue', value);
};

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
        ]),
      });
  },
});

const checkboxIcon = defineComponent({
  name: 'CheckboxIcon',
  setup() {
    return () => {
      return h(Icon, {
        name: 'Checkbox',
        class: clsx([sizeClass.value.icon]),
      });
    };
  },
});

const indeterminateCheckboxIcon = defineComponent({
  name: 'IndeterminateCheckboxIcon',
  setup() {
    return () => {
      return h(Icon, {
        name: 'IndeterminateCheckbox',
        class: clsx([sizeClass.value.icon]),
      });
    };
  },
});
</script>

<template>
  <Checkbox
    unstyled
    :id="id"
    :disabled="disabled"
    :invalid="invalid"
    :model-value="modelValue"
    :pt="{
      root: () => {
        return {
          class: clsx(['text-16 w-max h-max']),
        };
      },
      input: {
        hidden: true,
      },
      box: [],
    }"
    :indeterminate="indeterminate"
    :value="modelValue"
    :defaultValue="defaultValue"
    :name="name"
    :binary="binary"
    :readonly="readonly"
    :required="required"
    :trueValue="trueValue"
    :falseValue="falseValue"
    :inputId="inputId"
  >
    <template #icon="{ checked, indeterminate }">
      <component
        :is="
          checked
            ? checkboxIcon
            : indeterminate
              ? indeterminateCheckboxIcon
              : checkboxOutlineBlankIcon
        "
        @change="handleChange"
      />
    </template>
  </Checkbox>
</template>
