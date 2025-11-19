<template>
  <v-footer color="background">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-divider class="mb-4" />
        </v-col>
        <v-col cols="12">
          <div class="text-body-2 text-medium-emphasis text-center">
            {{ currentYear }} • Hoai Tran - Built with Vue 3 + Vuetify
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
// Stateless layout component - no business logic
  const currentYear = new Date().getFullYear()
</script>
