
// import Vue from "vue"
// import Vuex from "vuex"
// import axios from "axios"
// Vue.use(Vuex)
// export default new Vuex.Store({
//     state: {
//         // count: 0
//         petowners: "",
//         data: ""
//     },
//     // 异步函数，提交mutations
//     actions: {
//         setPetowners({ commit }, page, type, value) {
//             axios({
//                 method: "get",
//                 url: "/petowners",
//                 params: {
//                     page,
//                     rows: 5,
//                     type: type,
//                     value: value
//                 }
//             }).then(response => {
//                 let data = response.data;
//                 console.log(data)
//                 commit("setPetowners", data)
//             });
//         }
//     },
//     // 通过提交的mutations改变state
//     mutations: {
//         setPetowners(state, petowners) {
//             state.petowners = petowners
//             // console.log(state.students)
//         }
//     }
// })
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
        petowners: [],
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
        setPetowner(state, petowners) {
            state.petowners = petowners;
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
            console.log(pagination)
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