<template>
  <v-container>
    <v-row>
      <v-col>
      <modifier-forms @onEmitThings="onEmitThings"/>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          @click="onGetResultButtonClick"
          :disabled="!isTheFormValid"
      >
        get results</v-btn>
      <v-btn
          @click="visualizeNewWindow"
          :disabled="!isAbleToVisualize"
      >
        visualize</v-btn>
    </v-row>
    <v-row>
      <v-col
      cols="auto"
      >

        <v-card
        tile
        >
          <v-list-item-group
          v-model="listSelectedIndex"
          >

          <v-list-item
          v-for="i in results.recipe"
          :key="i.name"
          >
            <v-list-item-content>
              <v-row>
                <v-col
                    cols="auto"
                >
                  <v-img
                      max-width="32px"
                      min-width="32px"
                      max-height="32px"
                      min-height="32px"
                      :src="`https://cdn.privatelaw.net/icons/`+i.name+`.png`"
                  >
                  </v-img>
                </v-col>
                <v-col>
                  <v-list-item-title>{{i.name}}</v-list-item-title>
                  <v-list-item-subtitle
                  virtical-align="center"
                  >
                    <v-row
                    >
                      <v-col
                          cols="auto"
                      >
                        <v-btn
                            @click.native.stop="doSomething(i.name)"
                            :elevation="0"
                        >
                          <v-img
                              max-width="24px"
                              min-width="16px"
                              max-height="24px"
                              min-height="16px"
                              :src="`https://cdn.privatelaw.net/icons/`+i.machine_name+`.png`"
                              class="pr-0"
                          >
                        </v-img>
                        </v-btn>
                      </v-col>
                      <v-col
                      align-self="center"
                      >
                        x {{i.amount_factory_required}}
                      </v-col>
                    </v-row>
                  </v-list-item-subtitle>
                </v-col>
              </v-row>
            </v-list-item-content>

          </v-list-item>
          </v-list-item-group>


        </v-card>

      </v-col>
      <v-divider
          vertical
      ></v-divider>
      <v-col
      cols="auto">
        <v-card>
          here goes details
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import ModifierForms from "@/components/modifierForms";

const axios = require('axios');
const apiUrl = "https://a.privatelaw.net";
const randID = Math.random();


function buildForm(Config){
  return {
    rand_id: randID,
    conf: {
      recipe_name: Config.recipe_name,
      amount: Config.amount,
      mining_research_modifier: Config.mining_research_modifier
    },
    action: {
      "action_name": "initialize",
      "action_detail": {}
    }
  }
}

// function changeMachine(rcpName, mcName){
//   return {
//     action_name: "change_machine",
//     action_detail: {
//       recipe_name: rcpName,
//       machine_name: mcName
//     }
//
//   }
// }

export default {
  name: "asdf",
  data() {
    return {
      selectedRecipe: null,
      conf:{
        recipe_name: "string",
        amount: 1,
        mining_research_modifier: 0
      },
      results: {},
      recipeKeyList: [],
      protoResults: {},
      pannelOpened: [],
      listSelectedIndex: null,
      listSelectedRecipeName: null,
      isTheFormValid: false,
      isAbleToVisualize: false,
    }
  },
  components: {
    ModifierForms,
  },
  watch:{
    listSelectedIndex(){
      this.listSelectedRecipeName = this.recipeKeyList[this.listSelectedIndex];
    }

  },
  computed:{

  },
  methods:{
    doSomething(arrg) {
      console.log('did something'+arrg)
    },

    onGetResultButtonClick() {
      this.conf.recipe_name = this.selectedRecipe;
      this.listSelectedIndex = null;
      this.isAbleToVisualize = true;
      this.sendCalcAPIRequest();
    },

    sendCalcAPIRequest() {
      let pData = buildForm(this.conf)
      axios.post(apiUrl+"/calc",pData).then(resp => {
        this.results = resp.data;
        this.recipeKeyList = Object.keys(this.results.recipe);
      });
    },

    // getAvailableMachineList() {
    //
    // },

    // onClickMachineBtn(recipe_name){
    //
    // }

    visualizeNewWindow(){
      let toUrl = apiUrl+"/visualize/"+String(randID);
      // this.isAbleToVisualize = false;
      window.open(toUrl);
    },

    onAutoCompSelect(selectedRecipe){
      console.log('hi');
      this.selectedRecipe = selectedRecipe;
      console.log(selectedRecipe);
    },

    onEmitThings(onEmitThings) {
      this.amount = onEmitThings.amount;
      this.selectedRecipe = onEmitThings.selectedRecipe;
      this.mining_research_modifier = onEmitThings.miningResearchModifier;
      this.isTheFormValid = onEmitThings.isTheFormValid;
    },

    updateRecipeKeyList(){
      this.recipeKeyList = Object.keys(this.results.recipe);
    }


  },
}
</script>

<style scoped>

</style>