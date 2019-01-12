<template>
<div>
      <el-dialog class="adduser" title="增加登录信息" :visible.sync="Visible" width="25%">
            <el-form  label-width="80px">
                 <el-form-item label="登录名">
                    <el-input v-model="form.account"></el-input>
                 </el-form-item>
                  <el-form-item label="登录密码">
                    <el-input v-model="form.pwd"></el-input>
                 </el-form-item>
                  <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                   <el-form-item label="真实姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="()=> {this.setAddVisible(false)}">取消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
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
                <el-form-item label="营业地址">
                    <el-input v-model="detail.addr"></el-input>
                </el-form-item>
                 <el-form-item label="所在城市">
                    <el-input v-model="detail.city"></el-input>
                </el-form-item>
                <el-form-item label="定位">
                    <el-input v-model="detail.location"></el-input>
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
    return {
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
        location: "",
        phone: "",
        storeImage: "",
        phone: "",
        commission: "" //佣金
      },
      id: "",
      usersId: ""
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
        console.log(111)
        this.setAddDetailVisible(addDetailVisible);
      }
    }
  },
  methods: {
    ...mapMutations(["setAddDetailVisible", "setAddVisible", "setPagination"]),
    ...mapActions(["setStoreAdministrator"]),


    // 保存增加
    saveAdd() {
      this.setAddVisible(false)  ;
      axios({
        method: "post",
        url: "/users",
        data: {
          role: "门店管理员",
          state: 1,
          account: this.form.account,
          phone: this.form.phone,
          name: this.form.name,
          pwd: this.form.pwd
        }
      }).then(({ data }) => {
        console.log(data);
        this.setAddDetailVisible(true) ;
        this.id = data._id;
      });
    },
    // 增加门店详情
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
          addr: this.detail.addr,
          city: this.detail.city,
          legal: this.detail.legal,
          location: JSON.stringify(this.detail.location),
          phone: this.detail.phone,
          storeImage: this.storeImage,
          clerk: JSON.stringify([]),
          commission: 0.004
        }
      }).then(({ data }) => {
        console.log(data);
        this.setAddDetailVisible(false) ;
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
