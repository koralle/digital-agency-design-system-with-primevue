<script setup lang="ts">
import Button from 'primevue/button';
import type { ButtonProps } from './props';
import { computed } from 'vue';
import { clsx } from 'clsx';

const { size = 'medium', variant = 'primary', ...rest } = defineProps<ButtonProps>();

const sizeClass = computed(() => {
  switch (size) {
    case 'x-small':
      return 'min-w-[4.5em] h-[1.75rem] rounded-[6px]';
    case 'small':
      return 'min-w-[5em] h-[2.25rem] rounded-[6px]';
    case 'medium':
      return 'min-w-[6em] h-[3rem] rounded-[8px]';
    case 'large':
      return 'min-w-[8.5em] h-[3.5rem] rounded-[8px]';
  }
});

const variantClass = computed(() => {
  switch (variant) {
    case 'primary':
      return {
        root: clsx([
          'bg-blue-900 border-0',
          'hover:bg-blue-1000',
          'active:bg-blue-1200',
          'disabled:bg-solid-gray-300',
          'transition duration-300 ease-in-out',
        ]),
        icon: clsx([
          'text-white',
          'disabled:text-solid-gray-50',
        ]),
        label: clsx([
          'text-white',
          'disabled:text-solid-gray-50',
        ]),
      }
    case 'secondary':
      return {
        root: clsx([
          'bg-white text-blue-900 border-blue-900 border-px',
          'hover:bg-blue-200',
          'active:bg-blue-300',
          'disabled:bg-white disabled:border-solid-gray-300 disabled:border-px',
          'transition duration-300 ease-in-out',
        ]),
        icon: clsx([
          'text-blue-900',
          'disabled:text-solid-gray-300',
          'hover:text-blue-1000',
          'active:text-blue-1200',
          'transition duration-300 ease-in-out',
        ]),
        label: clsx([
          'text-blue-900',
          'hover:text-blue-1000',
          'active:text-blue-1200',
          'disabled:text-solid-gray-300',
          'transition duration-300 ease-in-out'
        ]),
      };
    case 'tertiary':
      return {
        root: clsx([
          'text-blue-900 border-0',
          'hover:bg-blue-50',
          'active:bg-blue-100',
          'disabled:text-solid-gray-300',
          'transition duration-300 ease-in-out',
        ]),
        icon: clsx([
          'text-blue-900',
          'disabled:text-solid-gray-300',
          'hover:text-blue-1000',
          'active:text-blue-1200',
          'transition duration-300 ease-in-out',
        ]),
        label: clsx([
          'text-blue-900',
          'hover:text-blue-1000',
          'active:text-blue-1200',
          'disabled:text-solid-gray-300',
          'transition duration-300 ease-in-out'
        ]),
      };
  }
});
</script>

<template>
  <Button
    unstyled
    :pt="{
      root: [
        'text-16 font-700 px-[0.75em] text-center',
        variantClass.root,
        sizeClass,
      ],
      icon: [variantClass.icon],
      label: [variantClass.label]
    }"
    :rest
  />
</template>
