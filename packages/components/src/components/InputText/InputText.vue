<script setup lang="ts">
import InputText from 'primevue/inputtext'
import type { InputTextProps, InputTextEmits } from './types'
import { computed, useId } from 'vue'

const {
  id = useId(),
  size = 'medium',
  disabled,
  modelValue,
  defaultValue,
  invalid,
  required,
  placeholder,
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
    :id
    :disabled
    :model-value
    :default-value
    :invalid
    :required
    :placeholder
    :class="[
      'text-solid-gray-900 bg-white border border-solid-gray-600 rounded-[8px] pl-[1rem]',
      'hover:border-black',
      'focus:outline-yellow-300 focus:outline-[2px] focus:outline-offset-[2px]',
      'disabled:border-solid-gray-300 disabled:bg-solid-gray-50 disabled:text-solid-gray-420',
      'aria-invalid:border-red-800',
      sizeClass,
    ]"
    @input="handleInput"
    @change="handleChange"
  />
</template>
