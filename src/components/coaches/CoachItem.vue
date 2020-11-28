<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="coachContactLink">Contact</base-button>
      <base-button link :to="coachDetailLink">View Details</base-button>
    </div>
  </li>
</template>
<script>
export default {
  props: ["id", "firstName", "lastName", "rate", "areas"], //用小駝峰，父物件使用時，firstName會自動轉換成first-name
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + "/" + this.id + "/contact"; //     coaches/:id/contact
    },
    coachDetailLink() {
      return this.$route.path + "/" + this.id; //             coaches/:id
    },
  },
};
</script>
<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
