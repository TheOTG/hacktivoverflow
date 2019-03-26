import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],    // stores all questions
    myQuestions: [],  // stores currently logged in user questions
    searchResult: [], // stores all questions that match the search
    isLogin: false,
    user: null,
  },
  getters: {
    searchQuestion: state => search => {
      return state.questions.filter(question => {
        return question.title.search(new RegExp(search, 'i')) > -1;
      });
    },
    getQuestionById: state => id => {
      return state.questions.filter(question => {
        return question._id.toString() === id;
      });
    }
  },
  mutations: {
    SET_QUESTION(state, questions) {
      state.questions = questions;
    },
    SET_MY_QUESTION(state, questions) {
      state.myQuestions = questions;
    },
    SET_IS_LOGIN(state, user) {
      state.isLogin = !state.isLogin;
      state.user = state.user ? null : user;
    },
  },
  actions: {
    getQuestions({ commit }) {
      axios
        .get('/question')
        .then(({ data }) => {
          commit('SET_QUESTION', data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    getMyQuestions({ commit }) {
      axios
        .get('/question/mylist', {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then(({ data }) => {
          commit('SET_MY_QUESTION', data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    login({ commit }, user) {
      commit('SET_IS_LOGIN', user);
    },
  },
});