import axios from "axios";
var state ={
    editVisible:false,
    serveitem:[],
    updateserveitem:[],
    pagenation:{},
    type:"",
    text:"",
    updateeditVisible:false,
    a:null,
    data1:"",
    data2:""
}
var getters={

}
var mutations ={
    //修改
    setupdatserve(state,updateserveitem){
        state.updateserveitem = updateserveitem

    },
    // //获取所有服务
    setserveitem(state,serveitem){
        state.serveitem=serveitem
    },
    setpagenation(state,pagenation){
        state.pagenation = pagenation
       
    },
    setupdateserveitem(state,updateserveitem){
        state.updateserveitem=updateserveitem
    },
    seta(state,a){
        state.a=a
    },
    settype(state,type){
   
        state.type = type
    },
    settext(state,text){
        state.text = text
    },

    setdata1(state,data1){
        state.data1 = data1
    },
    setdata2(state,data2){
        state.data2 = data2
    },



    setupdateeditVisible(state,updateeditVisible){
        state.updateeditVisible = updateeditVisible
    }
}
var actions ={

//订单
    showorder({state,commit},payload={page:1,rows:5}){
        console.log(1)
        let type  = state.type;
        let text  = state.text;
            axios({
                method: "get",
                url: "/order",
                params:{
                    ...payload,
                    type,
                    text
                }
            }).then(res=>{
                commit("setserveitem",res.data.rows);
                commit("setpagenation",res.data)
            })
    },

//服务
    show({state,commit},payload={page:1,rows:5}){
        console.log(1)
        let type  = state.type;
        let text  = state.text;
            axios({
                method: "get",
                url: "/servetime",
                params:{
                    ...payload,
                    type,
                    text
                }
            }).then(res=>{
                commit("setserveitem",res.data.rows);
                commit("setpagenation",res.data)
            })
    },
    updatserve({commit},id,){
        // console.log(id,Boolean)  
        axios({
            method:"get",
            url:"/servetime/"+ id
        }).then((res)=>{
            //如何渲染
             commit("setupdatserve",res.data);
             let a = res.data.servetype=="洗护"?true:false;
             commit("seta",a)
             console.log(res.data);
             let arr=res.data.servetime.split(" ")
             console.log(arr)
             commit("setdata1",arr[0]);
             commit("setdata2",arr[1])
        })
    },
}

export default {
    //vuex中的store分模块管理，
    //需要在store的index.js中引入各个模块，
    //为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
    //之后在不同页面中引入getter、actions、mutations时，
    //需要加上所属的模块名
    namespaced:true,
    state,
    mutations,
    getters,
    actions
    
}