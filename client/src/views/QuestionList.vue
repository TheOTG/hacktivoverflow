<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-7">
          <router-link class="float-right my-2" to="/questions/new">
            <button class="btn btn-primary">Ask Question</button>
          </router-link>
        </div>
      </div>
    </div>
    <Question v-for="(question, index) in $store.state.questions" 
              :key="index" 
              :question="question" />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';

export default {
  name: 'QuestionList',
  components: {
    Question,
  },
  mounted() {
    this.$store.dispatch('getQuestions');
  },
};
</script>
