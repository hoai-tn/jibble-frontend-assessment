<template>
  <AppCard class="movie-card" hover>
    <div class="movie-card__poster">
      <v-img
        :alt="movie.Title"
        class="movie-card__image"
        cover
        height="300"
        :src="mockPosterUrl as string"
      />
      <v-chip class="movie-card__year-tag liquid-tag" size="small" variant="flat">
        {{ movie.Year }}
      </v-chip>
    </div>

    <v-card-title class="movie-card__title">
      {{ movie.Title }}
    </v-card-title>
  </AppCard>
</template>

<script lang="ts" setup>
  import type { Movie } from '@/types/movies'
  import { computed } from 'vue'
  import AppCard from '@/components/ui/AppCard.vue'

  interface Props {
    movie: Movie
  }

  defineProps<Props>()

  const mockPostersModules = import.meta.glob('@/assets/posters-mock/*.jpg', {
    eager: true,
    import: 'default',
  })
  // ** MOCK POSTERS WILL BE REPLACED WITH THE REAL POSTERS FROM THE API **
  const mockPosterUrl = computed(() => {
    const posterNumber = Math.floor(Math.random() * 15) + 1
    const posterPath = Object.keys(mockPostersModules).find(path =>
      path.includes(`/${posterNumber}.jpg`),
    )
    return posterPath ? mockPostersModules[posterPath] : 'https://via.placeholder.com/150'
  })
</script>

<style scoped lang="scss">
.movie-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }

  &__poster {
    position: relative;
    background: #000;
  }

  &__year-tag {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }

  &__image {
    background: linear-gradient(to bottom, #1a1a1a, #000);
  }

  &__no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }

  &__mock-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    font-size: 14px;
    line-height: 1.3;
    min-height: 2.6rem;
    padding: 16px 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
