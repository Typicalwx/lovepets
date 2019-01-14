import axios from "axios"

export default {
    namespaced: true,
    state: {
        suppliergoods: [],//商品
        suppliergood: {},//单个商品
        addVisible: false, //增加面板开关
        updateVisible: false,//修改面板开关
        pageNation: {}//分页信息
        // updateId: "",
    },
    getters: {},
    mutations: {
        //获取所有商品保存到suppliergoods
        setSuppliergoods(state, data) {
            state.suppliergoods = data
        },
        //新增按钮的开关
        setAddVisible(state, visible) {
            state.addVisible = visible
        },
        //修改按钮的开关
        setUpdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible
        },
        //分页的方法
        setPageNation(state, pageNation) {
            state.pageNation = pageNation
        },
        //保存通过id 查取到的商品
        setSuppliergood(state, data) {
            state.suppliergood = data
        }

    },
    actions: {
        //show
        setSuppliergoods({ commit }, payload = { page: 1, rows: 5, supplierId: null }) {
            axios({
                method: "get",
                url: "/suppliergoods",
                params: payload
            }).then(({ data }) => {
                console.log("123", data)
                if (data.rows) {
                    commit("setSuppliergoods", data.rows)
                    commit("setPageNation", data)
                } else {
                    commit("setSuppliergoods", data)
                }

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