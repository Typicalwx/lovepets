<template>
  <el-card class="box-card">
    <h1>登陆</h1>
    <el-form :model="regForm" status-icon :rules="rules" ref="regForm" label-width="100px">
      <el-form-item label="登录名" prop="account">
        <el-input type="text" v-model="regForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="regForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="dl">
        <el-button type="primary" @click="submitForm()">登陆</el-button>
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
        account: "",
        pwd: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入登录号"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码"
          }
        ]
      }
    };
  },

  methods: {
    submitForm() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/users/login",
            data: {
              account: this.regForm.account,
              pwd: this.regForm.pwd
            }
          }).then(({ data }) => {
            // let data = response.data

            if (data.stats == 1) {
              alert("登录成功");

              if (data.data[0].role == "门店管理员") {
                // if(data.data[0].state =="0" ){
                if (data.state == 1) {
                  //  this.$router.push("/details");
                } else if (data.state == 0) {
                  this.$router.push("/details");
                }

                // }
                console.log(data.data[0].role);
              } else if (data.data[0].role == "平台管理员") {

                console.log(data.data[0].role);
              } else if (data.data[0].role == "供应商管理员") {
                if (data.state == 1) {
                  //  this.$router.push("/details");
                } else if (data.state == 0) {
                  this.$router.push("/detailses");
                }
              } else {
                console.log(未注册);
              }
            } else {
              this.$alert("错误", "失败");
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
  width: 500px;
  margin: auto;
}
.juese {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
}
.dl {
  margin-left: 90px;
  margin-top: 30px;
}
</style>
