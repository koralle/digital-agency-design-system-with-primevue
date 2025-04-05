<script setup lang="ts">
import { Icon } from '@digital-agency-design-system-with-primevue/components/icon'
import { ref } from 'vue'
import { Textarea } from '@digital-agency-design-system-with-primevue/components/textarea'

const text = ref('これはテキストです。')
</script>

<template>
  <Textarea v-model="text" />
</template>
