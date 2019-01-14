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
              let arr = [{'storeId':'5c3994a0443b711ca8c60b6d','shangpingid':'5c3b2eb9443b711ca8c60bbe',goodState:"商品",shangpingname:"唐钰朋牌猫粮",num:3,price:50,total:150},
              {'storeId':'5c3994a0443b711ca8c60b6d','shangpingid':'5c3b2fbb443b711ca8c60bbf',goodState:"商品",shangpingname:"唐钰朋牌狗粮",num:3,price:45,total:135},
              {'storeId':'5c3994a0443b711ca8c60b6d','shangpingid':'5c3b3022443b711ca8c60bc0',goodState:"服务",shangpingname:"唐钰朋小猫咪洗护",num:10,price:15,total:150},
               {'storeId':'5c3994a0443b711ca8c60b6d','shangpingid':'5c3602ba1a795020cc0af419',goodState:"服务",shangpingname:"唐钰朋小狗寄养",num:10,price:30,total:300},
              {'storeId':'5c39b47a443b711ca8c60b75','shangpingid':'5c3b334a443b711ca8c60bc4',goodState:"商品",shangpingname:"韩家秀牌猫娘",num:3,price:40,total:120},
                {'storeId':'5c39b47a443b711ca8c60b75','shangpingid':'5c3b33be443b711ca8c60bc5',goodState:"商品",shangpingname:"韩家秀牌狗粮",num:3,price:40,total:120},
                  {'storeId':'5c39b47a443b711ca8c60b75','shangpingid':'5c3b3168443b711ca8c60bc2',goodState:"服务",shangpingname:"韩家修小猫洗护",num:3,price:20,total:60},
                    {'storeId':'5c39b47a443b711ca8c60b75','shangpingid':'5c3b3183443b711ca8c60bc3',goodState:"服务",shangpingname:"韩家修小狗寄养",num:3,price:30,total:90}
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
