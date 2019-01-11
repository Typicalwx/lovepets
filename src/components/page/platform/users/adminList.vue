<template>
  <div class="container">
    <div class="handle-box">
      <el-select v-model="type" placeholder="搜索类型" class="handle-select mr10">
        <el-option key="1" label="姓名" value="name"></el-option>
        <el-option key="2" label="电话" value="phone"></el-option>
      </el-select>
      <el-input v-model="value" placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="cliBtn">搜索</el-button>
      <el-button size="mini" type="text" icon="el-icon-tickets" @click="infoBtn()">增加管理员</el-button>
    </div>
    <el-table :data="admins" border class="table" ref="multipleTable">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话" width="180"></el-table-column>
      <el-table-column prop="role" label="权限" width="180"></el-table-column>
      <el-table-column label="操作" width="320" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            class="red"
            size="mini"
            type="text"
            @click="increaseBtn(scope.row._id)"
          >管理员权限</el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="reduceBtn(scope.row._id)"
          >普通权限</el-button>
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
        :total="pagination.total"
      ></el-pagination>
    </div>
    <el-dialog title="增加管理员" :visible.sync="dialogTableVisible">
      <el-form :model="users" status-icon ref="addForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="users.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="users.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="users.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="account">
          <el-input v-model="users.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="users.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "platformModule"
);
export default {
  created() {
    this.setStudents();
  },
  computed: {
    ...mapState(["search", "admins", "pagination"]),
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
  props: ["reduceBtn", "increaseBtn", "showadmins"],
  data() {
    return {
      dialogTableVisible: false,
      users: {
        name: "",
        email: "",
        phone: "",
        account: "",
        pwd: ""
      }
    };
  },
  methods: {
    ...mapMutations(["setType", "setValue"]),
    ...mapActions(["setStudents"]),
    cliBtn(type, value) {
      this.setStudents({ type, value });
    },
    infoBtn() {
      this.dialogTableVisible = true;
    },
    ...mapMutations(["setPagination"]),
    ...mapActions(["setStudents"]),
    changePage(page) {
      this.setPagination({ ...this.pagination, curpage: page });
      this.setStudents({ page, rows: this.pagination.eachpage });
    },
    changeSize(size) {
      this.setPagination({ ...this.pagination, eachpage: size });
      this.setStudents({ page: 1, rows: size });
    },
    add() {
      axios({
        method: "post",
        url: "/users",
        data: {
          name: this.users.name,
          email: this.users.email,
          phone: this.users.phone,
          account: this.users.account,
          pwd: this.users.pwd,
          role: "平台管理员",
          state: "1"
        }
      }).then(() => {
        this.showadmins();
        this.setStudents();
        this.dialogTableVisible = false;
        this.users = {
          name: "",
          email: "",
          phone: "",
          account: "",
          pwd: ""
        };
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
