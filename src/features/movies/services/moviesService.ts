/**
 * Movies service
 * Handles all API calls related to movies
 */

import type { MovieApiResponse, MoviesQueryParams } from '@/types/movies'
import { apiClient } from '@/services/api'
import { buildQueryString } from '@/utils/buildQueryString'

/**
 * Get movies with pagination and optional search
 * @param page - Page number (default: 1)
 * @param search - Optional search title filter
 * @param itemsPerPage - Number of items per page (default: 10)
 * @returns Promise with movie API response
 */
export async function getMovies (page = 1, search?: string, itemsPerPage = 10): Promise<MovieApiResponse> {
  // Validate page number
  if (page < 1 || !Number.isInteger(page)) {
    throw new Error('Page number must be a positive integer')
  }

  // Sanitize title input to prevent XSS
  let sanitizedTitle: string | undefined | null
  if (search) {
    // Remove potentially dangerous characters and limit length
    sanitizedTitle = search.trim().slice(0, 200).replace(/[<>]/g, '')
  }

  // Build query parameters
  const params: MoviesQueryParams = { page }

  if (!Number.isNaN(Number(sanitizedTitle)) && sanitizedTitle) {
    params.Year = sanitizedTitle
  } else if (sanitizedTitle) {
    params.Title = sanitizedTitle
  }

  // Build query string
  const queryString = buildQueryString(params)

  try {
    // Make API request
    const response = await apiClient.get<MovieApiResponse>(`/movies/search?${queryString}`)

    // Validate response structure
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid API response format')
    }

    // Ensure required fields exist
    const data = response.data

    // Validate page number is within valid range
    if (data.page > data.total_pages && data.total_pages > 0) {
      throw new Error(`Page ${data.page} is out of range. Total pages: ${data.total_pages}`)
    }

    return data
  } catch (error) {
    // Re-throw with context if it's already an ApiError
    if (error && typeof error === 'object' && 'message' in error) {
      throw error
    }
    // Wrap unknown errors
    throw new Error('Failed to fetch movies. Please try again later.')
  }
}
