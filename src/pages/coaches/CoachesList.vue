<template>
  <div>
    <base-dialog :show="!!error" title="Error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedin"
            >Login to Register as a Coach</base-button
          >
          <base-button v-if="isLoggedin && !isCoach && !isLoading" :link="true" to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </coach-item>
        </ul>
        <h3 v-else>No Coach Found...</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedin() {
      return this.$store.getters.isAuthenticated;
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"]; //第一個coaches是namespaced 第二個是getter name
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          //Array.prototype.includes()方法會判斷陣列是否包含特定的元素，並以此來回傳 true 或 false。
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      //updatedFilters是隨著emit一起的props，listen to change-filter will get this props
      this.activeFilters = updatedFilters;
    },
    loadCoaches(refresh = false) {
      //default false不強制刷新
      this.isLoading = true;
      this.$store
        .dispatch("coaches/loadCoaches", { forceRefresh: refresh })
        .then(() => {
          // console.log(".then() in dispatch() happen...");
          // console.log(this.isLoading);
          this.isLoading = false;
        })
        .catch((err) => {
          this.error = err || "loadCoaches dispatch error occurred.";
        });
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
