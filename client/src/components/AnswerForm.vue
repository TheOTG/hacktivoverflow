<template>
  <form @submit.prevent="newAnswer" class="mb-5">
    <div style="font-size: 24px;">Your Answer</div>
    <div class="form-group">
      <pre v-if="errorMsg" style="color: red; text-align: center;">{{ errorMsg }}</pre>
      <label>Title</label>
      <input type="text" 
             class="form-control" 
             placeholder="Title" 
             v-model="answer.title">
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="form-control" 
                placeholder="Description" 
                style="min-height: 250px;" 
                v-model="answer.description">
      </textarea>
    </div>
    <button v-if="!isLoading" 
            type="submit" 
            class="btn btn-primary w-100">Submit Answer
    </button>
    <div v-if="isLoading" class="d-flex justify-content-center">
      <div class="spinner-border text-primary"></div>
    </div>
  </form>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'AnswerForm',
  data() {
    return {
      answer: {
        title: '',
        description: '',
      },
      isLoading: false,
      errorMsg: null,
    }
  },
  mounted() {
    if(!this.$store.state.isLogin) {
      this.$router.push('/login');
    }
  },
  methods: {
    newAnswer() {
      this.isLoading = true;
      let edit = '';
      this.$axios
        .post(`/answer`, {
          title: this.answer.title,
          description: this.answer.description,
          question: this.$route.params.id,
        }, {
          headers: {
            access_token: localStorage.access_token,
          }
        })
        .then(({ data }) => {
          return this.$axios
            .put(`/question/${this.$route.params.id}/addAnswer`, {
              answer: data._id,
            }, {
              headers: {
                access_token: localStorage.access_token,
              }
            })
        })
        .then(({ data }) => {
          if(edit) {
            this.$swal('Question successfully edited!', 
                       '', 
                       'success');
          } else {
            this.$swal('Thank you for answering!', 
                       'Hopefully it will help the asker fix the problem.', 
                       'success');
          }
          this.answer.title = '';
          this.answer.description = '';
          this.$emit('refreshQuestion', data);
        })
        .catch(err => {
          const errors = err.response.data.errors;
          this.errorMsg = [];
          for(let key in errors) {
            this.errorMsg.push(errors[key].message);
          }
          this.errorMsg = this.errorMsg.join('\n');
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
};
</script>
