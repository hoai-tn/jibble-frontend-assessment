import type { ApiError, ApiResponse } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonmock.hackerrank.com/api'

/**
 * Make GET request
 */
export async function get<T = unknown> (url: string): Promise<ApiResponse<T>> {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: ApiError = {
        message: `Request failed with status ${response.status}`,
        status: response.status,
        statusText: response.statusText,
      }
      throw error
    }

    const data = await response.json()

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      throw error
    }
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    }
    throw apiError
  }
}

// Export as apiClient for backward compatibility
export const apiClient = {
  get,
}

export default apiClient
