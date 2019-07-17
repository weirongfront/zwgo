import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import './plugins/element.js'

import "@/assets/scss/yt-variables.scss";
import '@/assets/scss/yt.scss';
import '@/assets/scss/yt-project.scss' // global css

import '@/assets/icons/svg' // icon

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
