<template>
  <v-menu offset-y>
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
            :src="`https://cdn.privatelaw.net/icons/`+currentMachine+`.png`"
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
        <v-img
            max-width="24px"
            min-width="16px"
            max-height="24px"
            min-height="16px"
            :src="`https://cdn.privatelaw.net/icons/`+machine+`.png`"
            class="pr-0"
        >
        </v-img>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
const axios = require('axios');
const apiUrl = "https://a.privatelaw.net";

export default {
  name: "ChangeMachine",
  props: {
    recipeName: String,
    currentMachine: String
  },
  data() {
    return {
      availableMachineList: [],
    }
  },
  watch: {

  },
  methods: {
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