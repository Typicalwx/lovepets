
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
export default {
    // strict: true,
    namespaced: true,
    state: {
        addVisible: false,
        updateVisible: false,
        petowners: [],
        updatePetowners: [],
        pagination: {},
        search: { type: "", value: "" },
    },
    mutations: {
        setUpdateVisible(state, Visible) {
            state.updateVisible = Visible;
        },
        setAddVisible(state, Visible) {
            state.addVisible = Visible;
        },
        setUpdatePetowners(state, value) {
            state.updatePetowners = value;
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
        // 宠主管理
        setPetowner(state, petowners) {
            state.petowners = petowners;
        },
    },
    actions: {
        setPetowners(context) {
            let { pagination, search } = context.state;
            axios({
                url: "/petowners",
                method: "get",
                params: {
                    page: pagination.curpage || 1,
                    rows: pagination.eachpage || 5,
                    type: search.type || "",
                    value: search.value || ""
                }
            }).then(({ data }) => {
                console.log(data)
                var res = data.rows.map(function (item) {
                    if (item.state) {
                        if (item.state == 1) {
                            item.state = "正常"
                        } else if (item.state == 3) {
                            item.state = "封禁"
                        }
                        return item
                    }


                })
                context.commit("setPetowner", res)
                context.commit("setPagination", {
                    curpage: data.curpage,
                    maxpage: data.maxpage,
                    total: data.total
                });
            });
        },

    }
}