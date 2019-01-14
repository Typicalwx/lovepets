<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 服务表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                
               
                <el-select v-model="select_cate" placeholder="筛选搜索项" class="handle-select mr10">
                     <el-option key="1" label="全部" value=""></el-option>
                    <el-option key="2" label="服务类型" value="servetype"></el-option>
                    <el-option key="3" label="宠物类型" value="pets"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索服务</el-button>
                <Serveadd></Serveadd>
                <Serveupdate></Serveupdate>
            </div>
            <el-table :data="serveitem" border class="table"  @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column align="center" prop="servetype" label="服务类型" sortable width="110">
                </el-table-column>
                <el-table-column align="center" prop="pets" label="宠物类型" width="120">
                </el-table-column>
                <el-table-column align="center" prop="severname" label="服务名称">
                </el-table-column>
                <el-table-column align="center" prop="guige" label="适用规格">
                </el-table-column>
                <el-table-column align="center" prop="servetime" label="预约时间">
                </el-table-column>
                <el-table-column align="center" prop="serveresource" label="服务规格">
                </el-table-column>
                  <el-table-column align="center" prop="price" label="价格">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                 <el-pagination
        @prev-click="prevpage"
        @next-click="nextpage"
        @current-change="currentchange"
        background
        :current-page="pagenation.curpage "
        layout="prev, pager, next,sizes,jumper"
        :page-sizes="[5,10]"
        :total="pagenation.total"
        :page-size="pagenation.eachpage"
        @size-change="sizechange"
        >
    </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

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
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("store");
const { mapState:gession} = createNamespacedHelpers(
  "storeModule"
);
import Serveadd from "./Serveadd";
import Serveupdate from "./Serveupdate";
export default {
  name: "basetable",
  data() {
    return {
      curpage: "",
      tableData: [1, 2],
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
  mounted() {
    
    console.log("刷新",this.storeId)
    //  console.log(localStorage.getItem(key) )
    this.show({ page: 1, rows: 5,storeId:this.storeId});
  },
  computed: {
    ...mapState(["serveitem", "pagenation"]),
    ...gession(["storeId"]),
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
  components: {
    Serveadd,
    Serveupdate
  },
  methods: {
    ...mapMutations(["setupdateeditVisible", "settype", "settext"]),
    ...mapActions(["updatserve", "show"]),

    // 分页导航
    prevpage(page) {
      // console.log(page);
      this.show({ page, rows: this.curpage,storeId:this.storeId });
    },
    nextpage(page) {
      this.show({ page, rows: this.curpage,storeId:this.storeId });
    },
    currentchange(page) {
      this.show({ page, rows: this.curpage,storeId:this.storeId });
    },
    sizechange(rows) {
      // console.log(page)
      this.curpage = rows;
      this.show({ page: this.pagenation.curpage,rows ,storeId:this.storeId});
    },
    // 获取 easy-mock 的模拟数据
    search() {
      // console.log("啊哈哈哈",this.storeId)
        this.settype(this.select_cate);
        this.settext(this.select_word);
        this.show({ page: 1, rows: 5,storeId:this.storeId});
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.updatserve(row._id);
      this.setupdateeditVisible(true);
    },
    handleDelete(index, row) {
      axios({
        method: "delete",
        url: "/servetime/" + row._id
      }).then(res => {
        axios({
          method: "get",
          url: "/servetime/deleteserve",
          params: {
            page: this.pagenation.curpage,
            rows: this.pagenation.eachpage
          }
        }).then(res => {
          console.log(res.data.rows)
          if (res.data.rows.length == 0) {
            this.show({
              page: this.pagenation.curpage - 1,
              rows: this.pagenation.eachpage,
              storeId:this.storeId
            });
          } else {
            this.show({
              page: this.pagenation.curpage,
              rows: this.pagenation.eachpage,
              storeId:this.storeId
            });
          }
        });
      });
    },
    delAll() {
      //待解决
      const length = this.serveitem.length;
      let str = "";
      this.del_list = this.del_list.concat(this.serveitem);
      // for (let i = 0; i < length; i++) {
      //     str += this.serveitem[i].name + ' ';
      // }
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
  display: flex;
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

