<template>
  <v-container>
    <component
      :is="view.component"
      v-bind="view.props"
      @retry="handleRetry"
    />
  </v-container>
</template>

<script setup lang="ts">
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

  const view = computed(() => {
    // Show skeleton while loading
    if (props.initialLoading)
      return { component: MovieSkeleton, props: {} }

    // Show error message if there is an error
    if (props.error)
      return { component: MovieError, props: { error: props.error } }

    // Show empty message if there are no movies and not loading
    if (!props.loading && props.movies.length === 0)
      return { component: MovieEmpty, props: { searchQuery: props.searchQuery } }

    // Show movies grid if there are movies and not loading
    return { component: MovieGrid, props: { movies: props.movies } }
  })

  function handleRetry () {
    router.push({ query: { ...query, page: 1 } })
  }
</script>
