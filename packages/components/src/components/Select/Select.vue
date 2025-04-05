<script setup lang="ts">
import Select from 'primevue/select';
import { computed, useId } from 'vue';
import type { SelectEmits, SelectProps } from './types';
import { clsx } from 'clsx'

const {
  id = useId(),
  disabled,
  modelValue,
  defaultValue,
  invalid,
  size = 'medium',
  required,
  readonly,
  placeholder,
  fluid,
  labelId = useId(),
  options = [],
  optionLabel,
  editable,
 } = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()

const sizeClass = computed(() => {
  switch (size) {
    case 'small':
      return {
        root: 'h-[2.5rem] rounded-[4px]',
        overlay: 'rounded-[4px]',
        option: 'min-h-[2em] py-[0.25em]',
      }
    case 'medium':
      return {
        root: 'h-[3rem] rounded-[8px]',
        overlay: 'rounded-[8px]',
        option: 'min-h-[2.75em] py-[0.5em]',
      }
    case 'large':
      return {
        root: 'h-[3.5rem] rounded-[8px]',
        overlay: 'rounded-[8px]',
        option: 'min-h-[2.75em] py-[0.5em]',
      }
  }
})

const handleChange = (value: any) => {
  emits('change', value)
}
</script>

<template>
  <Select
    :id
    :disabled
    :model-value
    :default-value
    :invalid
    :required
    :readonly
    :placeholder
    :fluid

    :labelId
    :options
    :option-label
    :editable

    :pt="{
      root: ({ state }) => {
        return {
          class: clsx(
            'text-16',
            'inline-flex justify-between items-center gap-[0.5em]',
            'border rounded-[8px] px-[1rem]',
            'hover:border-black',
            'focus:outline-yellow-300 focus:outline-[2px] focus:outline-offset-[2px]',
            state.focused ? 'outline-yellow-300 outline-[2px] outline-offset-[2px]' : '',
            disabled
              ? 'bg-solid-gray-50 text-solid-gray-420 border-solid-gray-300'
              : invalid
                ? 'bg-white text-solid-gray-900 border-red-800 caret-error-1'
                : 'bg-white text-solid-gray-900 border-solid-gray-600',
            fluid ? 'w-full' : 'w-fit',
            disabled ? '' : 'cursor-pointer',
            'transition-[background-color,border-color] duration-300 ease-in-out',
            sizeClass.root,
          )
        }
      },
      label: () => ({
        class: clsx(
          'relative border-none',
          'text-16',
          'inline-flex justify-start items-center',
          'outline-none',
          disabled ? 'text-solid-gray-420' : 'text-solid-gray-900',
          fluid ? 'w-full' : 'w-fit',
        )
      }),
      overlay: () => ({
        class: clsx(
          'bg-white py-[1.5rem] rounded-[8px]',
          'mt-[0.25rem]',
          'shadow-(--elevation-1)',
          'motion-reduce:transition-none',
          sizeClass.overlay,
        )
      }),
      optionCheckIcon: () => ({
        class: clsx('font-700 text-blue-1000')
      }),
      option: ({ context }) => ({
        class: clsx(
          'text-16',
          'flex justify-start items-center gap-[0.5em] px-[1.5em]',
          context.selected ? 'bg-blue-50 font-700 text-blue-1000'  : context.focused ? `bg-solid-gray-50` : `bg-white hover:bg-solid-gray-50`,
          'transition-colors duration-200 ease-in-out',
          sizeClass.option
        )
      }),
      transition: () => ({
        enterActiveClass: 'duration-300 transition-opacity ease-out',
        enterFromClass: 'opacity-0',
        enterToClass: 'opacity-100',
        leaveActiveClass: 'duration-300 ease-in',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'opacity-0',
      })
    }"
    checkmark
    @change="handleChange"
  >
  </Select>
</template>
