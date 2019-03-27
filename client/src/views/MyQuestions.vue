<template>
  <div>
    <ListTemplate>
      <template v-slot:top>My Questions</template>
      <template v-slot:resultLength>
        {{ $store.state.myQuestions.length }} questions
      </template>
      <template v-slot:emptyResult>
        <div class="row align-items-center mt-3">
          <div class="col-7">
            <div v-if="!$store.state.myQuestions.length">
              <h3>You don't have any questions right now.</h3>
            </div>
          </div>
        </div>
      </template>
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
  mounted() {
    if(this.$store.state.isLogin) {
      this.$store.dispatch('getMyQuestions');
    } else {
      this.$router.push('/login');
    }
  },
};
</script>
