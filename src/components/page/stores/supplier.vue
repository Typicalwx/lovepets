<template>
<div>
<el-button type="primary" icon="delete" class="handle-del mr10" @click="click">增加服务</el-button>
    <el-button type="primary" icon="delete" class="handle-del mr10" @click="clickwawa">查询服务</el-button>

</div>
    
</template>

<script>
import axios from "axios"
export default {
    methods:{

          click(){
              var myDate = new Date()
              console.log(myDate.toLocaleDateString()+" "+myDate.toLocaleTimeString())
              let arr = [{
                    'storeId':'5c3c3e04c01f8441d092e769','shangpingid':'5c371132bd089a29cce23fdc',goodState:"商品",shangpingname:"老李牌狗粮",num:3,price:100,total:120},
            //   {'storeId':'5c3c3e04c01f8441d092e769','shangpingid':'5c371140bd089a29cce23fdd',goodState:"商品",shangpingname:"小心心狗粮",num:3,price:40,total:120},
            //   {'storeId':'5c3c3e04c01f8441d092e769','shangpingid':'5c371140bd089a29cce23fdd',goodState:"商品",shangpingname:"怡亲",num:10,price:40,total:400},
               {'storeId':'5c3c3e04c01f8441d092e769','shangpingid':'5c371142bd089a29cce23fde',goodState:"商品",shangpingname:"老李牌猪食",num:10,price:140,total:400},
            //   {'storeId':'5c37fe883563f80d381a7924','shangpingid':'5c36a1e0bd089a29cce23fdb',goodState:"商品",shangpingname:"凯锐思",num:3,price:30,total:120},
            //     {'storeId':'5c37fe883563f80d381a7924','shangpingid':'5c36a1e0bd089a29cce23fdb',goodState:"商品",shangpingname:"凯锐思",num:3,price:30,total:120},
            //       {'storeId':'5c37fe883563f80d381a7924','shangpingid':'5c36a1e0bd089a29cce23fdb',goodState:"商品",shangpingname:"凯锐思",num:3,price:30,total:120},
            //         {'storeId':'5c37fe883563f80d381a7924','shangpingid':'5c36a1e0bd089a29cce23fdb',goodState:"商品",shangpingname:"凯锐思",num:3,price:30,total:120}
              ]
                axios({
                    method:"post",
                    url:"/orderbuy",
                    data:{
                            shoppingtrolley:JSON.stringify(arr),
                            petmasterID:"5c36eff501c3d04fd47db3a9"
                    }
                })
          } ,

          clickwawa(){
              axios({
                method:"get",
                 url:"/orderbuy",
              }).then(res=>{
                  console.log(res.data)
              })
          }
    }
}
</script>

<style>

</style>
