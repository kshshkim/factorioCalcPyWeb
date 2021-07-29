<template>
  <v-container>
    <v-autocomplete
        v-model="conf.recipe_name"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Choose Recipe"
        solo
    ></v-autocomplete>

    <v-text-field
        label="amount"
        v-model="conf.amount"
    >
    </v-text-field>

    <v-text-field
      label="mining research modifier"
      v-model="conf.mining_research_modifier"
    >

    </v-text-field>

    <v-btn
    v-on:click="sendCalcAPIRequest"
    >
    <div>
      Get Results
    </div>
    </v-btn>

    <v-expansion-panels
    v-model="pannelOpened"
    multiple
    >
      <v-expansion-panel
      v-for="recp in results.recipe"
      v-bind:key="recp"
      >
        <v-expansion-panel-header>
          {{recp.name}}
          <v-spacer />
          {{recp.machine_name}}:  {{recp.amount_factory_required}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{recp}}
        </v-expansion-panel-content>


      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>


<script>
const axios = require('axios');
const apiUrl = "https://a.privatelaw.net";
// const cdnUrl = "https://cdn.privatelaw.net";
// function getIconURL(nameToFind){
//
//
// }

function buildForm(Config){

  let toReturn = {
    rand_id: 0.123,
    conf: {
      recipe_name: Config.recipe_name,
      amount: Config.amount,
      mining_research_modifier: Config.mining_research_modifier
    },
    action: {
      action_name: "initialize",
      action_detail: {}
    }
  }
  return toReturn
}


export default {
  name: "RecipeSearch",
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      conf:{
        recipe_name: "string",
        amount: 1,
        mining_research_modifier: 0
      },
      results: {},

      pannelOpened: []
    }
  },
  watch:{

    search () {
      if (this.items.length > 0) return
        fetch(apiUrl+"/recipe_list")
            .then(res => res.clone().json())
            .then(res => {
              this.items = res
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))



    }
  },
  methods:{
    // loadRecipeList(){
      // this.loading = true;
      // axios.get(apiUrl+"/recipe_list").then(resp => this.items = resp.data)
      // this.loading = false;
    // },

    sendCalcAPIRequest() {
      let pData = buildForm(this.conf)
      console.log(pData)
      axios.post(apiUrl+"/calc/",pData).then(resp => this.results = resp.data)
    },

    // getImageSrc(rname) {
    //   let to_return = null;
    //   axios.get(apiUrl+"/icon_url/"+rname).then(resp => to_return = resp)
    //   return to_return
    // }


  },


}
</script>

<style scoped>

</style>