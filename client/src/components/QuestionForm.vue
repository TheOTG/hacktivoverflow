<template>
  <div class="container p-2 mt-5" style="min-height: 650px;">
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="newQuestion">
          <h3 class="text-center">Ask Something!</h3>
          <div class="form-group">
            <pre v-if="errorMsg" style="color: red; text-align: center;">{{ errorMsg }}</pre>
            <label>Title</label>
            <input type="text" 
                   class="form-control" 
                   placeholder="Title" 
                   v-model="question.title">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" 
                      placeholder="Description" 
                      style="min-height: 250px;" 
                      v-model="question.description">
            </textarea>
          </div>
          <button v-if="!isLoading" 
                  type="submit" 
                  class="btn btn-primary w-100">
            Submit Question
          </button>
          <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border text-primary"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'QuestionForm',
  data() {
    return {
      question: {
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
    newQuestion() {
      this.isLoading = true;
      let edit = '';
      let method = 'post';
      if(this.$route.params.id) {
        edit = `/${this.$route.params.id}`;
        method = 'put';
      }
      this.$axios
        [method](`/question${edit}`, {
          title: this.question.title,
          description: this.question.description,
        }, {
          headers: {
            access_token: localStorage.access_token,
          }
        })
        .then(({ data }) => {
          if(edit) {
            this.$swal('Question successfully edited!', 
                       '', 
                       'success');
          } else {
            this.$swal('Thank you for asking!', 
                       'Your question will be answered by other users soon.', 
                       'success');
          }
          this.$router.push(`/questions`);
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
        })
    }
  },
};
</script>
