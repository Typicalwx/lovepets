<template>
  <div class="login-wrap">
    <el-card class="box-card">
      <h1 class="zhuce">注册</h1>
      <el-form :model="regForm" status-icon :rules="rules" ref="regForm" label-width="100px">
        <el-form-item label="登录名" prop="account">
          <el-input type="text" v-model="regForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="regForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input type="text" v-model="regForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="regForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="juese">
          <template>
            <el-radio prop="role" v-model="role" label="门店管理员">门店管理员</el-radio>
            <el-radio prop="role" v-model="role" label="供应商管理员">供应商管理员</el-radio>
          </template>
        </div>
        <el-form-item class="zc">
          <el-button type="primary" @click="submitForm">注册</el-button>
          <el-button
            style=" background-color: rgba(255, 255, 255, 0.5);"
            @click="loginSub"
          >已有账号，直接登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import login from "../login";
import axios from "axios";
export default {
  data() {
    return {
      regForm: {
        account: "",
        phone: "",
        pwd: "",
        email: "",
        name: "",
        role: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入电话" },
          { pattern: /^1\d{10}$/, message: "电话格式不正确" },
          { validator: this.valuedataPhone }
        ],
        account: [
          {
            required: true,
            message: "请输入登录号"
          },
          { pattern: /^\w{6,16}$/, message: "登录号格式不正确" },
          { validator: this.valuedataAccount }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码"
          },
          { pattern: /^\w{6,16}$/, message: "密码格式不正确" }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱"
          },
          { pattern: /(\S)+[@]{1}(\S)+[.]{1}(\w)+/, message: "邮箱格式不正确" }
        ],
        name: [
          {
            required: true,
            message: "请输入姓名"
          },
          { pattern: /^[\u4e00-\u9fa5]{2,}$/, message: "姓名格式不正确" }
        ]
      },
      role: "门店管理员"
    };
  },

  methods: {

       open() {
        this.$alert('注册成功', {
          confirmButtonText: '请登录',
          callback: action => {
              this.$router.push("/login");
          }
        });
      },
    valuedataPhone(rule, value, callback){



      axios({
        method: "get",
        url: "/users/phone",
        params: {
          phone: value
        }
      }).then(({ data }) => {
        console.log(data);
        if (data.status == 0) {
          callback("手机号重复");
        } else {
          callback();
        }
      });
    },
    valuedataAccount(rule, value, callback) {
      axios({
        method: "get",
        url: "/users/account",
        params: {
          account: value
        }
      }).then(({ data }) => {
        if (data.status == 0) {
          callback("登录号重复");
        } else {
          callback();
        }
      });
    },
    submitForm() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          axios({
            method:"post",
            url:"/users",
            data:{
            account:this.regForm.account,
            pwd:this.regForm.pwd,
            email:this.regForm.email,
            name:this.regForm.name,
            phone: this.regForm.phone,
            role:this.role,
            state :"0",
            xiangqingstate:0
            }
          }).then(() => {
            this.open();
            })
        }else{
          this.$alert("有错误","注册失败")
        }
      });


    },
    loginSub() {
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 500px;
  margin: auto;
  position: absolute;
  top:10%;
  /* left: 38%; */
  /* top: 0; */
  left: 0;
  right: 0;
  /* bottom: 0; */
   background-color: rgba(255, 255, 255, 0.5);
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
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.zhuce{
  text-align: center;
  margin-bottom: 20px;
}
</style>
