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
              let arr = [{'storeId':'5c3600b61a795020cc0af415','shangpingid':'5c3602ba1a795020cc0af419',num:3,price:40,total:120},
              {'storeId':'5c3600b61a795020cc0af415','shangpingid':'5c3602ba1a795020cc0af419',num:3,price:40,total:120},
              {'storeId':'5c3600c71a795020cc0af417','shangpingid':'5c3602d01a795020cc0af41b',num:3,price:40,total:120}]
                axios({
                    method:"post",
                    url:"/orderbuy",
                    data:{
                            shoppingtrolley:JSON.stringify(arr),
                            petmasterID:"5c36039d1a795020cc0af41c"
                    }
                })
          } ,

          clickwawa(){
              axios({
                method:"get",
                 url:"/orderbuy",
              }).then(res=>{
                  console.log(res)
              })
          }
    }
}
</script>

<style>

</style>
