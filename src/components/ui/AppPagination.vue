<template>
  <v-pagination
    v-model="currentPage"
    class="app-pagination"
    :density="responsiveDensity"
    :disabled="disabled"
    :length="totalPages"
    :total-visible="responsiveTotalVisible"
    @update:model-value="handlePageChange"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  enum Density {
    DEFAULT = 'default',
    COMFORTABLE = 'comfortable',
    COMPACT = 'compact',
  }
  enum TotalVisible {
    MOBILE = 5,
    TABLET = 7,
  }
  interface Props {
    modelValue?: number
    totalPages?: number
    totalVisible?: TotalVisible.MOBILE | TotalVisible.TABLET
    disabled?: boolean
    density?: Density
  }

  interface Emits {
    (e: 'update:modelValue' | 'change', value: number): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: 1,
    totalPages: 1,
    totalVisible: TotalVisible.TABLET,
    disabled: false,
    density: Density.DEFAULT,
  })

  const emit = defineEmits<Emits>()
  const { xs, sm } = useDisplay()

  const currentPage = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
      emit('change', value)
    },
  })

  // Responsive total visible pages
  const responsiveTotalVisible = computed(() => {
    if (xs.value) return TotalVisible.MOBILE // Mobile: 5 buttons
    if (sm.value) return TotalVisible.TABLET // Tablet: 7 buttons
    return props.totalVisible // Desktop: full
  })

  // Responsive density
  const responsiveDensity = computed(() => {
    if (xs.value) return Density.COMPACT// Mobile: compact
    if (sm.value) return Density.COMFORTABLE // Tablet: comfortable
    return props.density
  })

  function handlePageChange (page: number): void {
    emit('change', page)
  }
</script>
