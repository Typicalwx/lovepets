import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from "./store/index.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from "vuex"
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')