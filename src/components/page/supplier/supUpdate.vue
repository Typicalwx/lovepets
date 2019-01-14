<template>
  <div>
    <el-dialog title="提示" :visible.sync="updateVisible" width="30%">
      <el-card class="box-card">
        <div style="margin: 20px;"></div>
        <el-form :model="regForm" ref="regForm" :label-position="labelPosition" label-width="120px">
          <el-form-item label="供应商编号">
            <el-input :value="supData._id" disabled></el-input>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-input v-model="upname"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址">
            <el-input v-model="addr"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话">
            <el-input v-model="phone"></el-input>
          </el-form-item>
          <el-form-item label="供应商网站">
            <el-input v-model="web"></el-input>
          </el-form-item>
          <el-form-item label="供应商营业执照" prop="licenseImage">
            <!-- <el-input v-model="licenseImage"></el-input> -->
            <el-upload
              class="avatar-uploader"
              action="/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="licenseImage" :src="'/upload/'+licenseImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="供应商备注">
            <el-input v-model="remark"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-button @click="updateVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
import Axios from "axios";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supModules" // 模块名
);
export default {
  updated() {
    console.log("123123", this.supData);
  },
  data() {
    return {
      regForm: {
        licenseImage: ""
      },
      labelPosition: "right",
      imageUrl: ""
    };
  },
  computed: {
    ...mapState(["updateVisible", "supData", "usersId"]),
    updateVisible: {
      get() {
        return this.$store.state.supModules.updateVisible;
      },
      set(updateVisible) {
        this.$store.commit("supModules/setUpdateVisible", updateVisible);
      }
    },
    upname: {
      get() {
        return this.supData.name;
      },
      set(name) {
        this.$store.commit("supModules/setSupData", {
          ...this.supData,
          name
        });
      }
    },

    addr: {
      get() {
        return this.supData.addr;
      },
      set(addr) {
        this.$store.commit("supModules/setSupData", {
          ...this.supData,
          addr
        });
      }
    },
    phone: {
      get() {
        return this.supData.phone;
      },
      set(phone) {
        this.$store.commit("supModules/setSupData", {
          ...this.supData,
          phone
        });
      }
    },
    web: {
      get() {
        return this.supData.web;
      },
      set(web) {
        this.$store.commit("supModules/setSupData", {
          ...this.supData,
          web
        });
      }
    },
    licenseImage: {
      get() {
        return this.supData.licenseImage;
      },
      set(licenseImage) {
        this.$store.commit("supModules/setSupData", {
          ...this.supData,
          licenseImage
        });
      }
    },
    remark: {
      get() {
        return this.supData.remark;
      },
      set(remark) {
        this.$store.commit("supModules/setSupData", {
          ...this.supData,
          remark
        });
      }
    }
  },
  methods: {
    ...mapActions(["setSuppliers"]),
    confirm() {
      console.log("nihao", this.imageUrl);
      axios({
        method: "put",
        url: "/supplier/" + this.supData._id,
        data: { ...this.supData }
      }).then(({ data }) => {
        console.log("修改成功", data);
        this.setSuppliers(this.usersId);
        this.updateVisible = false;
      });
    },
    //上传功能
    handleAvatarSuccess(res, file) {
      this.licenseImage = res;
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
    }
  }
};
</script>

<style scoped>
.box-card {
  margin: 0 auto;
  width: 90%;
}
</style>
