interface AppConfig {
  apiBaseUrl: string
}

export const appConfig: AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://jsonmock.hackerrank.com/api',
} as const satisfies AppConfig
