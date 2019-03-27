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
  beforeCreate() {
    this.$store.dispatch('getQuestions');
    if(this.$store.state.isLogin) {
      this.$store.dispatch('getMyAnswers');
    }
  },
  mounted() {
    if(localStorage.access_token) {
      this.$store.dispatch('login', localStorage.name);
    }
  },
};
</script>

<style scoped>
  .view {
    margin-top: 70px;
  }
</style>
