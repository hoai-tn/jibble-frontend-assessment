/**
 * Movies composable with Vue Query
 * Minimal implementation with URL params support
 */

import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { getMovies } from '../services/moviesService'

interface UseMoviesQueryOptions {
  page: Ref<number>
  search: Ref<string>
}
const KEY_QUERY = 'movies'
export function useMoviesQuery ({ page, search }: UseMoviesQueryOptions) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [KEY_QUERY, page, search],
    queryFn: async () => {
      const searchQuery = search.value.trim()
      return await getMovies(page.value, searchQuery)
    },
    placeholderData: keepPreviousData,
  })

  const movies = computed(() => data.value?.data ?? [])
  const totalPages = computed(() => data.value?.total_pages ?? 0)
  const total = computed(() => data.value?.total ?? 0)
  const currentPage = computed(() => data.value?.page ?? page.value)

  const initialLoading = computed(() => isLoading.value && !data.value)

  return {
    movies,
    loading: isLoading,
    initialLoading,
    error: computed(() => error.value?.message ?? null),
    currentPage,
    totalPages,
    total,
    refetch,
  }
}
