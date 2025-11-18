<template>
  <v-pagination
    v-model="currentPage"
    class="app-pagination"
    :density="density"
    :disabled="disabled"
    :length="totalPages"
    :total-visible="totalVisible"
    @update:model-value="handlePageChange"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  interface Props {
    modelValue: number
    totalPages: number
    totalVisible?: number
    disabled?: boolean
    density?: 'default' | 'comfortable' | 'compact'
  }

  interface Emits {
    (e: 'update:modelValue' | 'change', value: number): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: 1,
    totalPages: 1,
    totalVisible: 7,
    disabled: false,
    density: 'default',
  })

  const emit = defineEmits<Emits>()

  const currentPage = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
      emit('change', value)
    },
  })

  function handlePageChange (page: number): void {
    emit('change', page)
  }
</script>
