<template>
  <AppNavbar />

  <v-main class="main-content">
    <router-view />
  </v-main>

  <AppFooter />
</template>

<style scoped lang="scss">
.main-content {
  min-height: calc(100vh - 64px - 200px);
  display: flex;
  flex-direction: column;
}
</style>
