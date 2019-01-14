<template>
<div>
      <el-dialog class="adduser" title="增加登录信息" :visible.sync="Visible" width="25%">


        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
           <el-form-item label="登录名" prop="account">
                <el-input type="text" v-model="ruleForm2.account" autocomplete="off"></el-input>
                </el-form-item>
               <el-form-item label="登录密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <!-- v-model后面千万不要.number，不然数据库存的数据最后面会多个.0 -->
                <el-input type="text" v-model="ruleForm2.phone"></el-input>
                </el-form-item>
                   <el-form-item label="真实姓名" prop="name">
                <el-input v-model="ruleForm2.name"></el-input>
                </el-form-item>
               <el-form-item>
               </el-form-item>
              </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=> {this.setAddVisible(false)}">取消</el-button>
                   <el-button @click="resetForm('ruleForm2')">重置</el-button>
                       <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
            </span>
        </el-dialog>
         <!-- 增加弹门店详细信息出框 -->
        <el-dialog class="adduser" title="增加详细信息" :visible.sync="addDetail" width="25%">
            <el-form  label-width="80px">
                <el-form-item label="店名">
                    <el-input v-model="detail.name"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码">
                    <el-input v-model="detail.number"></el-input>
                </el-form-item>
                <el-form-item label="营业执照图片">
               <el-upload
               class="avatar-uploader"
               action="/upload"
               :show-file-list="false"
               :on-success="handleAvatar"
               :before-upload="beforeAvatar">
               <img v-if="licenseImage" :src="licenseImage" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
                </el-form-item>
              
               <el-form-item label="所在城市" prop>
        <v-distpicker v-show="addInp" class="addr" @selected="selected"></v-distpicker>
        <el-input
          type="text"
          :disabled="true"
          v-show="detail.city"
          v-model="detail.city"
          autocomplete="off"
        ></el-input>
      </el-form-item>
                  <el-form-item label="营业地址">
                    <el-input v-model="detail.addr"></el-input>
                </el-form-item>
                 <el-form-item label="法人">
                    <el-input v-model="detail.legal"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="detail.phone"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                <el-upload
                 class="avatar-uploader"
                 action="/upload"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
                 <img v-if="storeImage" :src="storeImage" class="avatar">
                 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click=" ()=> {this.setAddDetailVisible(false)}">取消</el-button>
                <el-button type="primary" @click="saveDetail">确 定</el-button>
            </span>
        </el-dialog>
        </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeAdministrator" // 模块名
);
export default {
  components: {
    // Pet,
    // InputElement
  },
  name: "basetable",
  data() {
    // 添加账号信息验证
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else if (!/^[\u4E00-\u9FA5A-Za-z]+$/.test(value)) {
        callback(new Error("只能输入中文和英文"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录账号"));
      } else {
        axios({
          method: "get",
          url: "/users/account",
          params: {
            account: value
          }
        }).then(({ data }) => {
          // console.log(1111);
          console.log(data);
          if (data.status == 0) {
            callback(new Error("账号已经被使用"));
          } else {
            callback();
          }
        });
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号码有误!"));
      } else {
        // typeof
        console.log(typeof value);
        axios({
          method: "get",
          url: "/users/phone",
          params: {
            phone: value
          }
        }).then(({ data }) => {
          if (data.status == 0) {
            callback(new Error("手机号已经被注册"));
          } else {
            callback();
          }
        });
      }
    };
    return {
      city:"",
      addInp: true,
      licenseImage: "",
      dialogVisible: false,
      storeImage: "",
      detailsVisible: false,
      editVisible: false,
      delVisible: false,
      form: {
        account: "",
        name: "", //用户名称name
        addr: "",
        area: "",
        phone: "",
        pwd: ""
      },
      detail: {
        name: "", //点名name
        number: "",
        licenseImage: "", //营业执照图
        addr: "",
        city: "",
        legal: "", //法人
        location: { longitude: "", latitude: "" },
        phone: "",
        storeImage: "",
        phone: "",
        commission: "" //佣金
      },
      id: "",
      usersId: "",
      // 添加账号信息验证
      ruleForm2: {
        pass: "",
        checkPass: "",
        name: "",
        account: "",
        phone: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["storeAdministrator", "addDetailVisible", "addVisible"]),
    // 增加的模态框
    Visible: {
      get() {
        return this.addVisible;
      },
      set(addVisible) {
        this.setAddVisible(addVisible);
      }
    },
    // 增加详情的模态框
    addDetail: {
      get() {
        return this.addDetailVisible;
      },
      set(addDetailVisible) {
        console.log(111);
        this.setAddDetailVisible(addDetailVisible);
      }
    }
  },
  methods: {
    ...mapMutations(["setAddDetailVisible", "setAddVisible", "setPagination"]),
    ...mapActions(["setStoreAdministrator"]),
    // 验证账号信息

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { pass, checkPass, name, account, phone } = this.ruleForm2;
          axios({
            method: "post",
            url: "/users",
            data: {
              role: "门店管理员",
              state: 1,
              account,
              phone,
              name,
              pwd: checkPass
            }
          }).then(({ data }) => {
            // console.log(data);
            this.setAddDetailVisible(true);
            this.setAddVisible(false);

            this.id = data._id;
          });
        } else {
          this.$message({
            message: "账号信息有误",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 保存增加
    // saveAdd() {
    //   this.setAddVisible(false);
    //   axios({
    //     method: "post",
    //     url: "/users",
    //     data: {
    //       role: "门店管理员",
    //       state: 1,
    //       account: this.form.account,
    //       phone: this.form.phone,
    //       name: this.form.name,
    //       pwd: this.form.pwd
    //     }
    //   }).then(({ data }) => {
    //     console.log(data);
    //     this.setAddDetailVisible(true);
    //     this.id = data._id;
    //   });
    // },
    // 增加门店详情
    selected(data) {
      console.log(data);
      this.detail.city =
        data.province.value + data.city.value + data.area.value;
      this.city = data.city.value;
    },
    saveDetail() {
      console.log(this.id);
      axios({
        method: "post",
        url: "/stores",
        data: {
          userId: this.id,
          name: this.detail.name,
          number: this.detail.number,
          licenseImage: this.licenseImage,
          city: this.city,
          addr: this.detail.city + this.detail.addr,
          legal: this.detail.legal,
          location: JSON.stringify(this.detail.location),
          phone: this.detail.phone,
          storeImage: this.storeImage,
          clerk: JSON.stringify([]),
          commission: "0.003"
        }
      }).then(({ data }) => {
        console.log(data);
        this.setAddDetailVisible(false);
        this.setStoreAdministrator();
      });
    },
    // 上传营业执照图片
    handleAvatar(res, file) {
      this.licenseImage = "http://localhost:3001/upload/" + res;
    },
    beforeAvatar(file) {
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
    // 上传头像图片
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.storeImage = "http://localhost:3001/upload/" + res;
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
    }
  }
};
</script>

<style>
</style>
