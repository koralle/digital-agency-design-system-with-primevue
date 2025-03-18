<script setup lang="ts">
import Textarea from 'primevue/textarea';
import type { TextareaProps } from './props';
import { useId } from 'vue';

const {
  id = useId(),
  class: className,
  modelValue,
  maxlength = 100,
  disabled,
  invalid = false,
  rows = 2,
  autoResize = false,
  placeholder = '',
} = defineProps<TextareaProps>();

</script>

<template>
  <div class="grid grid-rows-[1fr_max-content] gap-[0.5em]">
    <Textarea
      :id="id"
      :modelValue
      unstyled
      :maxlength="maxlength"
      :disabled="disabled"
      :invalid="invalid"
      :rows="rows"
      :autoResize="autoResize"
      :placeholder="placeholder"
      :class="[
        'text-solid-gray-900 bg-white h-max border border-solid-gray-600 rounded-[8px] p-[1em]',
        'hover:border-black',
        'focus:outline-yellow-300 focus:outline-offset-0 focus:outline-offset-[2px] focus:inset-shadow-[4px] focus:inset-ring-black',
        'disabled:border-solid-gray-300 disabled:bg-solid-gray-50 disabled:text-solid-gray-420',
        'aria-invalid:border-red-800',
        className,
      ]"
    />
    <span class="justify-self-end">{{ modelValue?.length ?? 0 }} / {{ maxlength }}</span>
  </div>
</template>
