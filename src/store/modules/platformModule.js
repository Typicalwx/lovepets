import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
export default {
    strict: true,
    namespaced: true,
    state: {
        pagination: {},
        search: { type: "", value: "" },
    },
    mutations: {
        setVisible(state, Visible) {
            state.updateVisible = Visible;
        },
        setStudent(state, student) {
            state.student = student;
        },
        setStudents(state, students) {
            state.students = students;
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
                    rows: pagination.eachpage || 5,
                    type: search.type || "",
                    value: search.value || ""
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
    }
}