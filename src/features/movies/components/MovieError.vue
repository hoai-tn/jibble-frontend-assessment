<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-alert :error="error" @close="handleErrorClose" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>

  interface Props {
    error: string | null
  }

  interface Emits {
    (e: 'error-close'): void
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

  function handleErrorClose (): void {
    emit('error-close')
  }
</script>
