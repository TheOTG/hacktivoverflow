import Vue from 'vue';
import VueSwal from 'vue-swal';
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(CKEditor);

Vue.use(VueSwal);

axios.defaults.baseURL = 'http://localhost:3000';

Vue.prototype.$axios = axios;

Vue.prototype.$sortByAccepted = function(question) {
  question.answers.sort((a, b) => {
    return b.isAccepted - a.isAccepted;
  });
};

Vue.prototype.$sortByVotes = function(question) {
  let run = true;
  while(run) {
    if(question.answers.upvotes) {
      question.answers.sort((a, b) => {
        return (a.upvotes - a.downvotes) > (b.upvotes - b.downvotes);
      });
      run = false;
    }
  }
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
