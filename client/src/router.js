import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'not-found',
      redirect: '/questions',
    },
    {
      path: '/search/:id',
      name: 'search-list',
      component: () => import(/* webpackChunkName: "questionlist" */ './views/SearchPage.vue'),
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      children: [
        {
          path: '/questions',
          name: 'question-list',
          component: () => import(/* webpackChunkName: "questionlist" */ './views/QuestionList.vue'),
        },
        {
          path: 'search',
          name: 'search-question',
          component: () => import(/* webpackChunkName: "searchquestion" */ './views/SearchPage.vue'),
        },
        {
          path: 'tagged/:tag',
          name: 'tagged-question',
          component: () => import(/* webpackChunkName: "taggedquestion" */ './views/TaggedQuestion.vue'),
        },
        {
          path: 'tagged/*',
          name: 'no-tagged-questions',
          component: () => import(/* webpackChunkName: "taggedquestion" */ './views/TaggedQuestion.vue'),
        },
        {
          path: 'new',
          name: 'new-question',
          component: () => import(/* webpackChunkName: "newquestion" */ './views/NewQuestion.vue'),
        },
        {
          path: 'mylist',
          name: 'my-questions',
          component: () => import(/* webpackChunkName: "myquestions" */ './views/MyQuestions.vue'),
        },
        {
          path: ':id/edit',
          name: 'edit-question',
          component: () => import(/* webpackChunkName: "editquestion" */ './views/EditQuestion.vue'),
        },
        {
          path: ':id',
          name: 'question-detail',
          component: () => import(/* webpackChunkName: "questionpage" */ './views/QuestionPage.vue'),
        },
      ],
    },
    {
      path: '/myanswers',
      name: 'my-answers',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      children: [
        {
          path: '/myanswers',
          name: 'my-answer-list',
          component: () => import(/* webpackChunkName: "home" */ './views/MyAnswers.vue'),
        },
        {
          path: ':id/edit',
          name: 'edit-answer',
          component: () => import(/* webpackChunkName: "editanswer" */ './views/EditAnswer.vue'),
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "loginpage" */ './views/LoginPage.vue'),
    },
  ],
});
