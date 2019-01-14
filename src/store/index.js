import Vue from "vue";
import Vuex from "vuex";
import petowner from "./modules/petowner.js";
import storeAdministrator from "./modules/storeAdministrator.js";
import supplierModules from "./modules/supplierModules"
import supModules from "./modules/supModules"
import store from "./modules/store"
import storeModule from "./modules/storeModule.js"
// import studentsModule from "./modules/studentsModule";
import platformModule from "./modules/platformModule"
import platformsuppliers from "./modules/platformsuppliers"
Vue.use(Vuex) //注册

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        store,
        supplierModules: supplierModules,  //模块化的supplier
        supModules: supModules,
        storeModule: storeModule,
        // studentsModule: studentsModule, //模块化的student
        platformModule,
        petowner, storeAdministrator,
        supplierModules: supplierModules,  //模块化的supplier
        supModules: supModules,
        platformsuppliers
    }
})