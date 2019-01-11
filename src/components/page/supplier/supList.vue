<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button class="el-icon-plus" type="primary" @click="addBtn">新增</el-button>
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-input
          v-model="select_word"
          placeholder="筛选关键词"
          style="width:300px;margin-left:20px"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table
        :data="supplier"
        border
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="供应商名称:" width="200" align="center"></el-table-column>
        <el-table-column prop="addr" label="供应商地址:" width="270" align="center"></el-table-column>
        <el-table-column prop="phone" label="供应商电话:" width="200" align="center"></el-table-column>
        <el-table-column prop="web" label="供应商网站:" width="200" align="center"></el-table-column>
        <el-table-column prop="licenseImage" label="供应商营业执照:" width="200" align="center"></el-table-column>
        <el-table-column prop="remark" label="供应商备注:" width="250" align="center"></el-table-column>
        
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <!-- <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
    <!-- 删除提示框 -->
    <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supModules" // 模块名
);
export default {
  computed: {
    ...mapState(["supplier"])
  },

  name: "basetable",
  data() {
    return {
      supplierId: "",
      url: "./vuetable.json",
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
    ...mapActions(["setSuppliers", "setSuppliergood"]),
    ...mapMutations(["setAddVisible", "setUpdateVisible"]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // //删除按钮
    // handleDelete: function(index, supplier) {
    //   this.delVisible = true;
    //   this.supplierId = supplier._id;
    // },
    // // 确定删除
    // deleteRow(data) {
    //   axios({
    //     method: "delete",
    //     url: "/supplier/" + this.supplierId
    //   }).then(({ data }) => {
    //     this.$message.success("删除成功");
    //     this.delVisible = false;
    //     this.setSuppliers(); //重新加载所有数据
    //   });
    // },

    //修改按钮
    handleEdit: function(index, studentData) {
      console.log("updateSwitch", studentData._id);
      this.setUpdateVisible(true); //打开修改面板

      this.setSuppliergood(studentData._id);
    },

    //新增按钮打开模板
    addBtn() {
      this.setAddVisible(true);
    },
    // ```````````````````````````````````````````````
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },

    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    delAll() {
      console.log("s数据", this.multipleSelection);
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    }
  }
};
</script>

<style>
</style>
