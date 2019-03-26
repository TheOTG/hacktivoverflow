<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-7">
        <Answer v-for="(answer, index) in $store.state.myAnswers" 
            :key="index" 
            :answer="answer" 
            :my-answer="true" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Answer from '@/components/Answer.vue';

export default {
  name: 'MyAnswers',
  components: {
    Answer,
  },
  mounted() {
    this.$store.dispatch('getMyAnswers');
  },
};
</script>
