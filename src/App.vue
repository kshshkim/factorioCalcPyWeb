<template>
  <v-app>
    <v-main>
      <RecipeSearch />
    </v-main>
  </v-app>
</template>

<script>
// import MainPage from "@/views/MainPage";
// import asdf from "@/components/asdf";
// import RecipeSearch from "@/components/RecipeSearch";
// MainPage,
//     asdf,
//     RecipeSearch
// <MainPage />
// <asdf />
// <RecipeSearch />

import RecipeSearch from "@/components/RecipeSearch";
export default {
  name: 'App',

  components: {
    RecipeSearch
  },

  data: () => ({
    //
  }),
};
</script>
