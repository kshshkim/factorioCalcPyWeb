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
      <v-card-title>
        Config
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
              class="my-0 py-3"
          >
            <v-checkbox
                v-model="kovarexEnabled"
                label="Enable Kovarex Enrichment Process"
            />
            <v-row><v-divider horizontal/></v-row>
            <v-row><v-col><div
            class="subtitle-1"
            >Preferred Factories</div></v-col></v-row>
            <v-row>
              <v-col
                  class="py-0 my-1"
              >
                <machine-group
                    @selectedMachineChange="preferredMachineChanged"

                    :machine-list="machineLists.assemblingMachine"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  class="py-0 my-1"
              >
                <machine-group
                    @selectedMachineChange="preferredMachineChanged"
                  :machine-list="machineLists.furnace"
                  />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  class="py-0 my-1"
              >
                <machine-group
                    @selectedMachineChange="preferredMachineChanged"

                    :machine-list="machineLists.drill"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
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
    kovarexEnabled(){
      this.emitThings();
    },
    preferredMachinesArr() {
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
    emitThings(){
      this.$emit("confChanged", {
        preferredMachines: this.preferredMachinesArr,
        useKovarex: this.kovarexEnabled
      })
    }
  }
}

</script>

<style scoped>
</style>