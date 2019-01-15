// import Vue from "vue";
// import Vuex from "vuex";
import axios from "axios";
export default ({
    strict: true,
    namespaced: true,
    state: {
        updateVisible: false,
        detailsVisible: false,
        addVisible: false,
        addDetailVisible: false,
        storeAdministrator: [],
        pagination: {},
        search: { type: "", value: "" },
        storeId: "",
        updateStore: {},
        name: "",
        number: "",
        licenseImage: "", //营业执照图
        addr: "",
        city: "",
        legal: "", //法人
        location: "",
        phone: "",
        storeImage: "",

        commission: "" //佣金

    },
    mutations: {
        setStoreId(state, value) {
            state.storeId = value;
        },
        setUpdateVisible(state, Visible) {
            state.updateVisible = Visible;
        },
        setDetailsVisible(state, Visible) {
            state.detailsVisible = Visible;
        },
        setAddVisible(state, Visible) {
            state.addVisible = Visible;
        },
        setAddDetailVisible(state, Visible) {
            state.addDetailVisible = Visible;
        },
        setStoreAdmin(state, storeAdministrator) {
            state.storeAdministrator = storeAdministrator;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setType(state, type) {
            state.search.type = type;
        },
        setValue(state, value) {
            state.search.value = value;
        },


        // 设置门店信息
        setUpdateStore(state, updateStore) {
            state.updateStore = updateStore;
        },
        setName(state, value) {
            state.name = value;
        },
        setNumber(state, value) {
            state.number = value;
        },
        setLicenseImage(state, value) {
            state.licenseImage = value;
        },
        setAddr(state, value) {
            state.addr = value;
        },
        setCity(state, value) {
            state.city = value;
        },
        setLegal(state, value) {
            state.legal = value;
        },
        setLocation(state, value) {
            state.location = value;
        },
        setPhone(state, value) {
            state.phone = value;
        },
        setStoreImage(state, value) {
            state.storeImage = value;
        },
        setCommission(state, value) {
            state.commission = value;
        },



    },
    actions: {

        setStoreAdministrator(context) {
            let { pagination, search } = context.state;
            // console.log(pagination)
            axios({
                url: "/storeAdministrator/all",
                method: "get",
                params: {
                    page: pagination.curpage || 1,
                    rows: pagination.eachpage || 5,
                    type: search.type || "",
                    value: search.value || ""
                }
            }).then(({ data }) => {
                console.log(data)
                let res = []
                for (let i = 0; i < data.rows.length; i++) {
                    let item = data.rows[i]
                    if (item.users.role == "门店管理员" && item.users.state != 0) {
                        if (item.users.state == 1) {
                            item.users.state = "可用"
                        } else if (item.users.state == 3) {
                            item.users.state = "封禁"
                        }
                        res.push(item)
                        console.log(item)
                        // return res
                    }
                }
                console.log(res,456)
                if (res[0]) {
                    // console.log(res)
                    context.commit("setStoreAdmin", res)
                    context.commit("setPagination", {
                        curpage: data.curpage,
                        maxpage: data.maxpage,
                        total: data.total
                    });
                } else { context.commit("setStoreAdmin", data.rowscc) }
            });
        },

    }
})