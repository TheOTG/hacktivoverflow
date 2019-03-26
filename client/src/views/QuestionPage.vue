<template>
  <div style="min-height: 1000px;">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-7 p-0 mt-3 border-bottom">
          <div class="d-flex justify-content-between">
            <div class="" style="width: 70%; font-weight: 400; font-size: 24px;">
              {{ question.title }}
            </div>
            <router-link class="mt-auto mb-2" to="/questions/new">
              <button class="btn btn-primary">Ask Question</button>
            </router-link>
          </div>
          <small class="text-muted mt-auto" 
                 v-if="question.user">
            asked by {{ question.user.name }} {{ moment(question.createdAt).fromNow() }}
            <div class="float-right" v-if="isOwner(question.user._id)">
              <router-link :to="`/questions/${question._id}/edit`">
                Edit
              </router-link> 
                | 
              <a @click.prevent="deleteQuestion(question._id)" href="">
                Delete
              </a>
            </div>
          </small>
          
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-7 p-0">
          <div class="d-flex">
            <div class="d-flex-column">
              <div class="">
                <i class="fas fa-caret-up fa-3x" 
                   style="cursor: pointer;" 
                   @click.prevent="vote(question._id, 'upvote')">
                </i>
              </div>
              <div class="text-center" style="font-size: 20px;" 
                  v-if="question.upvotes && question.downvotes">
                {{ question.upvotes.length - question.downvotes.length }}
              </div>
              <div class="">
                <i class="fas fa-caret-down fa-3x" 
                   style="cursor: pointer;" 
                   @click.prevent="vote(question._id, 'downvote')">
                </i>
              </div>
            </div>
            <div class="m-3" style="white-space: pre-wrap;">{{ question.description }}</div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-7 p-0 mt-3 border-bottom">
          <div class=""
               style="width: 70%; font-weight: 400; font-size: 22px;" 
               v-if="question.answers">
            {{ question.answers.length }} Answers
          </div>
        </div>
      </div>
      <div v-if="question.answers">
        <div v-if="question.answers.length">
          <div class="row justify-content-center" 
               v-for="(answer, index) in question.answers" :key="index">
            <div class="col-7 p-0">
              <Answer @refreshQuestion="question = $event" :answer="answer" />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-7">
          <AnswerForm @refreshQuestion="question = $event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Answer from '@/components/Answer.vue';
import AnswerForm from '@/components/AnswerForm.vue';
import moment from 'moment';

export default {
  name: 'QuestionPage',
  components: {
    Answer,
    AnswerForm,
  },
  data() {
    return {
      question: {},
      moment,
    };
  },
  mounted() {
    this.question = this.$store.getters.getQuestionById(this.$route.params.id)[0];
  },
  methods: {
    refreshQuestion() {
      this.$store.dispatch('getQuestions');
    },
    vote(id, type) {
      let path = null;
      let hasVoted = false;
      if(this.hasUpVoted(localStorage.userId)) {
        path = 'cancelUpvote'
      } else if(this.hasDownVoted(localStorage.userId)) {
        path = 'cancelDownvote'
      }
      if(path) {
        this.$axios
          .put(`question/${id}/${path}`, {}, {
            headers: {
              access_token: localStorage.access_token,
            },
          })
          .then(({ data }) => {
            this.question = data;
            if(path.search(new RegExp(type, 'i')) === -1) {
              if(type === 'upvote') {
                this.upvote(id);
              } else {
                this.downvote(id);
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        eval(`this.${type}(id)`);
      }
    },
    upvote(id) {
      this.$axios
        .put(`/question/${id}/upvote`, {}, {
          headers: {
            access_token: localStorage.access_token,
          }
        })
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvote(id) {
      this.$axios
        .put(`/question/${id}/downvote`, {}, {
          headers: {
            access_token: localStorage.access_token,
          }
        })
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    hasUpVoted(id) {
      if(this.question.upvotes.indexOf(id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    hasDownVoted(id) {
      if(this.question.downvotes.indexOf(id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    isOwner(id) {
      if(localStorage.userId === id) {
        return true;
      }
      return false;
    },
    deleteQuestion(id) {
      this.$axios
        .delete(`/question/${id}`, {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then(() => {
          return this.$store.dispatch('getQuestions');
        })
        .then(() => {
          this.$store.dispatch('getMyQuestions');
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>
