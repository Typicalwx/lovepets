import axios from "axios"

export default {
    namespaced: true,
    state: {
        supplier: [],//商品
        suppliergood: {},//单个商品
        addVisible: false, //增加面板开关
        updateVisible: false,//修改面板开关
        // updateId: "",
    },
    getters: {},
    mutations: {
        //获取所有商品保存到suppliergoods
        setSupplier(state, data) {
            state.supplier = data
        },
        //新增按钮的开关
        setAddVisible(state, visible) {
            state.addVisible = visible
        },
        //修改按钮的开关
        setUpdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible
        },
      
        //保存通过id 查取到的商品
        setSuppliergood(state, data) {
            state.suppliergood = data
        }

    },
    actions: {
        //show
        setSuppliers({ commit }) {
            axios({
                method: "get",
                url: "/supplier",
            }).then(({ data }) => {
                // console.log("data", data)
                commit("setSupplier", data)
            })
        },

        //id查商品
        setSuppliergood({ commit }, id) {
            axios({
                method: "get",
                url: "/suppliergoods/" + id,
            }).then(({ data }) => {
                console.log("data", data)
                commit("setSuppliergood", data)
            })
        }
    }

}