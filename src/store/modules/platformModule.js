import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
    strict: true,
    state: {
        updateVisible:false,
        //修改时学生信息
        student: {},
        //渲染学生信息
        students: [],
        pagination: {},
        search: {type:"",value:""},
    },
    mutations: {
        setVisible(state,Visible){
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
                url: "/students/" + id,
                method: "get"
            }).then(({ data }) => {

                context.commit("setStudent", data)
            })
        },
        setStudents(context) {
            let { pagination, search } = context.state;
            axios({
                url: "/students",
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
})