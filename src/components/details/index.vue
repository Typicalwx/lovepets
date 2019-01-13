<template>
  <el-card  class="box-card">
    <h1>门店详情</h1>
    <el-form :model="regForm" status-icon ref="regForm" label-width="100px">
      <el-form-item label="门店名" prop="name">
        <el-input type="text" v-model="regForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="营业执照号" prop="number">
        <el-input type="text" v-model="regForm.number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="营业执照图片">
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
        <el-input type="text" v-model="regForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头图" prop="storeImage">
        <el-upload
          class="avatar-uploader"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccesses"
          :before-upload="beforeAvatarUploades"
        >
          <img v-if="image" :src="image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="特色" prop="feature">
        <el-input type="text" v-model="regForm.feature" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="佣金比列" prop="commission">
        <el-input type="text" value="百分之0.003" :disabled='true'></el-input>
      </el-form-item>
      <el-form-item class="zc">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
       created() {
    axios({
      url: "/getsession",
      method: "get"
    }).then(({ data }) => {
      console.log(data)
      if (data.phone) {
        this.userId = data._id;
        this.state=data.state
      }
    });
  },
  data() {
    return {
      regForm: {
        city: "",
        phone: "",
        feature: "",
        commission: "",
        number: "",
        addr: "",
        name: "",
        legal:"",
        location: { longitude: "", latitude: "" }
      },
      imageUrl: "",
      image: "",
      userId:"",
      state:""
    };
  },

  methods: {
      open() {
        this.$alert('申请门店成功,等待审核', {
          confirmButtonText: '请登录',
          callback: action => {
              this.$router.push("/login");
          }
        });
      },
    //上传图片
    handleAvatarSuccess(res, file) {
      console.log("file", file);
      console.log("res", res);
      this.imageUrl = "http://localhost:3001/upload/" + res;
      //   this.img = res;
      console.log("url", URL.createObjectURL(file.raw));
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //上传图片
    handleAvatarSuccesses(res, file) {
      console.log("file", file);
      console.log("res", res);
      this.image = "http://localhost:3001/upload/" + res;
      //   this.img = res;
      console.log("url", URL.createObjectURL(file.raw));
    },
    beforeAvatarUploades(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    submitForm() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/stores",
            data: {
              city: this.regForm.city,
              name: this.regForm.name,
              phone: this.regForm.phone,
              feature: this.regForm.feature,
              number: this.regForm.number,
              commission: "0.003",
              licenseImage: this.imageUrl,
              addr: this.regForm.addr,
              location: JSON.stringify(this.regForm.location),
              userId:this.userId,
              storeImage:this.image,
              legal:this.regForm.legal,
              clerk:JSON.stringify("")
            }
          }).then(() => {
            let xiangqingstate = 1
              axios({
                method:"put",
                url:"/"+this.userId,
                data:{
                  xiangqingstate,
                }
              }).then(()=>{
                 this.open();
              })
             
            // if(this.state=="0"){
            //  alert("详情填写完成等待审核");
            // }else{
            // this.$router.push("/store");
            // }        
          });
        } else {
          this.$alert("错误", "失败");
        }
      });
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 600px;
  margin: auto;
}
.juese {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
}
.zc {
  margin-left: 90px;
  margin-top: 20px;
}
.kuang {
  width: 200px;
  height: 200px;
  border: 1px solid rgb(124, 124, 124);
}
.shangchuan {
  display: block;
  width: 80px;
  height: 40px;
}
label {
  width: 240px;
}
</style>
