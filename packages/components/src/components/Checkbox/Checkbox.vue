<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { CheckboxEmits, CheckboxProps } from './types'
import { useCheckboxClass } from './use-checkbox'

import IndeterminateCheckBox from './icons/IndeterminateCheckBox.svg'
import IndeterminateCheckBoxDisabled from './icons/IndeterminateCheckBoxDisabled.svg'
import CheckboxDisabled from './icons/CheckboxDisabled.svg'
import CheckboxOutlineBlankDisabled from './icons/CheckboxOutlineBlankDisabled.svg'
import Checkbox from './icons/CheckBox.svg'
import CheckboxOutlineBlank from './icons/CheckboxOutlineBlank.svg'

const {
  value,
  modelValue,
  defaultValue,
  name = '',
  label = '',
  binary,
  indeterminate,
  size,
  invalid,
  disabled,
  readonly,
  required,
  tabindex = 0,
  trueValue,
  falseValue,
  inputId = useId(),
  ariaLabel = '',
  ariaLabelledby = '',
  formControl,
} = defineProps<CheckboxProps>()

const d_value = ref(defaultValue || modelValue)

const d_indeterminate = ref(indeterminate)
watch(d_indeterminate, (value: boolean) => {
  d_indeterminate.value = value
})

const emit = defineEmits<CheckboxEmits>()

const trulyChecked = computed(() => d_indeterminate.value ? false : value === trueValue)
const trulyAriaChecked = computed(() => d_indeterminate.value ? 'mixed' : value === trueValue)
const trulyAriaLabel = computed(() => ariaLabel || label)

const handleChange = (event: Event): void => {
  if (disabled || readonly) {
    return
  }

  if (d_indeterminate.value) {
    d_indeterminate.value = false
    emit('update:indeterminate', d_indeterminate.value)
  }

  emit('change', event)
}

const handleFocus = (event: FocusEvent): void => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent): void => {
  emit('blur', event)
}

const useCheckboxClassResult = useCheckboxClass({
  size: computed(() => size),
  indeterminate: d_indeterminate,
  invalid: computed(() => invalid),
  disabled: computed(() => disabled),
})
</script>

<template>
  <label :class="[useCheckboxClassResult.rootClass]">
    <input
      :id="inputId"
      :value
      :modelValue
      :defaultValue
      :name
      :disabled
      :readonly
      :required
      :tabindex
      :aria-invalid="invalid"
      :aria-label="trulyAriaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-checked="trulyAriaChecked"
      type="checkbox"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :class="[
        'fixed!',
        'inset-0!',
        'contain-strict!',
        'h-[4px]!',
        'w-[4px]!',
        'opacity-0!',
        'm-0!',
        'p-0!',
        'hidden!',
        'border-0!',
        'pointer-events-none!',
      ]"
      @keypress.space="handleChange"
    />
    <div :class="[useCheckboxClassResult.boxClass]">
      <CheckboxOutlineBlank
        v-if="!trulyChecked && !d_indeterminate && !disabled"
        :class="[useCheckboxClassResult.outlineBlankIconClass]"
        :tabindex="tabindex"
      />
      <CheckboxOutlineBlankDisabled
        v-else-if="!trulyChecked && !d_indeterminate && disabled"
        :class="[useCheckboxClassResult.outlineBlankIconClass]"
        :tabindex="-1"
      />
      <IndeterminateCheckBox
        v-else-if="!trulyChecked && d_indeterminate && !disabled"
        :class="[useCheckboxClassResult.indeterminateIconClass]"
        :tabindex="tabindex"
      />
      <IndeterminateCheckBoxDisabled
        v-else-if="!trulyChecked && d_indeterminate && disabled"
        :class="[useCheckboxClassResult.indeterminateIconClass]"
        :tabindex="-1"
      />
      <Checkbox
        v-else-if="trulyChecked && !d_indeterminate && !disabled"
        :class="[useCheckboxClassResult.checkboxIconClass]"
        :tabindex="tabindex"
      />
      <CheckboxDisabled
        v-else-if="trulyChecked && !d_indeterminate && disabled"
        :class="[useCheckboxClassResult.checkboxIconClass]"
        :tabindex="-1"
      />
    </div>
    <span :class="[useCheckboxClassResult.labelClass]">
      {{ label }}
    </span>
  </label>
</template>
