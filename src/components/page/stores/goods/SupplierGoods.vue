<template>
  <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
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
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supplierModules" // 模块名
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
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list;
        });
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
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
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
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  }
};
</script>

<style scoped>
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
