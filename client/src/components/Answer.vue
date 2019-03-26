<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col p-0 mt-3">
          <div class="d-flex flex-column">
            <div style="width: 70%; font-weight: 400; font-size: 24px;">
              {{ answer.title }}
            </div>
            <small class="text-muted mt-auto" v-if="answer.user">
              answered by {{ answer.user.name }} {{ moment(answer.createdAt).fromNow() }}
              <div class="float-right" v-if="isOwner(answer.user._id)">
                <router-link :to="`/answers/${answer._id}/edit`">
                  Edit
                </router-link>
              </div>
            </small>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col p-0 border-bottom">
          <div class="d-flex">
            <div class="d-flex-column">
              <div>
                <i class="fas fa-caret-up fa-3x" 
                   style="cursor: pointer;" 
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
                   style="cursor: pointer;" 
                   @click.prevent="vote(answer._id, 'downvote')">
                </i>
              </div>
            </div>
            <div class="m-3" style="white-space: pre-wrap;">{{ answer.description }}</div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="answer.answers">
        <div class="col-7" v-if="answer.answers.length">
          {{ answer.answers }}
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
      if(this.hasUpVoted(localStorage.userId)) {
        path = 'cancelUpvote'
      } else if(this.hasDownVoted(localStorage.userId)) {
        path = 'cancelDownvote'
      }
      if(path) {
        this.$axios
          .put(`answer/${id}/${path}`, {}, {
            headers: {
              access_token: localStorage.access_token,
            },
          })
          .then(({ data }) => {
            this.$emit('refreshQuestion', data);
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
    hasUpVoted(id) {
      if(this.answer.upvotes.indexOf(id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    hasDownVoted(id) {
      if(this.answer.downvotes.indexOf(id) > -1) {
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
  },
  props: ['answer'],
};
</script>
