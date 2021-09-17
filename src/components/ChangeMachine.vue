<template>
  <v-menu
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
          elevation="0"
          @click="getAvailableMachineList"
      >
        <v-img
            max-width="24px"
            min-width="16px"
            max-height="24px"
            min-height="16px"
            :src="iconUrl(currentMachine)"
            class="pr-0"
        >
        </v-img>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="machine in availableMachineList"
          :key="machine"

      >
        <v-list-item-title
        align="center"
        >
          <v-img
              max-width="24px"
              min-width="16px"
              max-height="24px"
              min-height="16px"
              :src="iconUrl(machine)"
          >
          </v-img>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import urls from "@/domainNameAndUrls";
const apiUrl = urls.apiUrl;
const axios = require('axios');

export default {
  name: "ChangeMachine",
  props: {
    recipeName: String,
    currentMachine: String
  },
  data() {
    return {
      availableMachineList: [],
      selectedMachine: this.currentMachine
    }
  },
  watch: {

  },
  methods: {
    iconUrl(name){
      return urls.iconUrl(name)
    },
    getAvailableMachineList(){
      axios.get(apiUrl+'/available_machine_list/'+this.recipeName).then(
          resp => {
            this.availableMachineList = resp.data;
          }
      )
    }
  }
}
</script>

<style scoped>

</style>