<template>
  <v-app>
    <v-main>
      <CalcMain />
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

// import RecipeSearch from "@/components/RecipeSearch";
import CalcMain from "@/components/CalcMain";
export default {
  name: 'App',

  components: {
    CalcMain
    // RecipeSearch
  },

  data: () => ({
    //
  }),
};
</script>
