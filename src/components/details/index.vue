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
   <el-form-item label="营业执照号" prop="number">
    <el-input type="text" v-model="regForm.number" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="营业执照图片" prop="licenseImage">
 <el-upload
          class="avatar-uploader"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </el-form-item>
  <el-form-item label="地址" prop="addr">
    <el-input type="text" v-model="regForm.addr" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="经度" prop="location.longitude">
    <el-input type="text" v-model="regForm.location.longitude" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item label="纬度" prop="location.latitude">
    <el-input type="text" v-model="regForm.location.latitude" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="所在城市" prop="city">
    <el-input type="text" v-model="regForm.city" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="法人" prop="legal">
    <el-input type="text" v-model="regForm.legal" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="phone">
    <el-input type="text"  v-model="regForm.phone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="头图" prop="storeImage">
    <el-upload
          class="avatar-uploader"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </el-form-item>
  <el-form-item label="特色" prop="feature">
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
     city:"",
  positioning:"",
   phone:"",
   person:"",
   headPortrait:"",
   features:"",
   commission:"",
   number:"",
   licenseImage:"",
   addr:"",
   name:"",
   location:{longitude:"",latitude:""}
      },
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
    submitForm(){
      this.$refs.regForm.validate((valid)=>{
        if(valid){
          axios({
            method:"post",
            url:"/users",
            data:{
            city:this.regForm.city,
            pwd: this.regForm.pwd,
            email:this.regForm.email,
            name:this.regForm.name,
            phone: this.regForm.phone,
            role:this.role,
            state :0
            }
          }).then(()=>{
            alert("注册成功");
            this.$router.path("/login");
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
