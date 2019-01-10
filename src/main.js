import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import store from "./store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';


// Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});


new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount('#app')