<template>
  <div class="container">
    <el-table :data="platforms" border class="table" ref="multipleTable">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话" width="180"></el-table-column>
      <el-table-column prop="role" label="管理类型" width="180"></el-table-column>
      <el-table-column label="操作" width="320" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click="infoBtn(scope.row._id)"
          >详情</el-button>
          <el-dialog title="详情" :visible.sync="dialogTableVisible">
            <el-form :model="supplier" status-icon ref="addForm" label-width="100px">
              <el-form-item label="店名" prop="name">
                <el-input v-model="supplier.name"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="addr">
                <el-input v-model="supplier.addr" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="tel">
                <el-input v-model="supplier.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false">关 闭</el-button>
            </div>
            <el-upload
              class="avatar-uploader"
              action="/upload"
              :show-file-list="false"
              :disabled="true"
            >
              <img v-if="licenseImage" :src="licenseImage" class="avatar" @click="big">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <el-dialog :visible.sync="dialogVisible" >
                <img width="60%" :src="licenseImage" alt>
              </el-dialog>
            </el-upload>
          </el-dialog>

          <el-button
            icon="el-icon-edit"
            class="red"
            size="mini"
            type="text"
            @click="noBtn(scope.row._id)"
          >不通过审核</el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="yesBtn(scope.row._id)"
          >通过审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      supplier: {
        name: "",
        addr: "",
        phone: ""
      },
      licenseImage: "",
      store: [],
      dialogTableVisible: false,
      dialogVisible: false
    };
  },
  props: ["platforms", "noBtn", "yesBtn"],
  methods: {
    big() {
      this.dialogVisible = true;
    },
    infoBtn(id) {
      this.supplier = {};
      this.dialogTableVisible = true;
      this.licenseImage = "";
      axios({
        method: "get",
        url: "/users/" + id
      }).then(({ data }) => {
        if (data.role == "门店管理员") {
          axios({
            method: "get",
            url: "/stores",
            params: {
              userId: id
            }
          }).then(({ data }) => {
            this.supplier = { ...this.supplier, ...data[0] };
            this.licenseImage = `upload/${data[0].licenseImage}`;
          });
        } else {
          axios({
            method: "get",
            url: "/supplier",
            params: {
              userId: id
            }
          }).then(({ data }) => {
            this.supplier = { ...this.supplier, ...data[0] };
            this.licenseImage = `upload/${data[0].licenseImage}`;
          });
        }
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
