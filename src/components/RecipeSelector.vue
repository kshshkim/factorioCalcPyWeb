<template>
  <v-autocomplete
      v-model="selectedRecipe"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-details
      hide-selected
      label="Choose Recipe"
      solo
      auto-select-first
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Type recipe name in
          <strong>kebab-case</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:selection="{ item }">
      <v-img
          max-width="24px"
          max-height="24px"
          :src="iconUrl(item)"
      >
      </v-img>
      &nbsp; {{ item }}
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-icon>
        <v-img
            max-width="24px"
            max-height="24px"
            :src="iconUrl(item)"
        >
        </v-img>
      </v-list-item-icon>
      <v-list-item-content>
        {{ item }}
      </v-list-item-content>
    </template>
  </v-autocomplete>

</template>

<script>
import urls from "@/domainNameAndUrls";
const apiUrl = urls.apiUrl

export default {
  name: "RecipeSelector",
  watch: {
    search() {
      if (this.items.length > 0) return
      fetch(apiUrl + "/recipe_list")
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
      // .finally(() => (this.isLoading = false))
    },
    selectedRecipe(){
      this.$emit("onAutoCompSelect", this.selectedRecipe);
    }
  },
  data() {
    return {
      selectedRecipe: null,
      loading: false,
      items: [],
      search: null,
      }
    },
  methods:{
    iconUrl(name){
      return urls.iconUrl(name)
    },
  }
}

</script>

<style scoped>

</style>