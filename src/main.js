import Vue from 'vue'
import router from './router'

import BootstrapVue from "bootstrap-vue"
import axios from 'axios'

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.prototype.$http =  axios.create({
  baseURL: `http://135.181.36.3:8055`,
  });

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
