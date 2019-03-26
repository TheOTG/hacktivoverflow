<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col border-bottom p-0 mt-3">
          <div class="d-flex flex-column">
            <div style="width: 70%; font-weight: 400; font-size: 18px;">
              {{ answer.title }}
            </div>
            <small class="text-muted mt-auto" v-if="answer.user">
              answered by {{ answer.user.name }} {{ moment(answer.createdAt).fromNow() }}
              <div class="float-right" v-if="isOwner(answer.user._id)">
                <router-link :to="`/myanswers/${answer._id}/edit`">
                  Edit
                </router-link>
              </div>
            </small>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col p-0">
          <div class="d-flex">
            <div class="d-flex-column">
              <div>
                <i class="fas fa-caret-up fa-3x" 
                   :style="`cursor: pointer; color: ${hasUpVoted() ? '#5cb85c' : ''};`" 
                   @click.prevent="vote(answer._id, 'upvote')">
                </i>
              </div>
              <div class="text-center" 
                   style="font-size: 20px;" 
                   v-if="answer.upvotes && answer.downvotes">
                {{ answer.upvotes.length - answer.downvotes.length }}
              </div>
              <div>
                <i class="fas fa-caret-down fa-3x" 
                   :style="`cursor: pointer; color: ${hasDownVoted() ? '#dc3545' : ''};`" 
                   @click.prevent="vote(answer._id, 'downvote')">
                </i>
              </div>
              <div class="text-center mb-2" 
                   style="color: #45a163;" 
                   v-if="answer.isAccepted">
                <i class="fas fa-check fa-2x"></i>
              </div>
            </div>
            <div class="m-3" v-html="answer.description"></div>
          </div>
        </div>
      </div>
      <div class="row border-bottom justify-content-end">
        <div class="col mb-1 p-0" v-if="myAnswer">
          Question: 
          <router-link :to="`/questions/${answer.question._id}`">
            {{ answer.question.title }}
          </router-link>
        </div>
        <div v-if="questionOwner && !answer.isAccepted && !$parent.question.isAnswered">
          <div class="col mb-1 p-0" 
               style="text-align: right;" 
               v-if="isOwner(questionOwner._id)">
            <button @click.prevent="acceptAnswer" 
                    class="btn btn-success">
              Accept Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';

export default {
  name: 'Answer',
  data() {
    return {
      moment,
    };
  },
  methods: {
    vote(id, type) {
      let path = null;
      let hasVoted = false;
      if(this.hasUpVoted()) {
        path = 'cancelUpvote';
      } else if(this.hasDownVoted()) {
        path = 'cancelDownvote';
      }
      if(path) {
        this.$axios
          .put(`/answer/${id}/${path}`, {}, {
            headers: {
              access_token: localStorage.access_token,
            },
          })
          .then(({ data }) => {
            if(path.search(new RegExp(type, 'i')) === -1) {
              if(type === 'upvote') {
                this.upvote(id);
              } else {
                this.downvote(id);
              }
            } else {
              this.$emit('refreshQuestion', data);
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
        .put(`/answer/${id}/upvote`, {}, {
          headers: {
            access_token: localStorage.access_token,
          }
        })
        .then(({ data }) => {
          this.$emit('refreshQuestion', data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvote(id) {
      this.$axios
        .put(`/answer/${id}/downvote`, {}, {
          headers: {
            access_token: localStorage.access_token,
          }
        })
        .then(({ data }) => {
          this.$emit('refreshQuestion', data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    hasUpVoted() {
      if(this.answer.upvotes.indexOf(localStorage.userId) > -1) {
        return true;
      } else {
        return false;
      }
    },
    hasDownVoted(id) {
      if(this.answer.downvotes.indexOf(localStorage.userId) > -1) {
        return true;
      } else {
        return false;
      }
    },
    acceptAnswer() {
      this.$axios
        .put(`/answer/${this.answer._id}`, {
          isAccepted: true,
        }, {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then(({ data }) => {
          return this.$axios
            .put(`/question/${this.$route.params.id}`, {
              isAnswered: true,
            }, {
              headers: {
                access_token: localStorage.access_token,
              },
            });
        })
        .then(({ data }) => {
          this.$emit('refreshQuestion', data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    isOwner(id) {
      if(localStorage.userId === id) {
        return true;
      }
      return false;
    },
  },
  props: ['answer', 'myAnswer', 'questionOwner'],
};
</script>
