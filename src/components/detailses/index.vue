<template>
  <el-card class="box-card">
    <h1 style="text-align: center;margin-bottom: 10px;">供应商详情</h1>
    <el-form :model="regForm" status-icon :rules="rules" ref="regForm" label-width="100px">
      <el-form-item label="供应商名称" prop="name">
        <el-input type="text" v-model="regForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="供应商网站" prop="web">
        <el-input type="text" v-model="regForm.web" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="营业执照图片" prop="licenseImage">
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
      <el-form-item label="地址" prop="addr">
        <el-input type="text" v-model="regForm.addr" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input type="text" v-model="regForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商家介绍" prop="remark">
        <el-input type="text" v-model="regForm.remark" autocomplete="off"></el-input>
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
      regForm: {
        name: "",
        addr: "",
        phone: "",
        web: "",
        licenseImage: "",
        remark: ""
      },

      imageUrl: "",
      rules: {
        phone: [
          { required: true, message: "请输入电话" },
          { pattern: /^1\d{10}$/, message: "电话格式不正确" },
          { validator: this.valuedataPhone }
        ],
        name: [
          {
            required: true,
            message: "请输入姓名"
          }
        ]
      },
      userId: "",
      state: ""
    };
  },
  created() {
    axios({
      url: "/getsession",
      method: "get"
    }).then(({ data }) => {
      if (data.phone) {
        this.userId = data._id;
        this.state = data.state;
      }
    });
  },
  methods: {
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
    submitForm() {
      this.$refs.regForm.validate(valid => {
        //   console.log(this.regForm.name)
        //   console.log(this.regForm.phone)
        //   console.log(this.regForm.addr)
        //   console.log(this.regForm.web)
        //   console.log(this.regForm.remark)
        if (valid) {
          axios({
            method: "post",
            url: "/supplier",
            data: {
              name: this.regForm.name,
              phone: this.regForm.phone,
              addr: this.regForm.addr,
              web: this.regForm.web,
              licenseImage: this.regForm.licenseImage,
              remark: this.regForm.remark,
              usersId: this.userId
            }
          }).then(({ data }) => {
            if (this.state == "0") {
              this.$alert("请等待审核", {
                confirmButtonText: "取消"
              });
              this.$router.push("/login");
            } else {
              this.$router.push("/suppliergoods");
            }
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
.avatar {
  width: 160px;
  height: 160px;
}
.avatar {
  width: 100%;
  height: 100%;
}
</style>
