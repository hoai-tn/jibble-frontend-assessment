<template>
  <div v-if="totalPages > 1" class="movie-pagination">
    <v-row justify="center">
      <v-col cols="12" md="auto">
        <!-- Pagination Info -->
        <div class="text-center text-body-2 text-medium-emphasis mb-3">
          Showing {{ paginationInfo.start }} - {{ paginationInfo.end }} of
          {{ paginationInfo.totalItems }} movies
        </div>

        <!-- Pagination Controls -->
        <AppPagination
          :disabled="loading"
          :model-value="currentPage"
          :total-pages="totalPages"
          @change="handlePageChange"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
  import AppPagination from '@/components/ui/AppPagination.vue'

  interface Props {
    currentPage: number
    totalPages: number
    paginationInfo: {
      start: number
      end: number
      totalItems: number
    }
    loading: boolean
  }

  interface Emits {
    (e: 'page-change', page: number): void
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

  function handlePageChange (page: number): void {
    emit('page-change', page)

    // Smooth scroll to top of page
    window.scrollTo({ top: 64, behavior: 'smooth' })
  }
</script>

<style scoped lang="scss">
.movie-pagination {
  padding: 32px 0 16px;
}
</style>
