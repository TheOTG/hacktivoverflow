<template>
  <div>
    <ListTemplate>
      <template v-slot:top>Questions tagged [{{ $route.params.tag }}]</template>
      <template v-slot:resultLength>
        {{ $store.state.taggedQuestions.length }} questions
      </template>
      <template v-slot:emptyResult>
        <div class="row align-items-center mt-3">
          <div class="col">
            <div v-if="!$store.state.taggedQuestions.length">
              <p>There are no questions with tag [{{ $route.params.tag }}]</p>
              <p>Suggestions:</p>
              <ul>
                <li>Try fewer keywords</li>
                <li>Try different keywords</li>
                <li>Try nore general keywords</li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </ListTemplate>
    <Question v-for="(question, index) in $store.state.taggedQuestions"
                :key="index"
                :question="question" />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import ListTemplate from '@/components/ListTemplate.vue';

export default {
  name: 'TaggedQuestionList',
  components: {
    Question,
    ListTemplate,
  },
  beforeRouteUpdate(to, from, next) {
    const tag = this.$store.getters.findTag(to.params.tag);
    this.$store.dispatch('getTaggedQuestions', tag);
    next();
  },
  mounted() {
    const tag = this.$store.getters.findTag(this.$route.params.tag);
    this.$store.dispatch('getTaggedQuestions', tag);
    this.$store.dispatch('isTitleSearch');
  },
  beforeDestroy() {
    this.$store.dispatch('isTitleSearch');
  }
};
</script>
