<template>
  <v-skeleton-loader
    v-bind="$attrs"
    :boilerplate="boilerplate"
    class="app-skeleton"
    :loading="loading"
    :type="type"
  />
</template>

<script lang="ts" setup>
  interface Props {
    type?: string
    loading?: boolean
    boilerplate?: boolean
  }

  withDefaults(defineProps<Props>(), {
    type: 'text',
    loading: true,
    boilerplate: false,
  })
</script>

<style scoped lang="scss">
.app-skeleton {
  // Additional styling if needed
}
</style>
