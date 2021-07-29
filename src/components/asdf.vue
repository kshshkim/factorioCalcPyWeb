<template>
<v-expansion-panels>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Recipe and Amount
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <RecipeSearch
        v-model="recipeName">

      </RecipeSearch>
      <v-card>
        {{recipeName}}
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>

</template>

<script>
import RecipeSearch from "@/components/RecipeSearch";

export default {
  name: "asdf",
  components:{
    RecipeSearch
  },
  data() {
    return {
      recipeName: null
    }
  }
}
</script>

<style scoped>

</style>