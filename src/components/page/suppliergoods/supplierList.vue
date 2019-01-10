<template>
  <div class="table">
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
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
        :data="suppliergoods"
        border
        class="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="品牌" width="80"></el-table-column>
        <el-table-column prop="title" label="宣传标语" width="160" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="80" align="center"></el-table-column>
        <el-table-column prop="method" label="制作方法/材料" width="100" align="center"></el-table-column>
        <el-table-column prop="applySfc" label="适用类型" width="80" align="center"></el-table-column>
        <el-table-column prop="exclusiveSfc" label="适用品种" width="100" align="center"></el-table-column>
        <el-table-column prop="total" label="总数" width="80" align="center"></el-table-column>
        <el-table-column prop="packSfc" label="重量" width="80" align="center"></el-table-column>
        <el-table-column prop="flavor" label="口味" width="80" align="center"></el-table-column>
        <el-table-column prop="SpecialFuc" label="特效" width="100" align="center"></el-table-column>
        <el-table-column prop="placeOfOrigin" label="产地" width="100" align="center"></el-table-column>
        <el-table-column prop="date" label="生产日期" width="80" align="center"></el-table-column>
        <el-table-column prop="shelfLife" label="保质期" width="80" align="center"></el-table-column>
        <el-table-column prop="features" label="特色说明" width="150" align="center"></el-table-column>
        <el-table-column prop="price" label="批发价格" width="100" align="center"></el-table-column>
        <el-table-column prop="images" label="图片" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supplierModules" // 模块名
);
export default {
  computed: {
    ...mapState(["suppliergoods"])
  },

  name: "basetable",
  data() {
    return {
      suppliergoodsId: "",
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
    ...mapActions(["setSuppliergoods", "setSuppliergood"]),
    ...mapMutations(["setAddVisible", "setUpdateVisible"]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    //删除按钮
    handleDelete: function(index, suppliergoods) {
      this.delVisible = true;
      this.suppliergoodsId = suppliergoods._id;
    },
    // 确定删除
    deleteRow(data) {
      axios({
        method: "delete",
        url: "/suppliergoods/" + this.suppliergoodsId
      }).then(({ data }) => {
        this.$message.success("删除成功");
        this.delVisible = false;
        this.setSuppliergoods(); //重新加载所有数据
      });
    },
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
/* .el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.cell {
  width: 180px;
} */

.handle-box {
  margin-bottom: 20px;
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
</style>
