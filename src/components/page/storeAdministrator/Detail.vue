<template>
        <div>
          <el-dialog title="详情" :visible.sync="details" width="30%">
               <el-form ref="form" label-width="80px">
                   <el-form-item label="登录账号">
                    <el-input :value="form.account" :disabled="true"></el-input>
                </el-form-item>
                    <el-form-item label="登录密码">
                    <el-input :value="form.pwd" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input :value="form.phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input :value="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input :value="form.role" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input :value="form.state" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="店名">
                    <el-input :value="detail.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码">
                    <el-input :value="detail.number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item  label="营业执照图片">
                  
                  <img   width="60%" :src="'/upload/'+detail.licenseImage" alt>
                </el-form-item>
                <el-form-item label="营业地址">
                    <el-input :value="detail.addr" :disabled="true"></el-input>
                </el-form-item>
                 <el-form-item label="所在城市">
                    <el-input :value="detail.city" :disabled="true"></el-input>
                </el-form-item>
                 <el-form-item label="法人">
                    <el-input :value="detail.legal" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input :value="detail.phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                  <img   width="60%" :src="'/upload/'+detail.storeImage" alt>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="success">确 定</el-button>
                </span>
           </el-dialog>
        </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeAdministrator" // 模块名
);
export default {
  props: ["form", "detail"],
  computed: {
    ...mapMutations(["setDetailsVisible"]),
    ...mapState(["detailsVisible"]),
    details: {
      get() {
        return this.detailsVisible;
      },
      set(detailsVisible) {
        this.$store.commit(
          "storeAdministrator/setDetailsVisible",
          detailsVisible
        );
      }
    }
  },

  methods: {
    success() {
      this.$store.commit("storeAdministrator/setDetailsVisible", false);
    }
  }
};
</script>

<style>
</style>
