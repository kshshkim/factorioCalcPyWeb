<template>
  <v-form
  ref="form"
  >
    <autocomp @onAutoCompSelect="onAutoCompSelect"/>
    <v-text-field
    v-model="amount"
    :label="`Amount`"
    >

    </v-text-field>

    <v-text-field
    v-model="miningResearchModifier"
    :label="`Mining Research modifier`"
    >

    </v-text-field>
  </v-form>

</template>

<script>
import autocomp from "@/components/autocomp";

export default {
  name: "modifierForms",

  components:{
    autocomp
  },

  data() {
    return {
      isTheFormValid: false,

      selectedRecipe: null,
      amount: 1,
      miningResearchModifier: 0,

    }
  },

  watch: {
    amount(){
      this.validateForm();
      this.$emit("onEmitThings",this.onEmitThings());
    },
    miningResearchModifier(){
      this.validateForm();
      this.$emit("onEmitThings",this.onEmitThings());
    },
    selectedRecipe(){
      this.validateForm();
      this.$emit("onEmitThings",this.onEmitThings());
    },


  },

  methods: {
    validateForm(){
      if(isNaN(this.amount) === false && this.amount !== '' && isNaN(this.miningResearchModifier) === false && this.miningResearchModifier !== '' && this.selectedRecipe !== null){
        this.isTheFormValid = true;
      } else {
        this.isTheFormValid = false;
      }
    },

    onAutoCompSelect(selectedRecipe){
      console.log('hi');
      this.selectedRecipe = selectedRecipe;
      console.log(selectedRecipe);
    },

    onEmitThings(){
      return {
        isTheFormValid: this.isTheFormValid,
        amount: this.amount,
        miningResearchModifier: this.miningResearchModifier,
        selectedRecipe: this.selectedRecipe
      }
    }

  },

}
</script>

<style scoped>

</style>