<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="regForm"
        status-icon
        :rules="rules"
        ref="regForm"
        label-width="0px"
        class="ms-content"
      >
        <!-- <el-form-item label="登录名" prop="account">
        <el-input type="text" v-model="regForm.account" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item prop="account">
          <el-input v-model="regForm.account" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" v-model="regForm.pwd" placeholder="password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="register">没有账号，去注册</el-button>
        </div>
        <!-- <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="regForm.pwd" autocomplete="off"></el-input>
        </el-form-item>-->
        <!-- <el-form-item class="dl">
        <el-button type="primary" @click="submitForm()">登陆</el-button>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
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
    open() {
      this.$alert("请等待审核", {
        confirmButtonText: "取消"
      });
    },
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
            if (data._id) {
              if (data.role == "门店管理员") {
                if (data.state == "0") {
                  if (data.xiangqingstate == 1) {
                    this.open();
                  } else {
                    this.$router.push("/details");
                  }
                } else if (data.state == "1") {
                  this.$router.push("/storedashboard");
                }
              } else if (data.role == "供应商管理员") {
                if (data.state == "0") {
                  if (data.xiangqingstate == 1) {
                    this.open();
                  } else {
                    this.$router.push("/detailses");
                  }
                } else if (data.state == "1") {
                  this.$router.push("/suppliergoods");
                } else if (data.state == "2") {
                  this.$alert("你得账号正在被检查，暂时禁封！");
                }
              } else if (data.role == "平台管理员") {
                this.$router.push("/platform");
              }
            } else {
              this.$alert("你得账号或密码不正确！");
              this.regForm.account = "";
              this.regForm.pwd = "";
            }
          });
        } else {
          this.$alert("你得账号或密码不正确！");
        }
      });
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: black;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  /* width: 30%; */
  padding: 5px 12px;
  height: 36px;
  margin-bottom: 10px;
}
.login-btn button:last-child {
  background-color: rgba(255, 255, 255, 0.5);
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
