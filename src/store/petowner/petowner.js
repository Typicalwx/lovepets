
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
    strict: true,
    state: {
        updateVisible: false,
        petowners: [],
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
        // setStudent(context, id) {
        //     axios({
        //         url: "/students/" + id,
        //         method: "get"
        //     }).then(({ data }) => {

        //         context.commit("setStudent", data)
        //     })
        // },
        setPetowners(context) {

            let { pagination, search } = context.state;
            // console.log(pagination)
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
                context.commit("setPetowner", data.rows)
                context.commit("setPagination", {
                    curpage: data.curpage,
                    maxpage: data.maxpage,
                    total: data.total
                });
            });
        },
   
    }
})