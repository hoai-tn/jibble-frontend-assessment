<template>
  <div class="movie-search">
    <AppTextField
      v-model="searchValue"
      class="movie-search__input"
      clearable
      density="comfortable"
      label="Search movies"
      placeholder="Enter movie title or year..."
      prepend-inner-icon="mdi-magnify"
      :rules="searchRules"
      @clear="handleClear"
      @update:model-value="handleInput"
    />
  </div>
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
    debounce: 300,
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
  width: 100%;

  &__input {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
