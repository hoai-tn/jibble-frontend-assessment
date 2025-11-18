<template>
  <v-row class="movie-grid">
    <v-col
      v-for="movie in movies"
      :key="movie.imdbID"
      class="movie-grid__item"
      cols="12"
      md="3"
      sm="4"
    >
      <MovieCard :movie="movie" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import type { Movie } from '@/types/movies'
  import MovieCard from './MovieCard.vue'

  interface Props {
    movies: Movie[]
  }

  defineProps<Props>()
</script>
