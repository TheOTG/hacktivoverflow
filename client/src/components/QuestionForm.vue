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
            <ckeditor class="form-control"
              :editor="editor"
              :config="editorConfig"
              v-model="question.description">
            </ckeditor>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'QuestionForm',
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
        ],
        placeholder: 'Description',
      },
      question: {
        title: '',
        description: '',
      },
      isLoading: false,
      errorMsg: null,
    };
  },
  beforeMount() {
    if(this.$route.params.id && this.isEdit) {
      this.question = this.$store.getters.getQuestionById(this.$route.params.id)[0];
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
          },
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
          this.$store.dispatch('getQuestions');
          if(this.isEdit) {
            this.$router.push(`/questions/${data._id}`);
          } else {
            this.$router.push('/questions/mylist');
          }
        })
        .catch((err) => {
          const { errors } = err.response.data;
          this.errorMsg = [];
          for (const key in errors) {
            this.errorMsg.push(errors[key].message);
          }
          this.errorMsg = this.errorMsg.join('\n');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  props: ['isEdit'],
};
</script>
