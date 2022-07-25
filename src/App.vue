<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Fake UserDashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <HomeView></HomeView>
    </v-main>
  </v-app>
</template>

<script>
import HomeView from './views/HomeView.vue';
  export default {
    data: () => ({ drawer: null }),
    components: { HomeView }
}
</script>