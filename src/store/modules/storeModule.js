import axios from "axios"
export default {
    //默认情况下 state命名空间是局部的，getters，mutations，actions命名空间是全局的，
    //想要全部的命名空间是局部的就加 namespaced: true, 
    namespaced: true,
    state: {
        student: {},//修改学生的信息
        studentsData: [],//所有学生信息，
        pageNation: {},//分页信息
        updateSwitch: false//修改框的开关
    },
    getters: {},
    mutations: {
        //更新修改的学生信息的方法
        setStudent(state, student) {
            state.student = student
        },
        //更新所有的学生信息的方法
        setStudents(state, students) {
            state.studentsData = students
        },
        //分页的方法
        setPageNation(state, pageNation) {
            state.pageNation = pageNation
        },
        //更新修改框开关的方法
        setUpdateSwitch(state, setUpdateSwitch) {
            state.updateSwitch = setUpdateSwitch
        }
    },
    actions: {
        //commit提交， 用于mutations
        //dispatch 用于actions

        //点击修改通过id获取学生信息
        setStudent({ commit }, id) {
            axios({
                method: "get",
                url: "/students/" + id,
            }).then(({ data }) => {
                console.log("data", data)
                commit("setStudent", data)
            })
        },
        //所有学生的信息
        setStudents({ commit }, payload = { page: 1, rows: 5 }) {
            axios({
                method: "get",
                url: "/students",
                params: payload
            }).then(({ data }) => {
                console.log(data);

                commit("setPageNation", data)
                commit("setStudents", data.rows)
            });
        }
    }
}