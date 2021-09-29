<template>
  <v-dialog
      v-model="dialogEnabled"
      max-width="400"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
          v-on="on"
          v-bind="attrs"
      >
        <v-icon>
          settings
        </v-icon>
      </v-btn>
    </template>
    <v-card
    >
      <v-card-title
          dense
      >
        Config
      </v-card-title>
      <v-card-text>
        <v-divider/>
        <v-row
            class="flex-nowrap hide-scroll-bar"
        >
          <v-col
              class="mt-4"
              cols="auto"
          >
            Enable Kovarex Enrichment Process
          </v-col>
          <v-spacer/>
          <v-col
              cols="auto"
          >
            <v-checkbox
                color="dark-grey"
                dense
                class="mt-4 pa-0"
                v-model="kovarexEnabled"
            />
          </v-col>
        </v-row>
        <v-divider/>
        <v-row
            class="flex-nowrap hide-scroll-bar"
        >
          <v-col
              cols="auto"
              class="mt-4"
          >
            Mining Research modifier (%)
          </v-col>
          <v-spacer/>
          <v-col
              cols="4"
              align-self="center"
              class="mb-1 pb-1"
          >
            <v-text-field
                dense
                class="mr-text-field mt-4 mb-0 pa-0"
                solo-inverted
                v-model="miningResearchModifier"
                label="Mining Research modifier (%)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row
            class="flex-nowrap hide-scroll-bar"
        >
          <v-col
              cols="auto"
              class="mt-4"
          >
            Preferred Factories
          </v-col>
          <v-spacer/>
          <v-col
              class="mt-4"
          >
            <machine-group
                @selectedMachineChange="preferredMachineChanged"
                :machine-list="machineLists.assemblingMachine"
            />

            <machine-group
                @selectedMachineChange="preferredMachineChanged"
                :machine-list="machineLists.furnace"
            />
            <machine-group
                @selectedMachineChange="preferredMachineChanged"
                :machine-list="machineLists.drill"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions
      >
        <v-spacer/>
        <v-btn
            text
            @click="dialogEnabled = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import urls from "@/domainNameAndUrls";
import MachineGroup from "@/components/MachineGroup";

export default {
  name: "MainConf",
  components: {MachineGroup},
  data() {
    return {
      dialogEnabled: false,
      kovarexEnabled: true,
      selectedMachineName: null,
      machineLists: {
        assemblingMachine: ["assembling-machine-1", "assembling-machine-2", "assembling-machine-3"],
        furnace: ["stone-furnace", "steel-furnace", "electric-furnace"],
        drill: ["burner-mining-drill", "electric-mining-drill"],
      },
      miningResearchModifier: 0,
      preferredMachines: {
        "assemblingMachine": null,
        "furnace": null,
        "drill": null,
      },
      preferredMachinesArr: []
    }
  },
  watch: {
    selectedMachineName(val) {
      for (const category in this.machineLists) {
        if (this.machineLists[category].includes(val)) {
          this.preferredMachines[category] = val;
          this.preferredMachinesArr = [this.preferredMachines.assemblingMachine, this.preferredMachines.furnace, this.preferredMachines.drill];
          break;
        }
      }
    },
    kovarexEnabled() {
      this.emitThings();
    },
    preferredMachinesArr() {
      this.emitThings();
    },
    miningResearchModifier() {
      this.emitThings();
    }
  },

  methods: {
    iconUrl(name) {
      return urls.iconUrl(name)
    },
    preferredMachineChanged(cm) {
      this.selectedMachineName = cm;
    },
    emitThings() {
      this.$emit("confChanged", {
        preferredMachines: this.preferredMachinesArr,
        useKovarex: this.kovarexEnabled,
        miningResearchModifier: this.miningResearchModifier / 100,
      })
    }
  }
}

</script>

<style scoped>
.mr-text-field >>> input {
  text-align: center;
}

</style>