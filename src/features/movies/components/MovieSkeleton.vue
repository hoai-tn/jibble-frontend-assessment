<template>
  <v-row class="movie-grid">
    <v-col
      v-for="i in 10"
      :key="i"
      class="movie-grid__item"
      cols="12"
      md="3"
      sm="4"
    >
      <AppCard class="movie-skeleton">
        <v-skeleton-loader class="movie-skeleton__poster" height="250" type="image" />
        <v-skeleton-loader class="movie-skeleton__title" type="heading" />
      </AppCard>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import AppCard from '@/components/ui/AppCard.vue'
</script>

<style scoped lang="scss">
.movie-skeleton {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__poster {
    position: relative;
  }

  &__title {
    min-height: 2.6rem;
    padding: 16px 8px;
  }
}
</style>
