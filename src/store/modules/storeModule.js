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
        clerkUpdateVisible: false,
        addClerkVisible: false,
        storeId: "" || "5c358b2d100838196886b25c",
        storeInfoData: {},
        userId: "" || "5c358479100838196886b259",
        clerkInfor: {},
        updateClerkIndex: -1,
        clerkPage: {},
        clerkData: [],//要渲染的店员的数组,
        addSupplierGoodsVisible: false,
        supplierGood: {},
        supplierId: ""
    },
    getters: {},
    mutations: {
        //从供应商增加商品
        setSupplierGood(state, value) {
            state.supplierGood = value
        },
        //从供应商增加商品的ID
        setSupplierId(state, value) {
            state.supplierId = value
        },
        //店员分页
        setClerkPage(state, value) {
            state.clerkPage = value
        },
        //店员分页数据
        setClerkData(state, value) {
            state.clerkData = value
        },
        //商品搜索
        setSearch(state, value) {
            state.search = value
        },
        //更新修改的学生信息的方法
        setStoreGood(state, storeGood) {
            state.storeGood = storeGood
        },
        //更新修改的店员信息的方法
        setClerkInfor(state, clerkInfor) {
            state.clerkInfor = clerkInfor
        },
        //存店员数组下表
        setUpdateClerkIndex(state, updateClerkIndex) {
            state.updateClerkIndex = updateClerkIndex
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
        //从供应商处获取商品
        setAddSupplierVisible(state, value) {
            state.addSupplierGoodsVisible = value
        },
        // 修改商品弹框显示
        setClerkUpdateVisible(state, visible) {
            state.clerkUpdateVisible = visible
        },
        // 修改店员弹框显示
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
        // 获取门店的信息
        setStoreInfoData(context) {
            let { userId, search, clerkPage } = context.state;
            console.log(userId, "userId")
            axios({
                url: "/stores",
                method: "get",
                params: {
                    userId: userId || "5c358479100838196886b259",
                    type: search.type,
                    value: search.value,
                }
            }).then(({ data }) => {
                console.log(data)
                context.commit("setClerkPage", {
                    curpage: clerkPage.curpage || 1,
                    maxpage: Math.ceil(data.clerk.length / 5),
                    total: data.clerk.length,
                    eachpage: clerkPage.eachpage || 5
                });
                let arr = []
                for (let i = 0; i < (clerkPage.eachpage || 5); i++) {
<<<<<<< HEAD
=======
                   
>>>>>>> five
                    if (i < data.clerk.length) {
                        // console.log("qwefvfdsf")
                        arr.push(data.clerk[i]);
                    } else {
                        break;
                    }
<<<<<<< HEAD

=======
>>>>>>> five
                }
                context.commit("setClerkData", arr)
                context.commit("setStoreInfoData", data)
                context.commit("setStoreId", data._id || "5c358b2d100838196886b25c")
            })
        },
        // 修改店员
        updateClerk(context, payload) {
            let { storeId, clerkPage } = context.state;
            console.log(payload, typeof payload)
            axios({
                url: "/stores/" + storeId,
                method: "put",
                data: payload
            }).then(() => {
                console.log({ ...payload, _id: storeId }, "xiugai")
                context.commit("setStoreInfoData", {
                    ...payload,
                    clerk: JSON.parse(payload.clerk),
                    location: JSON.parse(payload.location)
                })
                let arr = []
                let clerk = JSON.parse(payload.clerk)
                for (let i = (clerkPage.curpage - 1) * clerkPage.eachpage; i < clerkPage.eachpage * clerkPage.curpage; i++) {

                    if (i < clerk.length) {
                        // console.log("qwefvfdsf")
                        arr.push(clerk[i]);
                    } else {
                        break;
                    }
                }
                console.log(arr, "第二页")
                context.commit("setClerkData", arr)

                context.commit("setClerkPage", {
                    curpage: clerkPage.curpage || 1,
                    maxpage: Math.ceil(JSON.parse(payload.clerk).length / 5),
                    total: JSON.parse(payload.clerk).length,
                    eachpage: 5
                })
            });
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
            let { pagination, storeId, search } = context.state;
            console.log("ddd")
            console.log(search)
            axios({
                url: "/storegoods",
                method: "get",
                params: {
                    page: pagination.curpage || 1,
                    rows: pagination.eachpage || 5,
                    type: search.type,
                    value: search.value,
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