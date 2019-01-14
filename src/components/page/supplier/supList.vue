<template>
  <div class="table">
    <div class="container">
      <el-table :data="supplier" border class="table">
        <el-table-column prop="_id" label="供应商编号" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="供应商名称" width="170" align="center"></el-table-column>
        <el-table-column prop="addr" label="供应商地址" width="270" align="center"></el-table-column>
        <el-table-column prop="phone" label="供应商电话" width="170" align="center"></el-table-column>
        <el-table-column prop="web" label="供应商网站" width="170" align="center"></el-table-column>
        <el-table-column prop="licenseImage" label="供应商营业执照" width="160" align="center"></el-table-column>
        <el-table-column prop="remark" label="供应商备注" width="250" align="center"></el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supModules" // 模块名
);
export default {
  created() {
   
   
    console.log("哎", this.usersId);
    // this.setSuppliers(this.usersId);
  },
  computed: {
    ...mapState(["supplier", "usersId"])
  },

  name: "basetable",
  data() {
    return {
      supplierId: "",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1
    };
  },

  methods: {
    ...mapActions(["setSuppliers", "setSupDataAxios"]),
    ...mapMutations(["setUpdateVisible"]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    //修改按钮
    handleEdit: function(index, studentData) {
      // console.log("updateSwitch", studentData);
      console.log("213123123", this.supplier);
      this.setUpdateVisible(true); //打开修改面板
      console.log("idddd", studentData._id);
      this.setSupDataAxios(studentData._id);
    }
  }
};
</script>

<style>
</style>
