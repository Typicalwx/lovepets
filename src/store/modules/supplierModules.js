import axios from "axios"

export default {
    namespaced: true,
    state: {
        suppliergoods: []//商品
    },
    getters: {},
    mutations: {
        setSupplierModules(state, data) {
            state.suppliergoods = data
        }
    },
    actions: {
        setSupplierModules({ commit }) {
            axios({
                method: "get",
                url: "/suppliergoods",
            }).then(({ data }) => {
                console.log("data", data)
                commit("setSupplierModules", data)
            })
        }
    }

}