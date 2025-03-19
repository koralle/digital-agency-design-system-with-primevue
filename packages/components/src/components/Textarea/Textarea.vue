<script setup lang="ts">
import Textarea from 'primevue/textarea';
import { computed, useId } from 'vue';
import type { TextareaEmits, TextareaProps } from './props';
import { useCharacterCounter } from './use-character-counter';

const {
  id = useId(),
  class: className,
  modelValue = '',
  defaultValue = '',
  maxlength = 100,
  minlength = 0,
  disabled,
  invalid = false,
  rows = 2,
  autoResize = false,
  placeholder = '',
  inputMode = 'text',
  fluid = false,
  required = false,
  spellcheck = false,
  form = '',
  name = '',
  readonly = false,
  dirname = '',
  autocomplete = 'off',
  autocorrect = 'off',
  autofocus = false,
  wrap = 'soft',
  segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' }),
} = defineProps<TextareaProps>();

const emit = defineEmits<TextareaEmits>();

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  emit('update:modelValue', value);
};

const textCount = computed(() => useCharacterCounter({ text: modelValue, segmenter }));
const counterId = computed(() => id + '-counter');
</script>

<template>
  <div class="grid grid-rows-[1fr_max-content] gap-[0.5em]">
    <Textarea
      unstyled
      :id="id"
      :default-value="defaultValue"
      :model-value="modelValue"
      :maxlength="maxlength"
      :minlength="minlength"
      :disabled="disabled"
      :invalid="invalid"
      :rows="rows"
      :autoResize="autoResize"
      :placeholder="placeholder"
      :input-mode="inputMode"
      :fluid="fluid"
      :required="required"
      :spellcheck="spellcheck"
      :form="form"
      :name="name"
      :readonly="readonly"
      :dirname="dirname"
      :autocomplete="autocomplete"
      :autocorrect="autocorrect"
      :autofocus="autofocus"
      :wrap="wrap"
      :class="[
        'text-solid-gray-900 bg-white h-max border border-solid-gray-600 rounded-[8px] p-[1em]',
        'hover:border-black',
        'focus:outline-yellow-300 focus:outline-offset-0 focus:outline-offset-[2px] focus:inset-shadow-[4px] focus:inset-ring-black',
        'disabled:border-solid-gray-300 disabled:bg-solid-gray-50 disabled:text-solid-gray-420',
        'aria-invalid:border-red-800',
        className,
      ]"
      :oninput="handleInput"
    />
    <span :id="counterId" class="text-solid-gray-600 justify-self-end" aria-live="polite">
      {{ textCount }} / {{ maxlength }}
    </span>
  </div>
</template>
