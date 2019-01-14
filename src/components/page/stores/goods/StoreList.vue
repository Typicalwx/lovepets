<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button @click="addStoreGood" class="handle-del mr10">新增商品</el-button>
        <el-button @click="addSupplierGood" class="handle-del mr10">从供应商添加商品</el-button>
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="type" placeholder="搜索属性" class="handle-select mr10">
          <el-option key="1" label="名字" value="name"></el-option>
          <el-option key="2" label="类型" value="type"></el-option>
          <el-option key="3" label="产地" value="placeOfOrigin"></el-option>
          <el-option key="4" label="推广标题" value="title"></el-option>
        </el-select>
        <el-input v-model="value" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="searchGoods">搜索</el-button>
      </div>
      <el-table
        :data="storesData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" align="center" sortable width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="120"></el-table-column>
        <el-table-column prop="title" label="推广标题" align="center" width="150"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="method" label="制作材料" align="center"></el-table-column>
        <el-table-column prop="placeOfOrigin" label="产地" align="center"></el-table-column>
        <el-table-column prop="shelfLife" label="保质期" align="center"></el-table-column>
        <el-table-column prop="newPrice" label="售价" align="center"></el-table-column>
        <el-table-column prop="sales" label="销量" align="center"></el-table-column>
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="prevChange"
          @next-click="nextChange"
          :current-page="pagination.curpage"
          :page-sizes="[5, 6, 7, 8]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
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
const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  "storeModule" //模块名
);
export default {
  name: "basetable",
  data() {
    return {
      url: "./vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      id: ""
    };
  },
  computed: {
    ...mapState(["storesData", "pagination", "search"]),
    type: {
      get() {
        return this.search.type;
      },
      set(value) {
        this.setSearch({ ...this.search, type: value });
      }
    },
    value: {
      get() {
        return this.search.value;
      },
      set(value) {
        console.log("搜索类型", value);
        this.setSearch({ ...this.search, value: value });
      }
    }
  },
  methods: {
    // 分页导航
    ...mapMutations([
      "setStoreAddVisible",
      "setStoreGood",
      "setStoreUpdateVisible",
      "setPagination",
      "setSearch",
      "setAddSupplierVisible"
    ]),
    ...mapActions(["setStoregoods", "setStoreGood"]),
    // 点击新增商品
    addStoreGood() {
      this.setStoreAddVisible(true);
    },
    addSupplierGood() {
      console.log(this,78)
      this.setAddSupplierVisible(true);
    },
    searchGoods() {
      console.log("123");
      // this.is_search = true;
      this.setStoregoods();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // 修改弹出框
    handleEdit(index, row) {
      console.log(index, row);
      this.setStoreUpdateVisible(true);
      this.setStoreGood(row._id);
    },
    // 删除
    handleDelete(index, row) {
      this.id = row._id;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      console.log(this.multipleSelection);
      axios({
        url: "/storegoods",
        method: "delete",
        data: {
          data: JSON.stringify(this.multipleSelection)
        }
      }).then(({ data }) => {
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].name + " ";
        }
        this.$message.error("删除成功" + str);
        this.multipleSelection = [];
        this.setStoregoods();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定删除
    deleteRow() {
      this.$message.success("删除成功");
      this.delVisible = false;
      axios({
        url: "/storegoods/" + this.id,
        method: "delete"
      }).then(res => {
        this.setStoregoods();
      });
    },
    handleSizeChange(val) {
      this.setPagination({ ...this.pagination, eachpage: val });
      this.setStoregoods();
    },
    handleCurrentChange(val) {
      this.setPagination({ ...this.pagination, curpage: val });
      this.setStoregoods();
    },
    prevChange(val) {
      this.setPagination({ ...this.pagination, curpage: val - 1 });
      this.setStoregoods();
    },
    nextChange(val) {
      this.setPagination({ ...this.pagination, curpage: val + 1 });
      this.setStoregoods();
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
</style>
