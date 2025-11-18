<template>
  <v-card
    v-bind="$attrs"
    :class="['app-card', { 'app-card--hover': hover }]"
    :elevation="elevation"
    :variant="variant"
  >
    <slot />
  </v-card>
</template>

<script lang="ts" setup>
  interface Props {
    elevation?: number | string
    variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined'
    hover?: boolean
  }

  withDefaults(defineProps<Props>(), {
    elevation: 2,
    variant: 'elevated',
    hover: false,
  })
</script>

<style scoped lang="scss">
.app-card {
  transition: all 0.2s ease-in-out;

  &--hover {
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
