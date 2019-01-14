<template>
  <div class="container">
    <div class="handle-box">
      <el-select v-model="type" placeholder="搜索类型" class="handle-select mr10">
        <el-option key="1" label="供应商" value="name"></el-option>
        <el-option key="2" label="电话" value="phone"></el-option>
      </el-select>
      <el-input v-model="value" placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="cliBtn">搜索</el-button>
      <el-button size="mini" type="text" icon="el-icon-tickets" @click="infoBtn()">增加供应商</el-button>
    </div>
    <el-table :data="suppliers" border class="table" ref="multipleTable">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="供应商" width="120"></el-table-column>
      <el-table-column prop="addr" label="地址" width="120"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="users.name" label="用户名" width="120"></el-table-column>
      <el-table-column prop="users.email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="users.account" label="昵称" width="120"></el-table-column>
      <el-table-column prop="users.phone" label="用户电话" width="120"></el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            class="red"
            size="mini"
            type="text"
            @click="increaseBtn(scope.row._id)"
          >修改</el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="removeBtn(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="changeSize"
        @current-change="changePage"
        :page-sizes="[3, 10, 15, 20]"
        :page-size="100"
        layout=" sizes, prev, pager, next, jumper"
        :total="platpagination.total"
      ></el-pagination>
    </div>
    <!-- 增加供应商 -->
    <el-dialog title="增加供应商" :visible.sync="dialogTableVisible">
      <el-form :model="suppliersadd" status-icon ref="addForm" label-width="100px">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="suppliersadd.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="suppliersadd.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="suppliersadd.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="web">
          <el-input v-model="suppliersadd.web" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="remark" prop="remark">
          <el-input v-model="suppliersadd.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="users.account">
          <el-input v-model="suppliersadd.users.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="users.email">
          <el-input te v-model="suppliersadd.users.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="users.name">
          <el-input te v-model="suppliersadd.users.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册号码" prop="users.phone">
          <el-input te v-model="suppliersadd.users.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="users.pwd">
          <el-input te v-model="suppliersadd.users.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        action="platformsuppliers/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="licenseImage" :src="`/upload/`+licenseImage" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsupplier">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改供应商 -->
    <el-dialog title="修改供应商" :visible.sync="putdialogTableVisible">
      <el-form :model="putsupplier" status-icon ref="addForm" label-width="100px">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="putsupplier.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="putsupplier.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="putsupplier.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="web">
          <el-input v-model="putsupplier.web" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="remark" prop="remark">
          <el-input v-model="putsupplier.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="users.account">
          <el-input v-model="putsupplier.users.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="users.email">
          <el-input v-model="putsupplier.users.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="users.name">
          <el-input v-model="putsupplier.users.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册号码" prop="users.phone">
          <el-input v-model="putsupplier.users.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="users.pwd">
          <el-input v-model="putsupplier.users.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        action="platformsuppliers/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccesstwo"
        :before-upload="beforeAvatarUploadtwo"
      >
        <img v-if="putlicenseImage" :src="`/upload/`+putlicenseImage" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="putdialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="putsupplierBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "platformsuppliers"
);
export default {
  created() {
    this.setShowsuppliers();
  },
  data() {
    return {
      id: "",
      userId: "",
      licenseImage: "",
      putlicenseImage: "",
      dialogTableVisible: false,
      putdialogTableVisible: false,
      suppliersadd: {
        name: "",
        addr: "",
        phone: "",
        web: "",
        remark: "",
        users: {
          account: "",
          pwd: "",
          email: "",
          phone: "",
          name: "",
          role: "",
          state: 1
        }
      },
      putsupplier: {
        name: "",
        addr: "",
        phone: "",
        web: "",
        remark: "",
        users: {
          account: "",
          pwd: "",
          email: "",
          phone: "",
          name: "",
          role: "",
          state: 1
        }
      }
    };
  },
  computed: {
    ...mapState(["search", "suppliers", "platpagination"]),
    type: {
      get() {
        return this.search.type;
      },
      set(value) {
        this.setType(value);
      }
    },
    value: {
      get() {
        return this.search.value;
      },
      set(value) {
        this.setValue(value);
      }
    }
  },
  methods: {
    ...mapMutations(["setType", "setValue", "setPlatformsuppliespagination"]),
    ...mapActions(["setShowsuppliers"]),
    cliBtn(type, value) {
      this.setShowsuppliers({ type, value });
    },
    infoBtn() {
      this.dialogTableVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.licenseImage = res;
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
    },
    handleAvatarSuccesstwo(res, file) {
      this.putlicenseImage = res;
    },
    beforeAvatarUploadtwo(file) {
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
    changePage(page) {
      this.setPlatformsuppliespagination({
        ...this.platpagination,
        curpage: page
      });
      this.setShowsuppliers({ page, rows: this.platpagination.eachpage });
    },
    changeSize(size) {
      this.setPlatformsuppliespagination({
        ...this.platpagination,
        eachpage: size
      });
      this.setShowsuppliers({ page: 1, rows: size });
    },
    removeBtn(id) {
      axios({
        method: "delete",
        url: "/platformsuppliers/" + id
      }).then(() => {
        this.setShowsuppliers();
      });
    },
    addsupplier() {
      axios({
        method: "post",
        url: "/users",
        data: {
          account: this.suppliersadd.users.account,
          pwd: this.suppliersadd.users.pwd,
          email: this.suppliersadd.users.email,
          phone: this.suppliersadd.users.phone,
          name: this.suppliersadd.users.name,
          role: "供应商管理员",
          state: 1
        }
      }).then(({ data }) => {
        axios({
          method: "post",
          url: "/supplier",
          data: {
            name: this.suppliersadd.name,
            addr: this.suppliersadd.addr,
            phone: this.suppliersadd.phone,
            web: this.suppliersadd.web,
            licenseImage: this.licenseImage,
            remark: this.suppliersadd.remark,
            usersId: data.data._id
          }
        }).then(() => {
          this.setShowsuppliers();
          this.dialogTableVisible = false;
        });
      });
    },
    increaseBtn(id) {
      axios({
        method: "get",
        url: "/supplier/" + id
      }).then(({ data }) => {
        this.id = data._id;
        this.userId = data.users._id;
        this.putsupplier = data;
        this.putlicenseImage = data.licenseImage;
        this.putdialogTableVisible = true;
        console.log(this.id, this.userId);
      });
    },
    putsupplierBtn() {
      console.log(this.id, this.userId);
      axios({
        method: "put",
        url: "/platformsuppliers/" + this.id,
        data: {
          name: this.putsupplier.name,
          addr: this.putsupplier.addr,
          phone: this.putsupplier.phone,
          web: this.putsupplier.web,
          licenseImage: this.putlicenseImage,
          remark: this.putsupplier.remark
        }
      }).then(data => {
        console.log(data);
        axios({
          method: "put",
          url: "/users/" + this.userId,
          data: {
            account: this.putsupplier.users.account,
            pwd: this.putsupplier.users.pwd,
            email: this.putsupplier.users.email,
            phone: this.putsupplier.users.phone,
            name: this.putsupplier.users.name
          }
        }).then(() => {
          this.setShowsuppliers();
          this.putdialogTableVisible = false;
        });
      });
    }
  }
};
</script>

<style scoped>
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
