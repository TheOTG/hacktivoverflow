import Vue from 'vue';
import VueSwal from 'vue-swal';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store';

Vue.use(VueSwal);

axios.defaults.baseURL = 'http://localhost:3000';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
