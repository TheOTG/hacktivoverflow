<template>
  <div>
    <ListTemplate>
      <template v-slot:top>All Questions</template>
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
