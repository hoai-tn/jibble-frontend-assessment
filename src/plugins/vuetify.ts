/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// Custom dark theme configuration
const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    'background': '#020817',
    'surface': '#171717',
    'surface-variant': '#2A2A2A',
    'surface-bright': '#3A3A3A',
    'on-surface': '#FFFFFF',
    'primary': '#ff6603',
    'primary-darken-1': '#5d5ad8',
    'secondary': '#03DAC6',
    'secondary-darken-1': '#00C4B4',
    'error': '#CF6679',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customDarkTheme,
    },
  },
})
