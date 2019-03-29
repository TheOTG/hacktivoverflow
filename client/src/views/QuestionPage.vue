<template>
  <div style="min-height: 1000px;">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-7 p-0 mt-3 border-bottom">
          <div class="d-flex justify-content-between">
            <div class="" style="width: 70%; font-weight: 400; font-size: 24px;">
              {{ question.title }}
            </div>
            <!-- NEW QUESTION -->
            <router-link class="mt-auto mb-2" to="/questions/new">
              <button class="btn btn-primary">Ask Question</button>
            </router-link>
            <!------------------>
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
      <!--------------------- VOTES --------------------->
      <div class="row justify-content-center">
        <div class="col-7 p-0">
          <div class="d-flex">
            <div class="d-flex-column">
              <div v-if="question.upvotes">
                <i class="fas fa-caret-up fa-3x"
                   :style="`cursor: pointer; color: ${hasUpVoted() ? '#5cb85c' : ''};`"
                   @click.prevent="vote(question._id, 'upvote')">
                </i>
              </div>
              <div class="text-center" style="font-size: 20px;"
                  v-if="question.upvotes && question.downvotes">
                {{ question.upvotes.length - question.downvotes.length }}
              </div>
              <div v-if="question.downvotes">
                <i class="fas fa-caret-down fa-3x"
                   :style="`cursor: pointer; color: ${hasDownVoted() ? '#dc3545' : ''};`"
                   @click.prevent="vote(question._id, 'downvote')">
                </i>
              </div>
            </div>
            <div class="m-3" v-html="question.description"></div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-7 mt-3 p-0">
          <div class="d-flex">
            <div class="mr-1 mb-1 px-1 py-0 border rounded"
                 style="background-color: #e1ecf4;"
                 v-for="(tag, index) in question.tags" :key="index">
                <small>
                  <router-link class="nav-link p-0"
                               :to="`/questions/tagged/${tag}`">
                    {{ tag }}
                  </router-link>
                </small>
            </div>
          </div>
        </div>
      </div>
      <!------------------------------------------------>
      <div class="row justify-content-center">
        <div class="col-7 p-0 mt-2 border-bottom border-dark">
          <div class=""
               style="width: 70%; font-weight: 400; font-size: 22px;"
               v-if="question.answers">
            {{ question.answers.length }} Answers
          </div>
        </div>
      </div>
      <!--------- ANSWER COMPONENT ---------->
      <div v-if="question.answers">
        <div v-if="question.answers.length">
          <div class="row justify-content-center"
               v-for="(answer, index) in question.answers" :key="index">
            <div class="col-7 border-bottom border-dark p-0">
              <Answer @refreshQuestion="refreshQuestion($event)"
                      :answer="answer"
                      :question-owner="question.user" />
            </div>
          </div>
        </div>
      </div>
      <!------------------------------------->
      <!------------ ANSWER FORM ------------>
      <div class="row justify-content-center">
        <div class="col-7">
          <AnswerForm @refreshQuestion="refreshQuestion($event)" />
        </div>
      </div>
      <!------------------------------------->
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
  beforeMount() {
    this.question = this.$store.getters.getQuestionById(this.$route.params.id)[0];
    if(!this.question) {
      this.question = {};
      this.$router.push('/questions');
    } else {
      this.refreshQuestion(this.question);
    }
  },
  methods: {
    vote(id, type) {
      if(!this.$store.state.isLogin) {
        this.$router.push('/login');
      } else {
        this.$axios
          .put(`/question/${id}/vote`, {
            vote: type,
          }, {
            headers: {
              access_token: localStorage.access_token,
            },
          })
          .then(({ data }) => {
            this.question = data;
            this.refreshQuestion(this.question);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    hasUpVoted() {
      if(this.question.upvotes.indexOf(localStorage.userId) > -1) {
        return true;
      }
      return false;
    },
    hasDownVoted() {
      if(this.question.downvotes.indexOf(localStorage.userId) > -1) {
        return true;
      }
      return false;
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
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refreshQuestion(question) {
      this.question = question;
      this.$sortByAccepted(this.question);
    },
  },
};
</script>
