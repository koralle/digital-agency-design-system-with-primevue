<script setup lang="ts">
import Button from 'primevue/button';
import type { ButtonProps } from './props';
import { computed } from 'vue';
import { clsx } from 'clsx';

const { size = 'medium', variant = 'primary', ...rest } = defineProps<ButtonProps>();

const sizeClass = computed(() => {
  switch (size) {
    case 'x-small':
      return clsx([
        'min-w-[4.5em] h-[1.75em] rounded-[6px] relative',
        'before:absolute before:inset-0 before:-top-[9px] before:h-[44px]',
      ]);
    case 'small':
      return clsx([
        'min-w-[5em] h-[2.25em] rounded-[6px] relative',
        'before:absolute before:inset-0 before:-top-[5px] before:h-[44px]',
      ]);
    case 'medium':
      return 'min-w-[6em] h-[3em] rounded-[8px]';
    case 'large':
      return 'min-w-[8.5em] h-[3.5em] rounded-[8px]';
  }
});

const variantClass = computed(() => {
  switch (variant) {
    case 'primary':
      return {
        root: clsx([
          'bg-blue-900 text-white border-blue-900 border',
          'hover:bg-blue-1000',
          'active:bg-blue-1200',
          'disabled:bg-solid-gray-300 disabled:text-solid-gray-50 disabled:border-solid-gray-300',
          'transition duration-300 ease-in-out',
        ]),
        icon: clsx([
          'text-current',
        ]),
        label: clsx([
          'text-current',
        ]),
        loadingIcon: clsx([
          'text-current',
        ]),
      }
    case 'secondary':
      return {
        root: clsx([
          'bg-white text-blue-900 border-blue-900 border',
          'hover:bg-blue-200 hover:text-blue-1000',
          'active:bg-blue-300 active:text-blue-1200',
          'disabled:bg-white disabled:text-solid-gray-300 disabled:border-solid-gray-300 disabled:border',
          'transition duration-300 ease-in-out',
        ]),
        icon: clsx([
          'text-current',
        ]),
        label: clsx([
          'text-current',
        ]),
        loadingIcon: clsx([
          'text-current',
        ]),
      };
    case 'tertiary':
      return {
        root: clsx([
          'text-blue-900 bg-transparent border-transparent border',
          'hover:bg-blue-50 hover:text-blue-1000',
          'active:bg-blue-100 active:text-blue-1200',
          'disabled:bg-transparent disabled:text-solid-gray-300',
          'transition duration-300 ease-in-out',
        ]),
        icon: clsx([
          'text-current',
        ]),
        label: clsx([
          'text-current',
        ]),
        loadingIcon: clsx([
          'text-current',
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
        'inline-flex items-center justify-center box-border gap-[0.5em] text-16 font-700 px-[0.75em]',
        variantClass.root,
        sizeClass,
      ],
      icon: [variantClass.icon],
      label: [variantClass.label],
      loadingIcon: [variantClass.loadingIcon],
    }"
    :rest
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </Button>
</template>
