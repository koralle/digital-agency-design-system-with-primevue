<script generic="T = boolean" setup lang="ts">
import { computed, ref, useId } from 'vue';
import type { RadioButtonEmits, RadioButtonProps } from './types'
import { clsx } from 'clsx'

import RadioButtonChecked from './icons/RadioButtonChecked.svg'
import RadioButtonUnchecked from './icons/RadioButtonUnchecked.svg'
import RadioButtonCheckedDisabled from './icons/RadioButtonCheckedDisabled.svg'
import RadioButtonUncheckedDisabled from './icons/RadioButtonUncheckedDisabled.svg'
const {
  id = useId(),
  label = '',
  value,
  name = '',
  binary = false,
  invalid,
  disabled,
  readonly,
  inputId = useId(),
  ariaLabel = '',
} = defineProps<RadioButtonProps<T>>()

const modelValue = defineModel<T>()

const emit = defineEmits<RadioButtonEmits<T>>()

const handleChange = (event: Event) => {
  if (disabled || readonly) {
    return
  }

  const newValue = binary ? !modelValue.value : value;
  if (typeof newValue === typeof value || binary) {
      // @ts-expect-error newValue can be boolean when binary is true, T otherwise.
      modelValue.value = newValue;
  } else {
      console.error("Type mismatch between modelValue and value when not in binary mode.");
      return;
  }

  emit('change', event)
}

const handleFocus = (event: Event) => {
  emit('focus', event)
}

const handleBlur = (event: Event) => {
  emit('blur', event)
}

const trulyAriaLabel = computed(() => ariaLabel || label)

const trulyChecked = computed(() => binary ? Boolean(modelValue.value) : modelValue.value === value)
</script>

<template>
  <label
    :id="id"
    :for="inputId"
    :class="[
      'radio-button-label-wrapper',
      'text-[1rem]',
      'inline-flex justify-start items-center gap-[0.5em]',
      { 'cursor-not-allowed opacity-60': disabled },
      { 'cursor-default': readonly && !disabled },
      { 'cursor-pointer': !disabled && !readonly }
    ]"
  >
    <input
      :id="inputId"
      :value="value"
      :checked="trulyChecked"
      :name="name"
      :aria-invalid="invalid ? 'true' : undefined"
      :disabled="disabled"
      :aria-label="trulyAriaLabel"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      type="radio"
      :class="[
        'visually-hidden',
      ]"
    />

    <div
      aria-hidden="true"
      :class="[
        'radio-button-icon-container',
        'w-[1.5em] h-[1.5em]',
        'flex-shrink-0',
      ]"
      :aria-readonly="readonly"
    >
      <RadioButtonUnchecked
        v-if="!trulyChecked && !disabled"
        aria-hidden="true"
        :class="[
          clsx({
            'text-red-900 hover:text-red-1000': invalid,
            'text-neutral-solid-gray-800 hover:text-neutral-solid-gray-900': !invalid,
          })
        ]"
      />
      <RadioButtonUncheckedDisabled
        v-else-if="!trulyChecked && disabled"
        aria-hidden="true"
      />
      <RadioButtonChecked
        v-else-if="trulyChecked && !disabled"
        aria-hidden="true"
        :class="[
          clsx({
            'text-red-900 hover:text-red-1000': invalid,
            'text-blue-900 hover:text-blue-1000': !invalid,
          })
        ]"
      />
      <RadioButtonCheckedDisabled
        v-else
        aria-hidden="true"
      />
    </div>

    <span class="radio-button-label-text"> {{ label }} </span>
  </label>
</template>

<style>
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  margin: -1px;
  padding: 0;
  border: 0;
}
</style>
