<template>
  <v-card
  >
    <v-container>
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
              :src="`https://cdn.privatelaw.net/icons/`+SelectedRecipeInfo.name+`.png`"
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
                :src="`https://cdn.privatelaw.net/icons/`+SelectedRecipeInfo.machine_name+`.png`"
            >
            </v-img>
          </v-btn>
        </v-col>
        <v-col

        >
          <p>
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
export default {
  name: "ProcessBlockDetail",
  props: {
    SelectedRecipeInfo: Object
  },
}
</script>

<style scoped>

</style>