<template>
  <div>
    <el-button type="primary" @click="dialogTableVisible = true">增加</el-button>
    <el-dialog title="增加学生" :visible.sync="dialogTableVisible">
      <el-form :model="addForm" status-icon ref="addForm" label-width="100px">
        <el-form-item label="用户名 " prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="addForm.gender" label="男">男</el-radio>
          <el-radio v-model="addForm.gender" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
      <el-upload
        class="avatar-uploader"
        action="/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      imageUrl: "",
      dialogTableVisible: false,
      addForm: {
        name: "",
        age: "",
        gender: ""
      }
    };
  },
  methods: {
    ...mapActions(["setStudents"]),
    add() {
      axios({
        method: "post",
        url: "/students",
        data: {
          name: this.addForm.name,
          age: this.addForm.age,
          gender: this.addForm.gender,
          headImg:this.imageUrl
        }
      }).then(() => {
        this.setStudents();
        this.dialogTableVisible = false;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = `/upload/${res}`;
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
</style>
