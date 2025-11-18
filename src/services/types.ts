/**
 * Global API service types
 */

export interface ApiError {
  message: string
  status?: number
  statusText?: string
  data?: unknown
}

export interface ApiRequestConfig extends RequestInit {
  timeout?: number
  retries?: number
}

export interface ApiResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Headers
}

export type RequestInterceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>
export type ResponseInterceptor<T = unknown> = (
  response: ApiResponse<T>,
) => ApiResponse<T> | Promise<ApiResponse<T>>
export type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>
