<template>
  <el-card class="box-card">
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
          <img v-if="imageUrl" :src="'/upload/'+imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="所在城市" prop>
        <v-distpicker v-show="addInp" class="addr" @selected="selected"></v-distpicker>
        <el-input
          type="text"
          :disabled="true"
          v-show="regForm.city"
          v-model="regForm.city"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="city">
        <el-input type="text" v-model="detail " autocomplete="off"></el-input>
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
          <img v-if="image" :src="'/upload/'+image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="特色" prop="feature">
        <el-input type="text" v-model="regForm.feature" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="佣金比列" prop="commission">
        <el-input v-model="regForm.commission" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item class="zc">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  created() {
    axios({
      url: "/getsession",
      method: "get"
    }).then(({ data }) => {
      console.log(data);
      if (data.phone) {
        this.userId = data._id;
        this.state = data.state;
      } else {
        this.$router.push("/login");
      }
    });
  },
  data() {
    return {
      regForm: {
        city: "",
        phone: "",
        feature: "",
        commission: "0.003%",
        number: "",
        name: "",
        legal: "",
        location: { longitude: "", latitude: "" }
      },
      imageUrl: "",
      image: "",
      userId: "",
      state: "",
      addInp: true,
      detail: "",
      city: ""
    };
  },

  methods: {
    selected(data) {
      console.log(data);
      this.regForm.city =
        data.province.value + data.city.value + data.area.value;
      this.city = data.city.value;
    },
    open() {
      this.$alert("申请门店成功,等待审核", {
        confirmButtonText: "请登录",
        callback: action => {
          this.$router.push("/login");
        }
      });
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      console.log("file", file);
      console.log("res", res);
      this.imageUrl = res;
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
      this.image = res;
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
      console.log(this.regForm.city + this.detail, "dfjsdofsd");
      this.$refs.regForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/stores",
            data: {
              city: this.city,
              name: this.regForm.name,
              phone: this.regForm.phone,
              feature: this.regForm.feature,
              number: this.regForm.number,
              commission: "0.003",
              licenseImage: this.imageUrl,
              addr: this.regForm.city + this.detail,
              location: JSON.stringify(this.regForm.location),
              userId: this.userId,
              storeImage: this.image,
              legal: this.regForm.legal,
              clerk: JSON.stringify("")
            }
          }).then(() => {
            if (this.state == "0") {
              // alert("详情填写完成等待审核");
              this.open();
            } else {
              this.$router.push("/store");
            }
            // let xiangqingstate = 1;
            // axios({
            //   method: "put",
            //   url: "/" + this.userId,
            //   data: {
            //     xiangqingstate
            //   }
            // }).then(() => {
            //   this.open();
            // });

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
  font-size: 14px;
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
.addr {
  width: 100px;
  margin-bottom: 10px;
}
</style>
