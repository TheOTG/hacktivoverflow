<template>
  <div class="container p-2 mt-5" style="min-height: 650px;">
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="newQuestion">
          <h3 class="text-center" v-if="isEdit">Edit Question</h3>
          <h3 class="text-center" v-else>Ask Something!</h3>
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
          <div class="form-group">
            <label>Tags</label>
            <div class="border rounded" style="overflow: inherit;">
              <input class="ml-3 mr-1" type="checkbox" value="javascript" v-model="question.tags">
              <label>javascript</label>
              <input class="ml-3 mr-1" type="checkbox" value="html" v-model="question.tags">
              <label>html</label>
              <input class="ml-3 mr-1" type="checkbox" value="css" v-model="question.tags">
              <label>css</label>
              <input class="ml-3 mr-1" type="checkbox" value="mongoose" v-model="question.tags">
              <label>mongoose</label>
              <input class="ml-3 mr-1" type="checkbox" value="mongodb" v-model="question.tags">
              <label>mongodb</label>
            </div>
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
        tags: [],
      },
      isLoading: false,
      errorMsg: null,
    };
  },
  beforeMount() {
    if(this.$route.params.id && this.isEdit) {
      let questionObj = this.$store.getters.getQuestionById(this.$route.params.id)[0];
      this.question = {
        title: questionObj.title,
        description: questionObj.description,
        tags: questionObj.tags,
      }
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
          tags: this.question.tags,
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
