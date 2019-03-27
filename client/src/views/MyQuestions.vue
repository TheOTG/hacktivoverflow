<template>
  <div v-if="$store.state.isLogin">
    <ListTemplate>
      <template v-slot:top>My Questions</template>
    </ListTemplate>
    <Question v-for="(question, index) in $store.state.myQuestions"
              :key="index"
              :question="question"
              :is-user="true" />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import ListTemplate from '@/components/ListTemplate.vue';

export default {
  name: 'MyQuestions',
  components: {
    Question,
    ListTemplate,
  },
  beforeMount() {
    if(this.$store.state.isLogin) {
      this.$store.dispatch('getMyQuestions');
    } else {
      this.$router.push('/login');
    }
  },
};
</script>
