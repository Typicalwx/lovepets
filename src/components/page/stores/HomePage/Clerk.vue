<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button @click="addClerk" class="handle-del mr10">新增商品</el-button>
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
          <el-option key="1" label="姓名" value="name"></el-option>
          <el-option key="2" label="职级" value="grade"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="searchClerk">搜索</el-button> -->
      </div>
      <el-table
        :data="clerkData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="120"></el-table-column>
        <el-table-column prop="grade" label="职级" align="center" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center" width="180"></el-table-column>
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
          :current-page="clerkPage.curpage"
          :page-sizes="[5, 6, 7, 8]"
          :page-size="clerkPage.eachpage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="clerkPage.total"
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
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      id: "",
      index: -1,
      clerk: []
    };
  },
  computed: {
    ...mapState([
      "storeInfoData",
      "storeId",
      "search",
      "clerkPage",
      "clerkData"
    ]),
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
      "setClerkUpdateVisible",
      "setAddClerkVisible",
      "setClerkInfor",
      "setUpdateClerkIndex",
      "setSearch",
      "setClerkData",
      "setClerkPage"
    ]),
    ...mapActions(["setStoreInfoData", "setStoreGood", "updateClerk"]),
    setListData(page = 1, rows = 5) {
      let arr = [];
      for (let i = (page - 1) * rows; i < rows * page; i++) {
        console.log(this.storeInfoData.clerk);
        if (this.storeInfoData.clerk) {
          if (i < this.storeInfoData.clerk.length) {
            // console.log("qwefvfdsf")
            arr.push(this.storeInfoData.clerk[i]);
          } else {
            break;
          }
        }
      }
      console.log(arr, "小");
      this.setClerkData(arr);
    },
    // 点击新增商品
    addClerk() {
      this.setAddClerkVisible(true);
    },
    searchClerk() {
      this.setStoreInfoData();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // 修改弹出框
    handleEdit(index, row) {
      // console.log(index, row);
      console.log(index);
      let page = (this.clerkPage.curpage - 1) * this.clerkPage.eachpage;
      console.log(page);
      this.setUpdateClerkIndex(page + index);
      this.setClerkUpdateVisible(true);
      this.setClerkInfor(this.storeInfoData.clerk[page + index]);
      // this.setClerkInfor(this.storeInfoData.clerk[page + index]);
      // this.setListData(this.clerkPage.curpage, this.clerkPage.eachpage);
    },
    // 删除
    handleDelete(index, row) {
      this.index = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let deleteData = this.multipleSelection;
      let str = "";
      console.log(444);
      console.log(deleteData, 77);
      let clerk = this.storeInfoData.clerk;
      let arr = [];
      let j = 0;
      if (deleteData.length != 0) {
        for (let i = 0; i < clerk.length; i++) {
          // console.log(this.multipleSelection[i].phone);

          for (j = 0; j < deleteData.length; j++) {
            console.log(deleteData[j].phone, clerk[i].phone);
            if (deleteData[j].phone == clerk[i].phone) {
              break;
            }
          }
          // for()
          console.log(j);
          if (j == deleteData.length - 1) {
            arr.push(clerk[i]);
          }
        }
      }
      console.log(arr);
      this.updateClerk({
        ...this.storeInfoData,
        clerk: JSON.stringify(arr),
        location: JSON.stringify(this.storeInfoData.location)
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定删除
    deleteRow() {
      this.$message.success("删除成功");
      this.delVisible = false;
      let clerk = this.storeInfoData.clerk;
      let arr = [];
      for (let i in clerk) {
        if (i != this.index) {
          arr.push(clerk[i]);
        }
      }
      console.log(arr);
      this.updateClerk({
        ...this.storeInfoData,
        clerk: JSON.stringify(arr),
        location: JSON.stringify(this.storeInfoData.location)
      });
    },
    handleSizeChange(val) {
      console.log(val);
      this.setClerkPage({ ...this.clerkPage, eachpage: val });
      this.setListData(this.clerkPage.curpage, val);
    },
    handleCurrentChange(val) {
      this.setClerkPage({ ...this.clerkPage, curpage: val });
      this.setListData(val, this.clerkPage.eachpage);
    },
    prevChange(val) {
      this.setClerkPage({ ...this.clerkPage, curpage: val - 1 });
      this.setListData(val, this.clerkPage.eachpage);
    },
    nextChange(val) {
      this.setClerkPage({ ...this.clerkPage, curpage: val + 1 });
      this.setListData(val, this.clerkPage.eachpage);
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
