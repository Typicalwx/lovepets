<template>
  <el-card class="box-card">
     <h1>门店详情</h1>
<el-form :model="regForm"
          status-icon 
          :rules="rules"
           ref="regForm" 
           label-width="100px" >
           <el-form-item label="门店名" prop="name">
    <el-input type="text" v-model="regForm.name" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="营业执照号" prop="licenseAccount">
    <el-input type="text" v-model="regForm.licenseAccount" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="营业执照图片" prop="licenseImage">
    <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="地址" prop="licenseAddress">
    <el-input type="text" v-model="regForm.licenseAddress" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="经纬度" prop="positioning">
    <el-input type="text" v-model="regForm.positioning" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="所在城市" prop="city">
    <el-input type="text" v-model="regForm.city" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="法人" prop="person">
    <el-input type="text" v-model="regForm.person" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="phone">
    <el-input type="text"  v-model="regForm.phone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="头图" prop="headPortrait
">
      <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="特色" prop="features">
    <el-input type="text" v-model="regForm.features" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="佣金比列" prop="commission">
    <el-input type="text" value="成交额得百分之0.003" :disabled="false" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item class="zc">
    <el-button type="primary" @click="submitForm()">提交</el-button>
  </el-form-item>
</el-form>
  </el-card>
</template>

<script>
import axios from "axios";
export default {

  data() {
    return {
   regForm:{
  account:"",
   phone:"",
   pwd:"",
   email:"",
   name:"",
   role:""
      },
      rules:{
      phone:[{ required:true,message: '请输入电话' },
      { pattern:/^1\d{10}$/,message: '电话格式不正确' },
      {validator:this.valuedataPhone}],
      account:[{
        required:true,message: '请输入登录号'},
      { pattern:/^\w{6,16}$/,message: '登录号格式不正确' },
      {validator:this.valuedataAccount}],
      pwd:[{
        required:true,message: '请输入密码'  },
      { pattern:/^\w{6,16}$/,message: '密码格式不正确' }],
      email:[{
        required:true,message: '请输入邮箱' },
      { pattern:/(\S)+[@]{1}(\S)+[.]{1}(\w)+/,message: '邮箱格式不正确' }],
      name:[{
        required:true,message: '请输入姓名' },
      { pattern:/^[\u4e00-\u9fa5]{2,}$/,message: '姓名格式不正确' }],
      },
         role: '门店管理员',
    };
  },
 
  methods: {
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    valuedataPhone(rule, value, callback){
      axios({
        method:"get",
        url:"/users",
        params:{
          phone:value
        }
      }).then(({data})=>{
        if(data.status==0){
          callback("手机号重复")
        }else{
          callback()
        }
      })
    },
     valuedataAccount(rule, value, callback){
      axios({
        method:"get",
        url:"/users/ww",
        params:{
          account:value
        }
      }).then(({data})=>{
        if(data.status ==0){
          callback("登录号重复")
        }else{
          callback()
        }
      })
    },
    submitForm(){
      this.$refs.regForm.validate((valid)=>{
        if(valid){
          axios({
            method:"post",
            url:"/users",
            data:{
            account:this.regForm.account,
            pwd: this.regForm.pwd,
            email:this.regForm.email,
            name:this.regForm.name,
            phone: this.regForm.phone,
            role:this.role,
            state :0
            }
          }).then(()=>{
            alert("注册成功");
            this.$router.path("../login/index.vue");
            })
        }else{
          this.$alert("错误","失败")
        }
      })
    }
  }
  }
</script>
<style scoped>
.box-card{
width: 600px;
margin: auto;
}
.juese{
  width: 100%;
  height: 40px;
display: flex;
justify-content: center;
}
.zc{
margin-left: 90px;
margin-top: 20px;
}
.kuang{
    width:200px ;
    height: 200px;
    border: 1px solid rgb(124, 124, 124)
}
.shangchuan{
    display: block;
    width: 80px;
    height: 40px;
}
label{
    width: 240px;
}
</style>
