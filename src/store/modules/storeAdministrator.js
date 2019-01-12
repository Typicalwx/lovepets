// import Vue from "vue";
// import Vuex from "vuex";
import axios from "axios";
export default ({
    strict: true,
    namespaced: true,
    state: {
        addVisible:false,
        addDetailVisible:false,
        storeAdministrator: [],
        pagination: {},
        search: { type: "", value: "" },
    },
    mutations: {
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
        }

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
                // console.log(data.rows)
                var res = data.rows.map(function (item) {
                    if (item.users.state == 1) {
                        item.users.state = "可用"
                        return item
                    }
                })
                if (res[0]) {
                    console.log(res)
                    context.commit("setStoreAdmin", res)
                    context.commit("setPagination", {
                        curpage: data.curpage,
                        maxpage: data.maxpage,
                        total: data.total
                    });
                }
                context.commit("setStoreAdmin", data.rows)
                context.commit("setPagination", {
                    curpage: data.curpage,
                    maxpage: data.maxpage,
                    total: data.total
                });
            });
        },
    }
})