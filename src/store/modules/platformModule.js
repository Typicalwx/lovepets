import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
export default {
    strict: true,
    namespaced: true,
    state: {
        admins: [],
        platforms: [],
        pagination: {},
        platpagination: {},
        search: { type: "", value: "" },
    },
    mutations: {
        setVisible(state, Visible) {
            state.updateVisible = Visible;
        },
        setStudent(state, platforms) {
            state.platforms = platforms;
        },
        setStudents(state, students) {
            state.admins = students;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setPlatpagination(state, platpagination) {
            state.platpagination = platpagination;
        },
        setType(state, type) {
            state.search.type = type;
        },
        setValue(state, value) {
            state.search.value = value;
        }
    },
    actions: {
        setStudent(context, id) {
            axios({
                url: "/users/" + id,
                method: "get"
            }).then(({ data }) => {

                context.commit("setStudent", data)
            })
        },
        setStudents(context) {
            let { pagination, search } = context.state;
            axios({
                url: "/users",
                method: "get",
                params: {
                    page: pagination.curpage || 1,
                    rows: pagination.eachpage || 3,
                    type: search.type || "",
                    value: search.value || "",
                    boll: true
                }
            }).then(({ data }) => {

                context.commit("setStudents", data.rows)
                context.commit("setPagination", {
                    curpage: data.curpage,
                    maxpage: data.maxpage,
                    total: data.total
                });
            });
        },
        setPlatform(context) {
            let { platpagination, search } = context.state;
            axios({
                url: "/platform",
                method: "get",
                params: {
                    page: platpagination.curpage || 1,
                    rows: platpagination.eachpage || 3,
                    type: search.type || "",
                    value: search.value || "",
                    boll: true
                }
            }).then(({ data }) => {
                context.commit("setStudent", data.rows)
                context.commit("setPlatpagination", {
                    curpage: data.curpage,
                    maxpage: data.maxpage,
                    total: data.total
                });
            });
        },
    }
}