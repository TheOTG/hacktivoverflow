<template>
  <div>
    <ListTemplate>
      <template v-slot:top>My Answers</template>
      <template v-slot:resultLength>
        {{ $store.state.myAnswers.length }} answers
      </template>
    </ListTemplate>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-7">
          <Answer v-for="(answer, index) in $store.state.myAnswers"
            :key="index"
            :answer="answer"
            :my-answer="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Answer from '@/components/Answer.vue';
import ListTemplate from '@/components/ListTemplate.vue';

export default {
  name: 'MyAnswers',
  components: {
    Answer,
    ListTemplate,
  },
  mounted() {
    if(this.$store.state.isLogin) {
      this.$store.dispatch('getMyAnswers');
    } else {
      this.$router.push('/login');
    }
  },
};
</script>
