/**
 * Composable for managing URL search params
 */

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface QueryParams {
  page: number
  search: string
}

const DEFAULT_PAGE = 1

export function useUrlParams () {
  const route = useRoute()
  const router = useRouter()

  const page = computed({
    get: () => {
      const pageParam = route.query.page
      return pageParam ? Number(pageParam) : DEFAULT_PAGE
    },
    set: (value: number) => {
      updateParams({ search: search.value, page: value })
    },
  })

  const search = computed({
    get: () => {
      return (route.query.search as string) || ''
    },
    set: (value: string) => {
      updateParams({ search: value, page: DEFAULT_PAGE })
    },
  })

  function updateParams (params: Partial<QueryParams>) {
    const query: Record<string, string> = {}
    // Update page
    if (params.page) {
      query.page = String(params.page)
    }

    // Update search
    if (params.search) {
      query.search = params.search
      query.page = String(params.page ?? DEFAULT_PAGE)
    }

    router.push({ query })
  }

  function clearSearch () {
    router.push({ query: {} })
  }

  return {
    page,
    search,
    updateParams,
    clearSearch,
  }
}
