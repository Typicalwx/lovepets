import Vue from "vue";
import Vuex from "vuex";
import petowner from "./modules/petowner.js";
import storeAdministrator from "./modules/storeAdministrator.js";

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    modules: {
        petowner,storeAdministrator
    }
})