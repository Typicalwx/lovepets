
import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        // count: 0
        petowners: "",
        data: ""
    },
    // 异步函数，提交mutations
    actions: {
        setPetowners({ commit }, page, type, value) {
            axios({
                method: "get",
                url: "/petowners",
                params: {
                    page,
                    rows: 5,
                    type: type,
                    value: value
                }
            }).then(response => {
                let data = response.data;
                console.log(data)
                commit("setPetowners", data)
            });
        }
    },
    // 通过提交的mutations改变state
    mutations: {
        setPetowners(state, petowners) {
            state.petowners = petowners
            // console.log(state.students)
        }
    }
})