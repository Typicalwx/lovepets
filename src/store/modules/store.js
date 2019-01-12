import axios from "axios";
var state ={
    editVisible:false,
    serveitem:[],
    updateserveitem:[],
    pagenation:{},
    pagenationbuy:{},
    pagenationed:{},
    type:"",
    typone:null,
    typetwo:null,
    text:"",
    textone:null,
    texttwo:null,
    updateeditVisible:false,
    a:null,
    data1:"",
    data2:"",
    orderitem:[],//存储未订单数组，
    weigoummai:false,
    goummai:false,
    orderitembuied:[],//存储已订单数组,
    contactarr:[],
    contactarrtwo:[],
    spanArr:[],
    position:0
}
var getters={

}
var mutations ={
    //修改服务
    setupdatserve(state,updateserveitem){
        state.updateserveitem = updateserveitem

    },
    //服务相关方法
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
    //搜索1
    settypeone(state,typeone){
   
        state.typeone = typeone
    },
    settextone(state,textone){
        state.textone = textone
    },
    //搜索2

    settypetwo(state,typetwo){
   
        state.typetwo = typetwo
    },
    settexttwo(state,texttwo){
        state.texttwo = texttwo
    },









    setdata1(state,data1){
        state.data1 = data1
    },
    setdata2(state,data2){
        state.data2 = data2
    },
    setupdateeditVisible(state,updateeditVisible){
        state.updateeditVisible = updateeditVisible
    },

    //订单相关方法
    setweigoummai(state,weigoummai){//开关
        state.weigoummai=weigoummai
    },

    setgoummai(state,goummai){//开关
        state.goummai=goummai
    },




    setorderitem(state,orderitem){//未完成订单
        state.orderitem = orderitem
    },
    setpagenationbuy(state,pagenationbuy){
        state.pagenationbuy = pagenationbuy   
    },
    setorderitembuied(state,orderitembuied){//已完成订单
        state.orderitembuied = orderitembuied
    },
    setpagenationed(state,pagenationed){
        state.pagenationed = pagenationed
    },
    setcontactarr(state,contactarr){
        state.contactarr=contactarr
    },
    setcontactarrtwo(state,contactarrtwo){
        state.contactarrtwo=contactarrtwo
    }
 
}
var actions ={

//查询未完成订单
showbyid({commit},id,){
    axios({
        method:"get",
        url:"/orderbuy/"+ id
    }).then((res)=>{
        //如何渲染
        let arr =[];
        arr = [...res.data.ordergoodarr,...res.data.orderservearr];
        console.log(arr)
        commit("setcontactarr",arr);
    })
},

showbyidtwo({commit},id,){
    console.log("进来了",id)
    axios({
        method:"get",
        url:"/orderbuied/"+ id
    }).then((res)=>{
        console.log(res.data)
        //如何渲染
        let arr =[];
        arr = [...res.data.ordergoodarr,...res.data.orderservearr];
        console.log(arr)
        commit("setcontactarrtwo",arr);
    })
},



//未完成订单
    showorder({state,commit},payload={page:1,rows:5}){
        let type  = state.typeone;
        let text  = state.textone;
        console.log(typeof text)
            axios({
                method: "get",
                url: "/orderbuy",
                params:{
                    ...payload,
                    type,
                    text
                }
            }).then(res=>{
                //根据不同商家的id区分订单，需要同商家id对应（未完成）
                commit("setorderitem",res.data.rows);
                commit("setpagenationbuy",res.data)
            })
    },
//已完成订单
showorderbuied({state,commit},payload={page:1,rows:5}){
    console.log(1)
    let type  = state.typetwo;
    let text  = state.texttwo;
        axios({
            method: "get",
            url:"/orderbuy/orderbuied",
            params:{
                ...payload,
                type,
                text
            }
        }).then(res=>{
            //根据不同商家的id区分订单，需要同商家id对应（未完成）
            console.log("111111111",res)
            commit("setorderitembuied",res.data.rows);
            commit("setpagenationed",res.data)
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
                console.log(res.data.rows)
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