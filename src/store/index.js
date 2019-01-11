import Vue from "vue";
import Vuex from "vuex";
import petowner from "./modules/petowner.js";
import storeAdministrator from "./modules/storeAdministrator.js";
import supplierModules from "./modules/supplierModules"
import supModules from "./modules/supModules"
Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        petowner, storeAdministrator,
        supplierModules: supplierModules,  //模块化的supplier
        supModules: supModules
    }
})