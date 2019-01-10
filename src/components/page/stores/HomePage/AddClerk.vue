<template>
  <div>
    <el-dialog title="增加店员" :visible.sync="addClerkVisible" width="50%">
      <el-form :model="form" ref="form" label-width="50px">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职级" :label-width="formLabelWidth">
          <el-input v-model="form.grade" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClerkVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClerk()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  "storeModule" //模块名
);
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        phone: "",
        grade: ""
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    console.log(this, 78);
  },
  computed: {
    ...mapState(["addClerkVisible", "storeId", "storeInfoData"]),
    addClerkVisible: {
      get() {
        console.log(this.addClerkVisible);
        return this.addClerkVisible;
        //非map情况下，模块有嵌套的话，想要找到最里层的state 需要加上组件名(就是modules里面的属性名)，然后直接点属性
      },
      set(addClerkVisible) {
        console.log("updateSwitch", addClerkVisible);
        this.setAddClerkVisible(addClerkVisible);
        //非map情况下，模块有嵌套的话，想要提交。用模块名/属性名
      }
    }
  },
  methods: {
    ...mapMutations(["setAddClerkVisible"]),
    ...mapActions(["setStoreInfoData"]),
    addClerk() {
      this.addStoreDiolog = false;
      this.$refs.form.resetFields();
      let infor = this.storeInfoData;
      delete infor._id;
      axios({
        url: "/stores/" + storeId,
        method: "put",
        data: {
          ...infor,
          clerk: [...infor, this.form]
        }
      }).then(({ data }) => {
        this.setStoreInfoData();
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.images = [
        ...this.form.images,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let arr = this.form.images;
      for (let i in arr) {
        if (arr[i].uid == file.uid) {
          arr.splice(i, 1);
          break;
        }
      }
      this.form.images = arr;
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
  color: #666;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.picture {
  border: 1px dashed #8c939d;
}
.avatar-uploader {
  margin-top: 10px;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
