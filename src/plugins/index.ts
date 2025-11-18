/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'
import { createRulesPlugin } from 'vuetify/labs/rules'

import router from '../router'
import { registerVueQuery } from './vueQuery'
// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(vuetify).use(router)
  registerVueQuery(app)
  app.use(createRulesPlugin({}, vuetify.locale),
  )
}
