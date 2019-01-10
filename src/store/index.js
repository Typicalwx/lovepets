import Vue from "vue"
import Vuex from "vuex";
// import axios from "axios"
import storeModule from "./modules/storeModule.js"
Vue.use(Vuex) //注册

export default new Vuex.Store({
    strict: true,//严格模式
    modules: {
        storeModule: storeModule //模块化的student
    }
})