<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>
<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
export default {
  components: {
    CoachForm,
  },

  methods: {
    saveData(formData) {
      this.$store.dispatch("coaches/registerCoach", formData);
      this.$router.replace("/coaches"); //跟this.$router.push一樣都會導向新route，不同的是，replace無法上一頁
    },
  },
};
</script>
