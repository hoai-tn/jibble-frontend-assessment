<template>
  <v-text-field
    v-bind="$attrs"
    class="app-text-field"
    :clearable="clearable"
    :density="density"
    :disabled="disabled"
    :error="error"
    :error-messages="errorMessages"
    hide-details="auto"
    :label="label"
    :model-value="modelValue"
    :placeholder="placeholder"
    variant="outlined"
    @clear="handleClear"
    @update:model-value="handleUpdate"
  />
</template>

<script lang="ts" setup>
  interface Props {
    modelValue?: string
    label?: string
    placeholder?: string
    disabled?: boolean
    error?: boolean
    errorMessages?: string | string[]
    clearable?: boolean
    density?: 'default' | 'comfortable' | 'compact'
  }

  interface Emits {
    (e: 'update:modelValue', value: string): void
    (e: 'clear'): void
  }

  withDefaults(defineProps<Props>(), {
    modelValue: '',
    label: undefined,
    placeholder: undefined,
    disabled: false,
    error: false,
    errorMessages: undefined,
    clearable: false,
    density: 'default',
  })

  const emit = defineEmits<Emits>()

  function handleUpdate (value: string): void {
    emit('update:modelValue', value)
  }

  function handleClear (): void {
    emit('update:modelValue', '')
    emit('clear')
  }
</script>

<style scoped lang="scss">
.app-text-field {
  // Additional styling if needed
}
</style>
