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
 * @returns Promise with movie API response
 */
export async function getMovies (page = 1, search?: string): Promise<MovieApiResponse> {
  // Validate page number
  if (page < 1 || !Number.isInteger(page)) {
    throw new Error('Page number must be a positive integer')
  }

  // Build query parameters
  const params: MoviesQueryParams = { page }

  // Sanitize and add search parameter if provided
  if (search) {
    // Remove potentially dangerous characters and limit length
    const sanitizedTitle = search.trim().slice(0, 200).replace(/[<>]/g, '')

    if (sanitizedTitle) {
      // Check if it's a year (number)
      if (Number.isInteger(Number(sanitizedTitle))) {
        params.Year = sanitizedTitle
      } else {
        params.Title = sanitizedTitle
      }
    }
  }

  // Build query string
  const queryString = buildQueryString(params)

  try {
    // Make API request
    const response = await apiClient.get<MovieApiResponse>(`/movies/search?${queryString}`)

    // Ensure required fields exist
    const data = response.data

    // Validate page number is within valid range
    if (data.page > data.total_pages && data.total_pages > 0) {
      throw new Error(`Page ${data.page} is out of range. Total pages: ${data.total_pages}`)
    }

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch movies. Please try again later.')
  }
}
