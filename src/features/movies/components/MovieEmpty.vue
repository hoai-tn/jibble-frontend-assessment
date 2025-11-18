<template>
  <v-row justify="center">
    <v-col class="text-center" cols="12" md="6">
      <v-icon class="mb-4" color="grey-lighten-1" size="64">
        mdi-movie-off
      </v-icon>
      <h3 class="text-h6 mb-2">No movies found</h3>
      <p class="text-body-2 text-medium-emphasis">
        {{ emptyMessage }}
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  interface Props {
    searchQuery?: string
  }

  const props = defineProps<Props>()

  const emptyMessage = computed(() =>
    props.searchQuery
      ? `No movies found for "${props.searchQuery}"`
      : 'Try searching for a movie',
  )
</script>
