<template>
  <el-card class="box-card">
     <h1>注册</h1>
<el-form :model="regForm"
          status-icon 
          :rules="rules"
           ref="regForm" 
           label-width="100px" >
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
  <template >
  <el-radio prop="role" v-model="role" label="门店管理员">门店管理员</el-radio>
  <el-radio prop="role" v-model="role" label="供应商管理员">供应商管理员</el-radio>
</template>
</div>
  <el-form-item class="zc">
    <el-button type="primary" @click="submitForm">注册</el-button>
  </el-form-item>
</el-form>
  </el-card>
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
<<<<<<< HEAD
       open() {
        this.$alert('注册成功', {
          confirmButtonText: '请登录',
          callback: action => {
              this.$router.push("/login");
          }
        });
      },
    valuedataPhone(rule, value, callback){
=======
    valuedataPhone(rule, value, callback) {
>>>>>>> zw
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
<<<<<<< HEAD
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
          }).then(()=>{
            this.open();
            })
        }else{
          this.$alert("有错误","注册失败")
=======
            method: "post",
            url: "/users",
            data: {
              account: this.regForm.account,
              pwd: this.regForm.pwd,
              email: this.regForm.email,
              name: this.regForm.name,
              phone: this.regForm.phone,
              role: this.role,
              state: "0"
            }
          }).then(() => {
            this.$alert("注册成功");
            this.$router.push("/login");
          });
        } else {
          this.$alert("有错误", "注册失败");
>>>>>>> zw
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
.zc {
  margin-left: 90px;
  margin-top: 20px;
}
</style>
