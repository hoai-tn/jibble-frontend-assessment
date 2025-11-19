<template>
  <!-- Global Loading Progress Bar -->
  <v-progress-linear
    :active="loading"
    class="loading-bar"
    color="primary"
    height="3"
    :indeterminate="loading"
  />
  <v-container>
    <v-row>
      <v-col cols="12">
        <MovieSearch
          v-model="urlSearch"
          :loading="loading"
          @clear="handleClearSearch"
          @search="handleSearch"
        />
        <MovieList
          :error="error"
          :initial-loading="initialLoading"
          :loading="loading"
          :movies="movies"
          :search-query="urlSearch"
        />
        <MoviePagination
          v-show="showPagination"
          :current-page="displayPage"
          :loading="loading"
          :pagination-info="paginationInfo"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useUrlParams } from '@/composables/useUrlParams'
  import { MovieList, MoviePagination, MovieSearch } from '@/features/movies'
  import { useMoviesQuery } from '@/features/movies/composables/useMoviesQuery'
  // constant
  const ITEMS_PER_PAGE = 10

  // Composables
  const { page: urlPage, search: urlSearch, clearSearch } = useUrlParams()

  const { movies, loading, initialLoading, error, totalPages, total } = useMoviesQuery({
    page: urlPage,
    search: urlSearch,
  })

  // Computed
  const displayPage = computed(() => urlPage.value)
  const showPagination = computed(() => movies.value.length > 0 && error.value === null)
  const paginationInfo = computed(() => ({
    current: displayPage.value,
    total: totalPages.value,
    totalItems: total.value,
    perPage: ITEMS_PER_PAGE,
    start: (displayPage.value - 1) * ITEMS_PER_PAGE + 1,
    end: Math.min(displayPage.value * ITEMS_PER_PAGE, total.value),
  }))

  // Handlers
  function handleSearch (query: string): void {
    urlSearch.value = query
  }

  function handleClearSearch (): void {
    clearSearch()
  }

  function handlePageChange (page: number): void {
    urlPage.value = page
    window.scrollTo({ top: 64 })
  }
</script>

<style scoped lang="scss">
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

</style>
