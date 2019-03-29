<template>
  <form @submit.prevent="isEdit ? editAnswer() : newAnswer()" 
        class="mb-5">
    <div style="font-size: 24px;" v-if="!isEdit">Your Answer</div>
    <div style="font-size: 24px;" v-if="isEdit">Edit Answer</div>
    <div v-if="isEdit">
      Question: 
      <router-link :to="`/questions/${answer.question._id}`">{{ answer.question.title }}</router-link>
    </div>
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
    if(this.$route.params.id && this.isEdit) {
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
            title: this.answer.title,
            description: this.answer.description,
          }, {
            headers: {
              access_token: localStorage.access_token,
            },
          })
          .then(({ data }) => {
            let questions = this.$store.state.questions;
            this.$swal('Answer successfully edited!',
                       'Your answer should be more informative now.',
                       'success');
            for(let i = 0; i < questions.length; i++) {
              if(questions[i]._id.toString() === data.question._id.toString()) {
                questions[i] = data.question;
                this.$store.dispatch('directSet', questions);
                break;
              }
            }
            this.$router.push(`/questions/${data.question._id}`);
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
