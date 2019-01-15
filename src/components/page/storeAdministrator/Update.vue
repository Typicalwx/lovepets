<template>
     <el-dialog title="编辑" :visible.sync="update" width="30%">
            <el-form v-if="updateStore"  ref="form" label-width="80px">
                <el-form-item label="店名">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码">
                    <el-input v-model="number"></el-input>
                </el-form-item>
                <el-form-item label="营业执照图片">
                     <el-upload
                 class="avatar-uploader"
                 action="/upload"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
                 <img v-if="licenseImage" :src="'/upload/'+licenseImage" class="avatar">
                 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
                </el-form-item>
                <el-form-item label="营业地址">
                    <el-input v-model="addr"></el-input>
                </el-form-item>
                 <el-form-item label="所在城市">
                    <el-input v-model="city"></el-input>
                </el-form-item>
                <!-- <el-form-item label="定位">
                    <el-input v-model="location"></el-input>
                </el-form-item> -->
                 <el-form-item label="法人">
                    <el-input v-model="legal"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="phone"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                            <el-upload
                 class="avatar-uploader"
                 action="/upload"
                 :show-file-list="false"
                 :on-success="handleSuccess"
                 :before-upload="beforeAvatarUpload">
                 <img v-if="storeImage" :src="'/upload/'+storeImage" class="avatar">
                 <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="success" >确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios"
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeAdministrator" // 模块名
);
export default {
  data() {
    return {
      img: ""
    };
  },
  props: ["form", "detail"],
  computed: {
    ...mapState([
      "updateVisible",
      "updateStore"
      //   "name",
      //   "number",
      //   "licenseImage",
      //   "addr",
      //   "city",
      //   "legal",
      //   "location",
      //   "phone",
      //   "storeImage",
      //   "commission"
    ]),
    update: {
      get() {
        return this.updateVisible;
      },
      set(updateVisible) {
        this.$store.commit(
          "storeAdministrator/setUpdateVisible",
          updateVisible
        );
      }
    },
    name: {
      get() {
        return this.updateStore.name;
      },
      set(value) {
        // this.$store.commit("storeAdministrator/setName", value);
        // console.log(value)
        this.setUpdateStore({ ...this.updateStore, name: value });
      }
    },
    number: {
      get() {
        return this.updateStore.number;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, number: value });
        // this.$store.commit("storeAdministrator/setNumber", value);
      }
    },
    licenseImage: {
      get() {
        return this.updateStore.licenseImage;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, licenseImage: value });
        // this.$store.commit("storeAdministrator/setLicenseImage", value);
      }
    },
    addr: {
      get() {
        return this.updateStore.addr;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, addr: value });
        // this.$store.commit("storeAdministrator/setAddr", value);
      }
    },
    city: {
      get() {
        return this.updateStore.city;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, addr: city });
        // this.$store.commit("storeAdministrator/setCity", value);
      }
    },
    legal: {
      get() {
        return this.updateStore.legal;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, legal: value });
        // this.$store.commit("storeAdministrator/setLegal", value);
      }
    },
    location: {
      get() {
        return this.updateStore.location;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, location: value });
        // this.$store.updateStore.commit("storeAdministrator/setLocation", value);
      }
    },
    phone: {
      get() {
        return this.updateStore.phone;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, phone: value });
        // this.$store.commit("storeAdministrator/setPhone", value);
      }
    },
    storeImage: {
      get() {
        return this.updateStore.storeImage;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, storeImage: value });
        // this.$store.commit("storeAdministrator/setStoreImage", value);
      }
    },
    commission: {
      get() {
        return this.updateStore.commission;
      },
      set(value) {
        this.setUpdateStore({ ...this.updateStore, commission: value });
        // this.$store.commit("storeAdministrator/setCommission", value);
      }
    }
  },

  methods: {
    ...mapMutations([
      "setUpdateVisible",
      //   "setName",
      //   "setNumber",
      //   "setLicenseImage",
      //   "setAddr",
      //   "setCity",
      //   "setLegal",
      //   "setLocation",
      //   "setPhone",
      //   "setStoreImage",
      //   "setCommission",
      "setUpdateStore"
    ]),
    ...mapActions(["updateStoreIfo", "setStoreAdministrator"]),
    cancel() {
      this.$store.commit("storeAdministrator/setUpdateVisible", false);
    },
  
    success() {
        // console.log(this.updateStore._id)
      axios({
        url: "/stores/"+this.updateStore._id,
        method: "put",
        data: {
        name:this.name,
        number:this.number,
        licenseImage:this.licenseImage,
        addr:this.addr,
        city:this.city,
        legal:this.legal,
        feature:this.feature||"",
        location:JSON.stringify(this.location||[]) ,
        storeImage:this.storeImage,
        phone:this.phone,
        commission:this.commission,
        clerk:JSON.stringify(this.clerk||[] )

        }
      }).then(() => {
             this.setUpdateVisible(false);
      this.setStoreAdministrator();
      });
   
    },
    handleAvatarSuccess(res, file) {

      this.licenseImage = res;
    },
    handleSuccess(res, file) {

      this.storeImage = res;
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
