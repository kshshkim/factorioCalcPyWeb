<template>
  <v-container
    class="hide-scroll-bar"
  >
    <v-row>
      <v-col>
        <main-form @onEmitForm="onEmitForm"/>
      </v-col>
    </v-row>
    <v-row
        class="mt-n7"
        style="white-space:nowrap;"
    >
      <v-col>
        <v-btn
            @click="onGetResultButtonClick"
            :disabled="!isTheFormValid"
        >
          get results
        </v-btn>
        <v-btn
            @click="visualizeNewWindow"
            :disabled="!isAbleToVisualize"
        >
          visualize
        </v-btn>
      </v-col>
      <v-col
        align="right"
      >
<!--        <v-btn>-->
<!--          <v-icon>-->
<!--            info-->
<!--          </v-icon>-->
<!--        </v-btn>-->
        <MainConf
          @confChanged="onMainConfChanged"
        />
      </v-col>
    </v-row>
    <v-row
        class="mx-0 px-0"
    >
      <v-divider
          v-if="isAbleToVisualize"
      />
    </v-row>

    <v-container
        class="mt-3 hide-scroll-bar"
        style="overflow-x:auto;"
    >

      <v-row
          class="flex-nowrap hide-scroll-bar"
      >
        <v-col
            class="hide-scroll-bar"
            style="max-height: 100vh; overflow-y: auto;"
            cols="auto"
        >
          <v-card
              tile
          >
            <v-list-item-group
                v-model="listSelectedIndex"
                mandatory
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
                          :src="iconUrl(i.name)"
                      >
                      </v-img>
                    </v-col>
                    <v-col>
                      <v-list-item-title>{{ i.name }}</v-list-item-title>
                      <v-list-item-subtitle
                          virtical-align="center"
                      >
                        <v-row
                        >
                          <v-col
                              cols="auto"
                          >
                            <ChangeMachine
                                :current-machine="i.machine_name"
                                :recipe-name="i.name"
                                @onEmitChangedMachine="onEmitChangedMachine"
                            >
                            </ChangeMachine>
                          </v-col>
                          <v-col
                              align-self="center"
                          >
                            x {{ i.amount_factory_required }}
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
            v-if="isAbleToVisualize"
            vertical
        ></v-divider>
        <v-col
            cols="auto"
            v-if="processBlockDetailVisible"
        >
          <v-container
            class="ma-0 pa-0"
            v-for="i in results.recipe"
            :key="i.name"
          >
<!--            style="padding: 0px; padding-bottom: 78.86px;"-->
            <ProcessBlockDetail
                v-if="listSelectedRecipeName === i.name"
                :selected-recipe-info="i"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>


<script>
import MainForm from "@/components/MainForm";
import ChangeMachine from "@/components/ChangeMachine";
import ProcessBlockDetail from "@/components/ProcessBlockDetail";
import urls from "@/domainNameAndUrls";
import MainConf from "@/components/MainConf"

const axios = require('axios');
const randID = Math.random();
const apiUrl = urls.apiUrl;


function buildForm(Config, Action) {

  return {
    rand_id: randID,
    conf: {
      recipe_name: Config.recipe_name,
      amount: Config.amount,
      mining_research_modifier: Config.mining_research_modifier,
      use_kovarex: Config.use_kovarex,
      preferred_machine_list: Config.preferred_machine_list
    },
    action: Action
  }
}

function actionForm(actionName, actionDetail={}) {
  return {
    action_name: actionName,
    action_detail: actionDetail
  }
}

export default {
  name: "CalcMain",
  data() {
    return {
      selectedRecipe: null,
      conf: {
        recipe_name: "string",
        amount: 1,
        mining_research_modifier: 0,
        use_kovarex: true,
        preferred_machine_list: []
      },
      results: {recipe: {}},
      recipeKeyList: [],
      listSelectedIndex: null,
      listSelectedRecipeName: null,
      listSelectedRecipeObject: null,
      isTheFormValid: false,
      isAbleToVisualize: false,
      processBlockDetailVisible: false,
    }
  },
  components: {
    MainForm: MainForm,
    ChangeMachine,
    ProcessBlockDetail,
    MainConf
  },
  watch: {
    listSelectedIndex() {
      if (this.listSelectedIndex !== null) {
        this.listSelectedRecipeName = this.recipeKeyList[this.listSelectedIndex];
        this.listSelectedRecipeObject = this.results.recipe[this.listSelectedRecipeName];
      }
    },
    listSelectedRecipeObject() {
        this.processBlockDetailVisible = this.listSelectedRecipeObject !== null;
    },
  },
  computed: {},
  methods: {
    iconUrl(name){
      return urls.iconUrl(name)
    },
    async onGetResultButtonClick() {
      await this.refreshResult();
      await this.sendCalcInitRequest();
    },

    refreshResult() {
      this.conf.recipe_name = this.selectedRecipe;
      this.listSelectedIndex = null;
      this.listSelectedRecipeName = null;
      this.listSelectedRecipeObject = null;
      this.results = {};
      this.isAbleToVisualize = true;
    },

    sendCalcApiRequest(Form) {
      axios.post(apiUrl + "/calc", Form).then(resp => {
        this.results = resp.data;
        this.updateRecipeKeyList();
      });
    },

    async sendCalcInitRequest() {
      const initData = buildForm(this.conf, actionForm('initialize'));
      this.sendCalcApiRequest(initData);
    },

    async sendCalcMachineChangeRequest(recipeName, machineName) {
      const mcData = buildForm(this.conf, actionForm('change_machine', {'recipe_name': recipeName, 'machine_name': machineName}));
      this.sendCalcApiRequest(mcData);
    },

    visualizeNewWindow() {
      let toUrl = apiUrl + "/visualize/" + String(randID);
      // this.isAbleToVisualize = false;
      window.open(toUrl);
    },

    onAutoCompSelect(selectedRecipe) {
      this.selectedRecipe = selectedRecipe;
    },

    onEmitForm(onEmitForm) {
      this.conf.amount = onEmitForm.amount;
      this.selectedRecipe = onEmitForm.selectedRecipe;
      this.isTheFormValid = onEmitForm.isTheFormValid;
    },

    updateRecipeKeyList() {
      this.recipeKeyList = Object.keys(this.results.recipe);
    },
    onEmitChangedMachine(cm) {
      this.sendCalcMachineChangeRequest(cm.recipeName, cm.selectedMachineName);
    },
    onMainConfChanged(cc) {
      this.conf.use_kovarex = cc.useKovarex;
      this.conf.preferred_machine_list = cc.preferredMachines;
      this.conf.mining_research_modifier = cc.miningResearchModifier;
    }
  },
}
</script>

<style>
.hide-scroll-bar::-webkit-scrollbar {
  width: 6px;
}
.hide-scroll-bar::-webkit-scrollbar-thumb {
  height: 17%;
  background-color: rgb(187, 184, 184);
  border-radius: 15px;
  /*display: none; !* Chrome, Safari, Opera*!*/
}

</style>