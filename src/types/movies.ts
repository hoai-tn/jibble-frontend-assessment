export interface Movie {
  Title: string
  Year: string
  imdbID: string
}

export interface MovieApiResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Movie[]
}

export interface MoviesQueryParams {
  page?: number
  Title?: string
  Year?: string
}

export interface MoviesState {
  movies: Movie[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  total: number
  perPage: number
  searchQuery: string
}
