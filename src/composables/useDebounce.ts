/**
 * Composable for debouncing function calls
 * Reusable across any component that needs debounced input handling
 */

import { onUnmounted, ref } from 'vue'

export function useDebounce<T extends (...args: any[]) => any> (
  callback: T,
  delay = 300,
) {
  const timer = ref<ReturnType<typeof setTimeout> | null>(null)

  function debouncedFn (...args: Parameters<T>): void {
    if (timer.value) {
      clearTimeout(timer.value)
    }
    timer.value = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  function cancel (): void {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }

  function flush (): void {
    if (timer.value) {
      clearTimeout(timer.value)
      callback()
      timer.value = null
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    cancel()
  })

  return {
    debouncedFn,
    cancel,
    flush,
  }
}
