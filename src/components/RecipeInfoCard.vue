<template>
  <v-card>
    <slot name="recipe_name">

    </slot>
    <v-divider></v-divider>
    <slot name="amount"></slot>
  </v-card>
</template>

<script>
export default {
  name: "RecipeInfoCard",
  props:{

  }
}
</script>

<style scoped>

</style>