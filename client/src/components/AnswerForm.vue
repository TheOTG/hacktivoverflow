<template>
  <form @submit.prevent="isEdit ? editAnswer() : newAnswer()" 
        class="mb-5">
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
      <ckeditor class="form-control"
                :editor="editor"
                :config="editorConfig"
                v-model="answer.description">
      </ckeditor>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'AnswerForm',
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
      answer: {
        title: '',
        description: '',
      },
      isLoading: false,
      errorMsg: null,
    };
  },
  beforeMount() {
    if(this.$route.params.id && this.isEdit && this.$store.state.isLogin) {
      this.answer = this.$store.getters.getAnswerById(this.$route.params.id)[0];
    }
  },
  methods: {
    newAnswer() {
      if(this.$store.state.isLogin) {
        this.isLoading = true;
        this.$axios
          .post('/answer', {
            title: this.answer.title,
            description: this.answer.description,
            question: this.$route.params.id,
          }, {
            headers: {
              access_token: localStorage.access_token,
            },
          })
          .then(({ data }) => {
            return this.$axios
              .put(`/question/${this.$route.params.id}/addAnswer`, {
                answer: data._id,
              }, {
                headers: {
                  access_token: localStorage.access_token,
                },
              });
          })
          .then(({ data }) => {
            this.$swal('Thank you for answering!',
                       'Hopefully it will help fix the problem.',
                       'success');
            this.answer.title = '';
            this.answer.description = '';
            this.$emit('refreshQuestion', data);
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
      } else {
        this.$router.push('/login');
      }
    },
    editAnswer() {
      if(this.$store.state.isLogin) {
        this.isLoading = true;
        this.$axios
          .put(`/answer/${this.$route.params.id}`, {
            title: this.title,
            description: this.description,
          }, {
            headers: {
              access_token: localStorage.access_token,
            },
          })
          .then(({ data }) => {
            this.$swal('Answer successfully edited!',
                       'Your answer should be more informative now.',
                       'success');
            this.answer.title = '';
            this.answer.description = '';
            this.$router.go(-1);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.$router.push('/login');
      }
    },
  },
  props: ['isEdit'],
};
</script>
