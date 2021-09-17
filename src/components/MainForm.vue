<template>
  <v-row>
    <v-col>
      <v-form
          ref="form"
      >
        <RecipeSelector @onAutoCompSelect="onAutoCompSelect"/>
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
    </v-col>
  </v-row>
</template>

<script>
import RecipeSelector from "@/components/RecipeSelector";

export default {
  name: "MainForm",

  components: {
    RecipeSelector
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
    amount() {
      this.validateForm();
      this.$emit("onEmitForm", this.onEmitForm());
    },
    miningResearchModifier() {
      this.validateForm();
      this.$emit("onEmitForm", this.onEmitForm());
    },
    selectedRecipe() {
      this.validateForm();
      this.$emit("onEmitForm", this.onEmitForm());
    },


  },

  methods: {
    validateForm() {
      if (isNaN(this.amount) === false && this.amount !== '' && isNaN(this.miningResearchModifier) === false && this.miningResearchModifier !== '' && this.selectedRecipe !== null) {
        this.isTheFormValid = true;
      } else {
        this.isTheFormValid = false;
      }
    },

    onAutoCompSelect(selectedRecipe) {
      this.selectedRecipe = selectedRecipe;
    },

    onEmitForm() {
      return {
        isTheFormValid: this.isTheFormValid,
        amount: Number(this.amount),
        miningResearchModifier: Number(this.miningResearchModifier),
        selectedRecipe: this.selectedRecipe
      }
    }

  },

}
</script>

<style scoped>

</style>