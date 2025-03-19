<script setup lang="ts">
import { computed, useId } from 'vue';
import type { PasswordInputProps, PasswordInputEmits } from './types';
import PasswordInput from 'primevue/password';
import { clsx } from 'clsx';
import { Icon } from '../Icon';

const {
  id = useId(),
  inputId = useId(),
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
  autocomplete = 'current-password',
  minlength = 1,
  maxlength = 32,
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
    :input-id="inputId"
    :model-value="modelValue"
    :value="modelValue"
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
    :feedback="false"
    :autocomplete="autocomplete"
    :minlength="minlength"
    :maxlength="maxlength"
    :pt="{
      root: () => ({
        class: clsx([
          'inline-flex relative',
        ]),
      }),
      pcInputText: () => ({
        root: () => ({
          class: clsx([
            'text-16 text-solid-gray-900 bg-white box-border border rounded-[8px] h-[3em] pl-[1em] pr-[2.5em]',
            'hover:border-black',
            'focus:outline-yellow-300 focus:outline-offset-0 focus:outline-offset-[2px] focus:inset-shadow-[4px] focus:inset-ring-black',
            'disabled:bg-solid-gray-50 disabled:text-solid-gray-420',
            disabled ? 'disabled:border-solid-gray-300' : invalid ? 'aria-invalid:border-red-800' : 'border-solid-gray-600',
            sizeClass,
          ]),
        }),
      }),
    }"
    :class="className"
  >
    <template #maskicon="{ toggleCallback }">
      <Icon
        name="Visibility"
        :class="[
          'inline-block align-baseline w-[1.25em] h-[1.25em] mt-[-0.625em]',
          'absolute top-[50%] end-[0.625em]',
          disabled ? 'text-solid-gray-420' : 'text-solid-gray-600',
          disabled ? '' : 'cursor-pointer',
        ]"
        @click="!disabled && toggleCallback()"
      />
    </template>

    <template #unmaskicon="{ toggleCallback }">
      <Icon
        name="VisibilityOff"
        :class="[
          'inline-block align-baseline w-[1.25em] h-[1.25em] mt-[-0.625em]',
          'absolute top-[50%] end-[0.625em]',
          disabled ? 'text-solid-gray-420' : 'text-solid-gray-600',
          disabled ? '' : 'cursor-pointer',
        ]"
        @click="!disabled && toggleCallback()"
      />
    </template>
  </PasswordInput>
</template>
