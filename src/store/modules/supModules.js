import axios from "axios"

export default {
    namespaced: true,
    state: {
        supplier: [],//供应商详情
        supId: ""//供应商详情id

    },
    getters: {},
    mutations: {
        //获取供应商详情保存到supplier
        setSupplier(state, data) {
            state.supplier = data
        },
        //获取供应商详情id保存到supId
        setSupId(state, id) {
            state.supId = id
        }

    },
    actions: {
        //show
        setSuppliers({ commit }) {
            axios({
                method: "get",
                url: "/supplier",
                params: { usersId: "5c384dec1b3ba76f6f14f752" }
            }).then(({ data }) => {
                console.log("今天", data)
                commit("setSupplier", data)
                commit("setSupId", data[0]._id)

            })
        },

    }

}