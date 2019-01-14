import axios from "axios"

export default {
    namespaced: true,
    state: {
        supplier: [],//供应商详情
        supId: "",//供应商详情id
        updateVisible: false,//修改m面板的开关
        supData: {},//供应商信息，对象格式
        usersId: ""//用户id
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
        },
        //设置修改面板的开关
        setUpdateVisible(state, updateVisible) {
            state.updateVisible = updateVisible
        },

        //通过id获取的供应商详情
        setSupData(state, supData) {
            state.supData = supData
        },
        //通过session获取usersid
        setUsersId(state, usersId) {
            state.usersId = usersId
        }

    },
    actions: {
        //show
        setSuppliers({ commit }, usersId) {
            axios({
                method: "get",
                url: "/supplier",
                params: { usersId }
            }).then(({ data }) => {
                console.log("今天", data)
                commit("setSupplier", data)
                commit("setSupId", data[0]._id)

            })
        },

        setSupDataAxios({ commit }, id) {
            axios({
                method: "get",
                url: "/supplier/" + id,
            }).then(({ data }) => {
                console.log("通过id查的", data)
                commit("setSupData", data)

            })
        },

        // setSessionAxios({ commit }) {
        //     axios({
        //         url: "/getsession",
        //         method: "get"
        //     }).then(({ data }) => {
        //         if (data.phone) {
        //             console.log("session", data._id);
        //             // this.setSuppliers(data._id);
        //             commit("setUsersId", data._id)
        //         }
        //     });
        // }

    }

}