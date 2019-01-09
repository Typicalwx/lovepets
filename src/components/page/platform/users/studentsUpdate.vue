<template>
  <div>
    <el-dialog title="修改学生" :visible.sync="updateVisible">
      <el-form status-icon label-width="100px">
        <el-form-item label="用户名 " prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="gender" label="男">男</el-radio>
          <el-radio v-model="gender" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBtn">确 定</el-button>
      </div>
      <el-upload
        class="avatar-uploader"
        action="/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="headImg" :src="headImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(["student"]),
    updateVisible: {
      get() {
        return this.$store.state.updateVisible;
      },
      set(updateVisible) {
        this.$store.commit("setVisible", updateVisible);
      }
    },
    name: {
      get() {
        return this.$store.state.student.name;
      },
      set(name) {
        this.$store.commit("setStudent", { ...this.student, name: name });
      }
    },
    age: {
      get() {
        return this.$store.state.student.age;
      },
      set(age) {
        this.$store.commit("setStudent", { ...this.student, age: age });
      }
    },
    gender: {
      get() {
        return this.$store.state.student.gender;
      },
      set(gender) {
        this.$store.commit("setStudent", { ...this.student, gender: gender });
      }
    },
    headImg: {
      get() {
        return this.$store.state.student.headImg;
      },
      set(headImg) {
        this.$store.commit("setStudent", { ...this.student, headImg:headImg});
      }
    }
  },
  methods: {
    ...mapActions(["setStudents"]),
    updateBtn() {
      axios({
        method: "put",
        url: "/students/" + this.student._id,
        data: {
          name: this.name,
          age: this.age,
          gender: this.gender,
          headImg:this.headImg
        }
      }).then(() => {
        this.setStudents();
        this.updateVisible = false;
      });
    },
    handleAvatarSuccess(res,file) {
      this.headImg = `upload/${res}`;
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
