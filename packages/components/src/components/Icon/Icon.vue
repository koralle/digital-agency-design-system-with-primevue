<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import type { IconProps } from './props';

const { name } = defineProps<IconProps>();

const Icon = defineAsyncComponent(() => import(`../../assets/icons/${name}.svg`));
</script>

<template>
  <Icon :name="name" />
</template>
