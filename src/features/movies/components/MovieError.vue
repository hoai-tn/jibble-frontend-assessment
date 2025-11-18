<template>
  <v-row justify="center">
    <v-col class="text-center" cols="12" md="6">
      <v-icon class="mb-4" color="error" size="64">
        mdi-movie-off-outline
      </v-icon>
      <h3 class="text-h6 mb-2">Oops! Something went wrong</h3>
      <p class="text-body-2 text-medium-emphasis mb-4">
        {{ errorMessage }}
      </p>
      <v-btn
        v-if="showRetry"
        color="primary"
        variant="flat"
        @click="handleRetry"
      >
        <v-icon start>mdi-refresh</v-icon>
        Try Again
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  interface Props {
    error?: string | null
    showRetry?: boolean
  }

  interface Emits {
    (e: 'retry'): void
  }

  const props = withDefaults(defineProps<Props>(), {
    error: null,
    showRetry: true,
  })

  const emit = defineEmits<Emits>()

  const errorMessage = computed(() =>
    props.error || 'Unable to load movies. Please check your connection and try again.',
  )

  function handleRetry (): void {
    emit('retry')
  }
</script>
