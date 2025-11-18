<template>
  <div v-if="totalPages > 1" class="movie-pagination">
    <v-row justify="center">
      <v-col cols="12" md="auto">
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

    window.scrollTo({ top: 0 })
  }
</script>

<style scoped lang="scss">
.movie-pagination {
  padding: 16px 0;
}

.gap-2 {
  gap: 0.5rem;
}
</style>
