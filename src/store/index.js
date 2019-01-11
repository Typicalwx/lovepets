import Vue from "vue"
import Vuex from "vuex";
// import axios from "axios"
import supplierModules from "./modules/supplierModules"
import supModules from "./modules/supModules"
import store from "./modules/store"
import storeModule from "./modules/storeModule.js"
// import studentsModule from "./modules/studentsModule";
import platformModule from "./modules/platformModule"
Vue.use(Vuex) //注册

export default new Vuex.Store({
    strict: true,//严格模式
    modules: {
        store,
        supplierModules: supplierModules,  //模块化的supplier
        supModules: supModules,
        storeModule: storeModule,
        // studentsModule: studentsModule, //模块化的student
        platformModule,
    }
})