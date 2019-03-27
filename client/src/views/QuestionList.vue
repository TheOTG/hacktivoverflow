<template>
  <div>
    <ListTemplate>
      <template v-slot:top>All Questions</template>
      <template v-slot:resultLength>
        {{ $store.state.questions.length }} questions
      </template>
      <template v-slot:emptyResult>
        <div class="row align-items-center mt-3">
          <div class="col-7">
            <div v-if="!$store.state.questions.length">
              <h3>There is no questions being asked right now.</h3>
            </div>
          </div>
        </div>
      </template>
    </ListTemplate>
    <Question v-for="(question, index) in $store.state.questions"
                :key="index"
                :question="question" />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import ListTemplate from '@/components/ListTemplate.vue';

export default {
  name: 'QuestionList',
  components: {
    Question,
    ListTemplate,
  },
};
</script>
