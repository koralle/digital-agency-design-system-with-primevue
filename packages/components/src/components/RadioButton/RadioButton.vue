<script generic="T = string" setup lang="ts">
import { computed, ref, useId } from 'vue';
import type { RadioButtonEmits, RadioButtonProps } from './types'

import RadioButtonChecked from './icons/RadioButtonChecked.svg'
import RadioButtonUnchecked from './icons/RadioButtonUnchecked.svg'
import RadioButtonCheckedDisabled from './icons/RadioButtonCheckedDisabled.svg'
import RadioButtonUncheckedDisabled from './icons/RadioButtonUncheckedDisabled.svg'
import { useRadioButtonClass } from './use-radio-button';

const {
  id = useId(),
  label = '',
  value,
  name = '',
  binary = false,
  size = 'medium',
  invalid = false,
  disabled = false,
  readonly = false,
  inputId = useId(),
  ariaLabel = '',
  ariaLabelledby = '',
} = defineProps<RadioButtonProps<T>>()

const modelValue = defineModel<T>()

const emit = defineEmits<RadioButtonEmits<T>>()

const handleChange = (event: Event) => {
  if (disabled || readonly) {
    return
  }

  if (binary) {
    const currentValue = modelValue.value
    if (typeof currentValue !== 'boolean') {
      throw new Error('modelValue must be a boolean when binary is true')
    }

    modelValue.value = !currentValue as T
  } else {
    modelValue.value = value
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

const useRadioButtonClassResult = useRadioButtonClass({
  size: computed(() => size),
  disabled: computed(() => disabled),
  readonly: computed(() => readonly),
  invalid: computed(() => invalid),
  checked: trulyChecked,
})
</script>

<template>
  <label
    :id="id"
    :for="inputId"
    v-if="label"
    :class="[
      useRadioButtonClassResult.rootClass,
    ]"
  >
    <input
      :id="inputId"
      :value="value"
      :checked="trulyChecked"
      :name="name"
      :aria-invalid="invalid"
      :disabled
      :readonly
      :aria-label="trulyAriaLabel"
      :aria-labelledby="ariaLabelledby"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      type="radio"

      :class="[
        useRadioButtonClassResult.inputClass,
      ]"
    />

    <div
      aria-hidden="true"
      :aria-readonly="readonly"
      :class="[
        useRadioButtonClassResult.boxClass,
      ]"
    >
      <RadioButtonUnchecked
        v-if="!trulyChecked && !disabled"
        aria-hidden="true"
        :class="[
          useRadioButtonClassResult.iconClass,
        ]"
      />
      <RadioButtonUncheckedDisabled
        v-else-if="!trulyChecked && disabled"
        aria-hidden="true"
        :class="[
          useRadioButtonClassResult.iconClass,
        ]"
      />
      <RadioButtonChecked
        v-else-if="trulyChecked && !disabled"
        aria-hidden="true"
        :class="[
          useRadioButtonClassResult.iconClass,
        ]"
      />
      <RadioButtonCheckedDisabled
        v-else
        aria-hidden="true"
        :class="[
          useRadioButtonClassResult.iconClass,
        ]"
      />
    </div>

    <span :class="[
      useRadioButtonClassResult.labelClass,
    ]"> {{ label }} </span>
  </label>
  <div v-else :id :class="[
    useRadioButtonClassResult.boxClass,
  ]">
    <input
      :id="inputId"
      :value="value"
      :checked="trulyChecked"
      :name="name"
      :aria-invalid="invalid"
      :disabled
      :readonly
      :aria-label="trulyAriaLabel"
      :aria-labelledby="ariaLabelledby"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      type="radio"
    />
    <RadioButtonUnchecked
      v-if="!trulyChecked && !disabled"
      aria-hidden="true"
      :class="[
        useRadioButtonClassResult.iconClass,
      ]"
    />
    <RadioButtonUncheckedDisabled
      v-else-if="!trulyChecked && disabled"
      aria-hidden="true"
      :class="[
        useRadioButtonClassResult.disabledIconClass,
      ]"
    />
    <RadioButtonChecked
      v-else-if="trulyChecked && !disabled"
      aria-hidden="true"
      :class="[
        useRadioButtonClassResult.iconClass,
      ]"
    />
    <RadioButtonCheckedDisabled
      v-else
      aria-hidden="true"
      :class="[
        useRadioButtonClassResult.disabledIconClass,
      ]"
    />
  </div>
</template>
