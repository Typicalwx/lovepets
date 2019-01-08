import Vue from "vue"
import Vuex from "vuex";
// import axios from "axios"
import supplierModules from "./modules/supplierModules"
Vue.use(Vuex) //注册

export default new Vuex.Store({
    strict: true,//严格模式
    modules: {
        supplierModules: supplierModules //模块化的supplier
    },
    state: {
    },
    getters: {},
    mutations: {},
    actions: {}

})