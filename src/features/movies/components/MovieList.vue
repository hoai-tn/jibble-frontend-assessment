<template>
  <v-container>
    <component
      :is="currentComponent"
      v-bind="componentProps"
      @retry="handleRetry"
    />
  </v-container>
</template>

<script lang="ts" setup>
  import type { Movie } from '@/types/movies'
  import MovieEmpty from './MovieEmpty.vue'
  import MovieError from './MovieError.vue'
  import MovieGrid from './MovieGrid.vue'
  import MovieSkeleton from './MovieSkeleton.vue'

  interface Props {
    movies: Movie[]
    loading: boolean
    initialLoading: boolean
    error: string | null
    searchQuery: string
  }

  const props = defineProps<Props>()

  const router = useRouter()

  const { query } = useRoute()

  // Determine which component to render based on state
  const currentComponent = computed<Component>(() => {
    if (props.initialLoading) return MovieSkeleton
    if (props.error) return MovieError
    if (!props.loading && props.movies.length === 0) return MovieEmpty
    return MovieGrid
  })

  // Dynamic props for the current component
  const componentProps = computed(() => {
    if (props.initialLoading) return {}
    if (props.error) return { error: props.error }
    if (!props.loading && props.movies.length === 0) return { searchQuery: props.searchQuery }
    return { movies: props.movies }
  })

  function handleRetry (): void {
    router.push({ query: { ...query, page: 1 } })
  }
</script>
