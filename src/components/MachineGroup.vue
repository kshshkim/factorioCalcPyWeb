<template>
  <v-btn-toggle
      exclusive
      v-model="selected"
  >
    <v-btn
        v-for="mc in machineList"
        :key="mc"
    >
      <v-img
          max-width="24px"
          min-width="16px"
          max-height="24px"
          min-height="16px"
          :src="iconUrl(mc)"
          class="pa-0 ma-0"
      >
      </v-img>
    </v-btn>
  </v-btn-toggle>

</template>

<script>
import urls from "@/domainNameAndUrls";

export default {
  name: "MachineGroup",
  props: {
    machineList: Array,
  },
  data() {
    return {
      machines: this.machineList,
      selected: null
    }
  },
  watch: {
    selected() {
      this.$emit("selectedMachineChange", this.machines[this.selected])
    }
  },
  methods: {
    iconUrl(name) {
      return urls.iconUrl(name)
    }
  }

}
</script>

<style scoped>

</style>