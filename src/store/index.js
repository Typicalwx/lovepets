import Vue from "vue"
import Vuex from "vuex";
// import axios from "axios"
// import studentsModule from "./modules/studentsModule";
import platformModule from "./modules/platformModule"
Vue.use(Vuex) //注册

export default new Vuex.Store({
    strict: true,//严格模式
    modules: {
        // studentsModule: studentsModule, //模块化的student
        platformModule,
    }
})