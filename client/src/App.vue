<template>
  <div>
    <Navbar />
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
  mounted() {
    if(localStorage.access_token) {
      this.$store.dispatch('login', localStorage.name);
    }
    this.$store.dispatch('getQuestions');
  },
};
</script>

<style scoped>
  .view {
    margin-top: 70px;
  }
</style>
