<template>
  <v-app>
    <v-main>
      <CalcMain />
    </v-main>
  </v-app>
</template>

<script>
import CalcMain from "@/components/CalcMain";
export default {
  name: 'App',
  components: {
    CalcMain
  },
};
</script>
