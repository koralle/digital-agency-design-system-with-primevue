<script generic="T" setup lang="ts">
import { useId } from "vue";
import type { RadioButtonGroupProps, RadioButtonGroupEmits, RadioButtonGroupSlots } from "./types"

const {
  id = useId(),
  modelValue,
  defaultValue,
  name,
  invalid,
} = defineProps<RadioButtonGroupProps<T>>()

const emit = defineEmits<RadioButtonGroupEmits<T>>()

const model = defineModel<T>()

defineSlots<RadioButtonGroupSlots<T>>()

const handleValueChange = (value: T) => {
  emit('value-change', value)
}
</script>

<template>
  <div
    :id
  >
    <slot name="default" />
  </div>
</template>
