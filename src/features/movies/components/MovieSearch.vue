<template>
  <v-container class="movie-search">
    <AppTextField
      v-model="searchValue"
      class="movie-search__input"
      clearable
      density="comfortable"
      hide-details="auto"
      placeholder="Search for movies... (e.g., Inception, 2010)"
      prepend-inner-icon="mdi-magnify"
      :rules="searchRules"
      variant="solo"
      @clear="handleClear"
      @update:model-value="handleInput"
    />
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import AppTextField from '@/components/ui/AppTextField.vue'
  import { useDebounce } from '@/composables/useDebounce'
  import { noSpecialChars } from '@/composables/useValidationRules'

  interface Props {
    modelValue?: string
    debounce?: number
  }

  interface Emits {
    (e: 'update:modelValue' | 'search', value: string): void
    (e: 'clear'): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    debounce: 400,
  })

  const emit = defineEmits<Emits>()

  const searchValue = ref(props.modelValue)

  // Use reusable validation rule
  const searchRules = computed(() => [noSpecialChars])

  // Watch for external changes
  watch(
    () => props.modelValue,
    newValue => {
      searchValue.value = newValue
    },
  )

  // Setup debounced search
  const { debouncedFn: debouncedSearch, cancel } = useDebounce((value: string) => {
    emit('update:modelValue', value)
    emit('search', value)
  }, props.debounce)

  function handleInput (value: string): void {
    if (searchRules.value.every(rule => rule(value) === true)) {
      debouncedSearch(value)
    }
  }

  function handleClear (): void {
    cancel()
    searchValue.value = ''
    emit('update:modelValue', '')
    emit('clear')
  }
</script>

<style scoped lang="scss">

.movie-search {
  &__input {
    max-width: 700px;
    margin: 0 auto;

    :deep(.v-field) {
      border-radius: 50px;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.08),
        0 1px 4px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;

      &:hover {
        box-shadow:
          0 8px 30px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.06);
      }
    }

    :deep(.v-field--focused) {
      box-shadow:
        0 8px 40px rgba(var(--v-theme-primary), 0.15),
        0 2px 12px rgba(var(--v-theme-primary), 0.1);
      transform: translateY(-2px);
    }

    :deep(.v-field__input) {
      font-size: 1rem;
      padding: 12px 0;
    }

    :deep(.v-field__prepend-inner) {
      padding-left: 8px;
      }
    }
  }

</style>
