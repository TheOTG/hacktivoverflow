<template>
  <div>
    <ListTemplate>
      <template v-slot:top>
        Search Results
      </template>
      <template v-slot:searchResultLength>
        {{ $store.state.searchResult.length }} results
      </template>
      <template v-slot:emptySearch>
        <div class="row align-items-center mt-3">
          <div class="col-7">
            <div v-if="!$store.state.searchResult.length">
              <p>Your search returned no matches.</p>
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
    <Question v-for="(question, index) in $store.state.searchResult"
                :key="index"
                :question="question" />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';
import ListTemplate from '@/components/ListTemplate.vue';

export default {
  name: 'SearchPage',
  components: {
    Question,
    ListTemplate,
  },
  beforeRouteUpdate(to, from, next) {
    const search = this.$store.getters.searchQuestion(to.query.q);
    this.$store.dispatch('getSearchResult', search);
    next();
  },
  mounted() {
    const search = this.$store.getters.searchQuestion(this.$route.query.q);
    this.$store.dispatch('getSearchResult', search);
  },
};
</script>
