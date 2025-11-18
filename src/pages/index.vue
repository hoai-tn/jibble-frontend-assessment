<template>
  <!-- Global Loading Progress Bar -->
  <v-progress-linear
    :active="loading"
    class="loading-bar"
    color="primary"
    height="3"
    :indeterminate="loading"
  />

  <v-container class="movies-page">
    <v-row>
      <v-col cols="12">
        <!-- Movie Search -->
        <MovieSearch
          v-model="urlSearch"
          :loading="loading"
          @clear="handleClearSearch"
          @search="handleSearch"
        />
        <!-- Movie List -->
        <MovieList
          :error="error"
          :initial-loading="initialLoading"
          :loading="loading"
          :movies="movies"
          :search-query="urlSearch"
        />
        <!-- Movie Pagination -->
        <MoviePagination
          v-show="!initialLoading && movies.length > 0"
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

  // URL params management
  const { page: urlPage, search: urlSearch, clearSearch } = useUrlParams()

  // Fetch movies with Vue Query
  const { movies, loading, initialLoading, error, totalPages, total } = useMoviesQuery({
    page: urlPage,
    search: urlSearch,
  })

  // Use URL page for immediate UI updates (optimistic)
  const displayPage = computed(() => urlPage.value)

  // Computed
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

.movies-page {
  max-width: 1400px;
  padding: 0 16px;

  @media (min-width: 960px) {
    padding: 16px 32px;
  }
}
</style>
