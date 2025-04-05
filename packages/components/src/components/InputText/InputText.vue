<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { computed, useId } from 'vue'
import type { InputTextEmits, InputTextProps } from './types'
import { clsx } from 'clsx'

const {
  id = useId(),
  size = 'medium',
  disabled,
  modelValue,
  defaultValue,
  invalid,
  required,
  readonly,
  placeholder,
  fluid,
} = defineProps<InputTextProps>()

const emit = defineEmits<InputTextEmits>()

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('value-change', value)
}

const sizeClass = computed(() => {
  switch (size) {
    case 'small':
      return 'h-[2.5rem]'
    case 'medium':
      return 'h-[3rem]'
    case 'large':
      return 'h-[3.5rem]'
  }
})
</script>

<template>
  <InputText
    unstyled
    :id
    :disabled
    :model-value
    :default-value
    :invalid
    :required
    :readonly
    :aria-readonly="readonly"
    :placeholder
    :fluid
    :pt="{
      root: () => ({
        class: clsx(
          'text-solid-gray-900 bg-white border rounded-[8px] px-[1rem]',
          'hover:border-black',
          'focus:outline-yellow-300 focus:outline-[2px] focus:outline-offset-[2px]',
          'disabled:border-solid-gray-300 disabled:bg-solid-gray-50 disabled:text-solid-gray-420',
          'aria-invalid:caret-error-1',
          disabled
            ? 'disabled:border-solid-gray-300'
            : invalid
              ? 'aria-invalid:border-red-800 '
              : 'border-solid-gray-600',
          fluid ? 'w-full' : 'w-fit',
          'transition-all duration-300 ease-in-out',
          sizeClass,
        ),
      }),
    }"
    @input="handleInput"
    @change="handleChange"
  />
</template>
