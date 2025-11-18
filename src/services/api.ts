import type { ApiError, ApiResponse } from './types'
import axios, { type AxiosInstance } from 'axios'
import { appConfig } from '@/configs/app.config'

/**
 * Create and configure Axios instance
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Response interceptor for error handling
 */
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Unknown error occurred',
      status: error.response?.status,
      statusText: error.response?.statusText,
    }
    return Promise.reject(apiError)
  },
)

/**
 * Make GET request
 */
export async function get<T = unknown> (url: string): Promise<ApiResponse<T>> {
  const response = await axiosInstance.get<T>(url)

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  }
}

/**
 * Export as apiClient for backward compatibility
 */
export const apiClient = {
  get,
}

export default apiClient
