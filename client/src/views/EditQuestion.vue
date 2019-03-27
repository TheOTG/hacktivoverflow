<template>
  <QuestionForm :is-edit="true" />
</template>

<script>
// @ is an alias to /src
import QuestionForm from '@/components/QuestionForm.vue';

export default {
  name: 'NewQuestion',
  components: {
    QuestionForm,
  },
  data() {
    return {
      question: {
        title: '',
        description: '',
      },
    };
  },
  mounted() {
    if(!this.$store.state.isLogin) {
      this.$router.push('/login');
    }
  },
};
</script>
