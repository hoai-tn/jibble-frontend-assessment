<template>
  <v-footer color="background">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-divider class="mb-4" />
        </v-col>

        <v-col class="text-left text-md-left" cols="12" md="4">
          <div class="text-body-1 font-weight-bold mb-2">Movie Browser</div>
          <div class="text-body-2 text-medium-emphasis">
            Explore and discover movies
          </div>
        </v-col>

        <v-col class="d-flex align-center justify-center" cols="12" md="4">
          <v-btn
            aria-label="GitHub"
            class="mx-1"
            href="https://github.com"
            icon="mdi-github"
            size="small"
            target="_blank"
            variant="text"
          />
          <v-btn
            aria-label="LinkedIn"
            class="mx-1"
            href="https://linkedin.com"
            icon="mdi-linkedin"
            size="small"
            target="_blank"
            variant="text"
          />
        </v-col>

        <v-col class="text-right text-md-right d-flex align-center justify-end" cols="12" md="4">
          <div class="text-body-2 text-medium-emphasis">
            {{ currentYear }} • Built with Vue 3 + Vuetify
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
