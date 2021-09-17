<template>
  <v-menu
      offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
          elevation="0"
          @click="onBtnClick"
      >
        <v-img
            max-width="24px"
            min-width="16px"
            max-height="24px"
            min-height="16px"
            :src="iconUrl(selectedMachineName)"
            class="pr-0"
        >
        </v-img>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group
          v-model="selectedMachineIndex"
          @change="emitMachineChanged"
          :mandatory="isMandatory"
      >
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
      </v-list-item-group>
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
      isMandatory: false,
      availableMachineList: null,
      selectedMachineIndex: null,
      selectedMachineName: this.currentMachine,
    }
  },
  watch: {
    selectedMachineIndex() {
      this.isMandatory = true;
      this.selectedMachineName = this.availableMachineList[this.selectedMachineIndex];
    },
    selectedMachineName() {
      this.$emit("onEmitChangedMachine", this.emitMachineChanged())
    }
  },
  methods: {
    iconUrl(name) {
      return urls.iconUrl(name)
    },
    async onBtnClick() {
      await this.getAvailableMachineList();
      this.selectedMachineIndex = this.availableMachineList.indexOf(this.selectedMachineName)
    },
    async getAvailableMachineList() {
      if (this.availableMachineList !== null) {return}
      await axios.get(apiUrl + '/available_machine_list/' + this.recipeName).then(
          resp => {
            this.availableMachineList = resp.data;
          }
      )
    },
    emitMachineChanged() {
      return {
        recipeName: this.recipeName,
        selectedMachineName: this.selectedMachineName
      }
    },
  }
}
</script>

<style scoped>

</style>