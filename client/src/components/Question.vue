<template>
  <div class="container-fluid p-0">
    <div class="row no-gutters justify-content-center">
      <div class="col-7">
        <div class="d-flex flex-column border-bottom">
          <div class="d-flex flex-row">
            <div class="d-flex flex-column align-items-center mt-2 ml-4 mr-2"
                 :style="`color: ${(question.upvotes.length - question.downvotes.length) === 0 ?
                         '' : (question.upvotes.length - question.downvotes.length) > 0 ?
                         '#5cb85c' : '#dc3545'};`"
                 v-if="question.upvotes && question.downvotes">
              {{ question.upvotes.length - question.downvotes.length }}
              <small>
                votes
              </small>
            </div>
            <div class="d-flex flex-column align-items-center mt-2 ml-2 mr-2"
                 :style="`color: ${question.isAnswered ? '#5cb85c' : ''};`"
                 v-if="question.answers">
              {{ question.answers.length }}
              <small>
                answers
              </small>
            </div>
            <div class="container" style="min-height: 60px; min-width: 0;">
              <div class="row justify-content-start">
                <div class="col mt-1">
                  <router-link style="font-size: 18px; text-decoration: none; word-wrap: break-word;"
                               :to="`/questions/${question._id}`">
                    {{ question.title }}
                  </router-link>
                </div>
              </div>
              <div class="row">
                <div class="col align-self-end">
                  <div class="d-flex">
                    <div class="container-fluid">
                      <div class="row justify-content-start">
                        <div class="col-md-auto mr-1 mb-1 px-1 py-0 border rounded"
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
                </div>
                <div class="col align-self-end">
                  <div v-if="isUser" class="text-right">
                    <small>
                      <router-link :to="`/questions/${question._id}/edit`">
                        Edit
                      </router-link>
                        |
                      <a @click.prevent="deleteQuestion(question._id)" href="">
                        Delete
                      </a>
                    </small>
                  </div>
                  <small class="text-muted float-right">
                    asked {{ moment(question.createdAt).fromNow() }}
                    by {{ question.user.name }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Question',
  data() {
    return {
      moment,
    };
  },
  methods: {
    deleteQuestion(id) {
      this.$axios
        .delete(`/question/${id}`, {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then(() => {
          this.$store.dispatch('getQuestions');
        })
        .then(() => {
          this.$store.dispatch('getMyQuestions');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  props: ['question', 'isUser'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    background-color: rgb(255, 250, 198);
  }
</style>
