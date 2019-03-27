<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center">
        <div class="col-7">
          <div class="container-fluid">
            <div class="row justify-content-center align-items-center border-bottom border-dark">
              <div class="col">
                <h3>Search Results</h3>
                {{ $store.state.searchResult.length }} results
              </div>
              <div class="col-7">
                <router-link class="float-right my-2" to="/questions/new">
                  <button class="btn btn-primary">Ask Question</button>
                </router-link>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </div>
    <Question v-for="(question, index) in $store.state.searchResult" 
                :key="index" 
                :question="question" />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';

export default {
  name: 'SearchPage',
  components: {
    Question
  },
  beforeRouteUpdate(to, from, next) {
    const search = this.$store.getters.searchQuestion(to.query.q);
    this.$store.dispatch('getSearchResult', search);
    next();
  },
};
</script>
