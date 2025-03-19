<script setup lang="ts">
import { computed, useId } from 'vue';
import type { PasswordInputProps, PasswordInputEmits } from './types';
import PasswordInput from 'primevue/password';
import clsx from 'clsx';
import { Icon } from '../Icon';

const {
  id = useId(),
  class: className,
  modelValue = '',
  disabled = false,
  invalid = false,
  name = '',
  readonly = false,
  required = false,
  spellcheck = false,
  form = '',
  size = 'medium',
  placeholder = '',
} = defineProps<PasswordInputProps>();

const emit = defineEmits<PasswordInputEmits>();

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  emit('update:modelValue', value);
};

const sizeClass = computed(() => {
  switch (size) {
    case 'small':
      return 'h-[2.5rem]';
    case 'medium':
      return 'h-[3rem]';
    case 'large':
      return 'h-[3.5rem]';
  }
});
</script>

<template>
  <PasswordInput
    unstyled
    :id="id"
    :model-value="modelValue"
    :disabled="disabled"
    :invalid="invalid"
    :name="name"
    :readonly="readonly"
    :required="required"
    :spellcheck="spellcheck"
    :form="form"
    :placeholder="placeholder"
    :oninput="handleInput"
    toggle-mask
    :pt="{
      root: () => ({
        class: clsx([
          'inline-flex w-max h-max text-16 relative',
          sizeClass,
        ]),
      }),
      pcInputText: () => ({
        root: () => ({
          class: clsx([
            'text-solid-gray-900 bg-white border border-solid-gray-600 rounded-[8px] pl-[1rem]',
            'hover:border-black',
            'focus:outline-yellow-300 focus:outline-offset-0 focus:outline-offset-[2px] focus:inset-shadow-[4px] focus:inset-ring-black',
            'disabled:border-solid-gray-300 disabled:bg-solid-gray-50 disabled:text-solid-gray-420',
            'aria-invalid:border-red-800',
            sizeClass,
          ]),
        }),
      }),
      overlay: () => ({
        class: clsx([
          'text-16 p-[1em]'
        ])
      }),
      meterLabel: () => ({
        class: clsx([
          'w-0 h-[100%]'
        ])
      })
    }"
    :class="[sizeClass, className]"
  >
    <template #maskicon>
      <Icon
        name="Visibility"
        :class="[
          'w-[1.25em] h-[1.25em] text-solid-gray-900',
          'absolute top-[50%] end-[0.75em]'
        ]"
      />
    </template>
    <template #unmaskicon>
      <Icon
        name="VisibilityOff"
        :class="[
          'w-[1.25em] h-[1.25em] text-solid-gray-900',
          'absolute top-[50%] end-[0.75em]'
        ]"
      />
    </template>
  </PasswordInput>
</template>
