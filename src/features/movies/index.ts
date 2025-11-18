/**
 * Movies feature entry point
 * Exports public API for the movies feature
 */

export { default as MovieCard } from './components/MovieCard.vue'
export { default as MovieEmpty } from './components/MovieEmpty.vue'
export { default as MovieError } from './components/MovieError.vue'
export { default as MovieGrid } from './components/MovieGrid.vue'
export { default as MovieList } from './components/MovieList.vue'
export { default as MoviePagination } from './components/MoviePagination.vue'
export { default as MovieSearch } from './components/MovieSearch.vue'
export { default as MovieSkeleton } from './components/MovieSkeleton.vue'
export { useMoviesQuery } from './composables/useMoviesQuery'
export { getMovies } from './services/moviesService'

export type { Movie, MovieApiResponse, MoviesQueryParams, MoviesState } from '@/types/movies'
