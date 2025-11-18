<template>
  <v-btn
    v-bind="$attrs"
    class="app-button"
    :color="color"
    :disabled="disabled"
    :loading="loading"
    :size="size"
    :variant="variant"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts" setup>
  interface Props {
    color?: string
    variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
    size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
    disabled?: boolean
    loading?: boolean
  }

  withDefaults(defineProps<Props>(), {
    color: 'primary',
    variant: 'flat',
    size: 'default',
    disabled: false,
    loading: false,
  })
</script>

<style scoped lang="scss">
.app-button {
  text-transform: none;
}
</style>
