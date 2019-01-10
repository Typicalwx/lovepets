import axios from "axios"
export default {
    //默认情况下 state命名空间是局部的，getters，mutations，actions命名空间是全局的，
    //想要全部的命名空间是局部的就加 namespaced: true, 
    namespaced: true,
    state: {
        storeGood: {},//修改学生的信息
        storesData: [],//所有门店商品信息，
        pagination: {},//分页信息
        search: { type: "", value: "" },
        storeAddVisible: false,
        storeUpdateVisible: false,
        addClerkVisible:false,
        storeId: "",
        storeInfoData: {},
        userId: ""
    },
    getters: {},
    mutations: {
        //更新修改的学生信息的方法
        setStoreGood(state, storeGood) {
            state.storeGood = storeGood
        },
        //存门店用户id
        setStoreId(state, storeId) {
            state.storeId = storeId
        },
        //存用户id
        setUserId(state, userId) {
            state.userId = userId
        },
        //更新所有的学生信息的方法
        setStoregoods(state, stores) {
            state.storesData = stores
        },
        // 新增店员弹框显示
        setAddClerkVisible(state, visible) {
            state.addClerkVisible = visible
        },
        // 新增商品弹框显示
        setStoreAddVisible(state, visible) {
            state.storeAddVisible = visible
        },
        // 修改商品弹框显示
        setStoreUpdateVisible(state, visible) {
            state.storeUpdateVisible = visible
        },
        //分页的方法
        setPagination(state, pagination) {
            state.pagination = pagination
        },
        //存门店信息
        setStoreInfoData(state, storeInfoData) {
            state.storeInfoData = storeInfoData
        },
    },
    actions: {
        //commit提交， 用于mutations
        //dispatch 用于actions
        setStoreInfoData() {
            let { userId } = context.state;
            axios({
                url: "/stores",
                method: "get",
                data: {
                    userId: userId || "5c358479100838196886b259"
                }
            }).then(({ data }) => {
                context.commit("setStoreInfoData", data)
                context.commit("setStoreId", data._id)
            })
        },
        //点击修改通过id获取商品信息
        setStoreGood({ commit }, id) {
            axios({
                method: "get",
                url: "/storegoods/" + id,
            }).then(({ data }) => {
                console.log("data", data)
                commit("setStoreGood", data)
            })
        },
        //所有商品信息
        setStoregoods(context) {
            let { pagination, storeId } = context.state;
            console.log("ddd")
            axios({
                url: "/storegoods",
                method: "get",
                params: {
                    page: pagination.curpage || 1,
                    rows: pagination.eachpage || 5,
                    storeId: storeId || "5c358b2d100838196886b25c"
                }
            }).then(({ data }) => {
                console.log(data, 789);
                context.commit("setStoregoods", data.rows)
                context.commit("setPagination", {
                    curpage: data.curpage,
                    maxpage: data.maxpage,
                    total: data.total,
                    eachpage: data.eachpage
                });
            });
        }
    }
}