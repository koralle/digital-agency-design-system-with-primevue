<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';
import type { SelectEmits, SelectProps, SelectSlots } from './props';

const { size = 'medium', ...rest } = defineProps<SelectProps>();
defineSlots<SelectSlots>();
defineEmits<SelectEmits>();

const sizeClass = computed(() => {
  switch (size) {
    case 'small':
      return {
        root: 'h-[2.5rem] rounded-[4px]',
        overlay: 'rounded-[4px]',
        option: 'min-h-[2em] py-[0.25em]'
      }
    case 'medium':
      return {
        root: 'h-[3rem] rounded-[8px]',
        overlay: 'rounded-[8px]',
        option: 'min-h-[2.75em] py-[0.5em]'
      }
    case 'large':
      return {
        root: 'h-[3.5rem] rounded-[8px]',
        overlay: 'rounded-[8px]',
        option: 'min-h-[2.75em] py-[0.5em]'
      }
  }
});
</script>

<template>
  <Select
    :pt="{
      root: ({ props }) => {
        const { disabled, invalid } = props;
        return [
          'flex gap-[0.5em] justify-start text-16 w-max bg-white border px-[1rem]',
          disabled ? 'bg-solid-gray-50 border-solid-gray-300' : invalid ? 'border-red-800' : 'border-solid-gray-600',
          disabled ? '' : invalid ? 'hover:border-red-1000 transition duration-300 ease-in-out' : 'hover:border-black transition duration-300 ease-in-out',
          sizeClass.root,
        ]
      },
      label: ({ props }) => {
        const { disabled } = props;
        return [
          'flex items-center text-16',
          disabled ? 'text-solid-gray-420' : 'text-solid-gray-800'
        ]
      },
      dropdown: ({ props }) => {
        const { disabled } = props;
        return [
          'flex items-center',
          disabled ? 'text-solid-gray-420' : 'text-solid-gray-800'
        ]
      },
      overlay: [
        'bg-white border border-solid-gray-420 py-[1.5rem] shadow-(--elevation-1) mt-[4px] origin-[center_top] min-h-min',
        'motion-reduce:transition-none',
        sizeClass.overlay
      ],
      optionCheckIcon: [
        'font-700 text-blue-1000'
      ],
      option: ({ context }) => {
        const transition = 'transition duration-300 ease-in-out';
        return [
          'flex items-center text-16 gap-[0.5em] px-[1.5em]',
          context.selected ? 'bg-blue-50 font-700 text-blue-1000'  : context.focused ? `bg-solid-gray-50 ${transition}` : `bg-white ${transition} hover:bg-solid-gray-50`,
          sizeClass.option
        ]
      },
      transition: [
      ]
    }"
    checkmark
    :rest
  >
    <template #value="scope">
      <slot name="value" v-bind="scope" />
    </template>

    <template #header="scope">
      <slot name="header" v-bind="scope" />
    </template>

    <template #footer="scope">
      <slot name="footer" v-bind="scope" />
    </template>

    <template #option="scope">
      <slot name="option" v-bind="scope" />
    </template>

    <template #optiongroup="scope">
      <slot name="optiongroup" v-bind="scope" />
    </template>

    <template #emptyfilter>
      <slot name="emptyfilter" />
    </template>

    <template #empty>
      <slot name="empty" />
    </template>

    <template #content="scope">
      <slot name="content" v-bind="scope" />
    </template>

    <template #loader="scope">
      <slot name="loader" v-bind="scope" />
    </template>

    <template #clearicon="scope">
      <slot name="clearicon" v-bind="scope" />
    </template>

    <template #dropdownicon="scope">
      <slot name="dropdownicon" v-bind="scope" />
    </template>

    <template #loadingicon="scope">
      <slot name="loadingicon" v-bind="scope" />
    </template>

    <template #filtericon="scope">
      <slot name="filtericon" v-bind="scope" />
    </template>
  </Select>
</template>
