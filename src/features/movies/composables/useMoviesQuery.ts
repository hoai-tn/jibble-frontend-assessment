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
  const { data, isLoading, isFetching, error, refetch } = useQuery({
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

  // isLoading: true only when there's no data yet (initial load)
  // isFetching: true whenever a request is in progress (including pagination)
  const initialLoading = computed(() => isLoading.value && !data.value)

  return {
    movies,
    loading: isFetching, // Use isFetching instead of isLoading for pagination
    initialLoading,
    error: computed(() => error.value?.message ?? null),
    currentPage,
    totalPages,
    total,
    refetch,
  }
}
