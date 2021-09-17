<template>
  <v-card
      class="pr-7"
  >
    <v-container
    >
      <v-row
      >
        <v-col
            cols="auto"
            class="ml-3 mb-0 pb-0"
        >
          <v-img
              class="ma-1"
              max-width="32px"
              min-width="32px"
              max-height="32px"
              min-height="32px"
              :src="iconUrl(SelectedRecipeInfo.name)"
          >
          </v-img>
        </v-col>
        <v-col
            class="mb-0 pb-0"
        >
          <p class="text-h6 mt-1 text--primary">
            {{ SelectedRecipeInfo.name }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            class="ml-8"
            cols="auto"
        >
          <v-btn
            class="mt-1"
          >
            <v-img
                max-width="24px"
                min-width="24px"
                max-height="24px"
                min-height="24px"
                :src="iconUrl(SelectedRecipeInfo.machine_name)"
            >
            </v-img>
          </v-btn>
        </v-col>
        <v-col
          class="pr-0"
        >
          <p
            style="word-break: break-all;"
          >
            <b>Factory Name</b> : {{ SelectedRecipeInfo.machine_name }} <br>
            <b>Factory Amount</b> : {{ SelectedRecipeInfo.amount_factory_required }} <br>
            <b>Added Modules</b> : <br>
            <b>Speed Rate</b> : {{ SelectedRecipeInfo.speed_rate }} <br>
            <b>Base Speed Rate</b> : {{ SelectedRecipeInfo.base_speed_rate }} <br>
            <b>Total Power Consumption</b> : {{ SelectedRecipeInfo.total_power_consumption }} <br>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import urls from "@/domainNameAndUrls";

export default {
  name: "ProcessBlockDetail",
  props: {
    SelectedRecipeInfo: Object
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