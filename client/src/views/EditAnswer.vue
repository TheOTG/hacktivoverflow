<template>
  <AnswerForm ref="answerForm" />
</template>

<script>
// @ is an alias to /src
import AnswerForm from '@/components/AnswerForm.vue';

export default {
  name: 'NewQuestion',
  components: {
    AnswerForm
  },
  data() {
    return {
      answer: {
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
