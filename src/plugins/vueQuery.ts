/**
 * Vue Query plugin configuration
 */
import type { App } from 'vue'

import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  },
}

export function registerVueQuery (app: App): void {
  app.use(VueQueryPlugin, vueQueryOptions)
}
