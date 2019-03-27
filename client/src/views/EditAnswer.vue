<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <AnswerForm :is-edit="true" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AnswerForm from '@/components/AnswerForm.vue';

export default {
  name: 'EditAnswer',
  components: {
    AnswerForm,
  },
  mounted() {
    if(!this.$store.state.isLogin) {
      this.$router.push('/login');
    }
  },
};
</script>
