/**
 * Builds a query string from an object, filtering out undefined and null values
 * @param params - Object with query parameters
 * @returns Query string (without leading '?')
 */
export function buildQueryString<T> (params: T): string {
  return new URLSearchParams(
    Object.entries(params as Record<string, unknown>).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value)
        }
        return acc
      },
      {} as Record<string, string>,
    ),
  ).toString()
}
