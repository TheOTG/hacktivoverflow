<template>
  <QuestionForm ref="questionForm" />
</template>

<script>
// @ is an alias to /src
import QuestionForm from '@/components/QuestionForm.vue';

export default {
  name: 'NewQuestion',
  components: {
    QuestionForm
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
    } else {
      this.question = this.$store.getters.getQuestionById(this.$route.params.id)[0];
      this.$refs.questionForm.question = this.question;
    }
  },
};
</script>
