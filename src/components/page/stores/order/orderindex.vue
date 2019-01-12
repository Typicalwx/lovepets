<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 未完成订单表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="筛选状态" class="handle-select mr10">
                     <el-option  label="全部" value=""></el-option>
                     <el-option key="1" label="发货状态" value="statebuytwo"></el-option>
                     <el-option key="2" label="付款状态" value="butornobuytwo"></el-option>
                     <el-option key="3" label="订单编号" value="outTradeNo"></el-option>
                </el-select>
                <!-- <el-select v-model="select_cate1" placeholder="关键词搜索" class="handle-select mr10">
                    <el-option key="1" label="购买状态" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="orderitem"  border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column align="center"  label="发货状态" width="100">
                      <template slot-scope="scope">      
                    <el-tag v-if="scope.row.statebuy" type="success">已发货</el-tag>
                    <el-tag v-else type="danger">未发货</el-tag>
                     </template>
                </el-table-column>
                <el-table-column align="center"  label="购买状态" width="100">
                      <template slot-scope="scope">      
                    <el-tag v-if="scope.row.butornobuy" type="success">已付款</el-tag>
                    <el-tag v-else type="danger">未付款</el-tag>
                     </template>
                </el-table-column>
                <el-table-column align="center" prop="petmaster.name" label="买家"  width="130">
                </el-table-column>
                  <el-table-column align="center" prop="petmaster.phone" label="手机号"  width="130">
                </el-table-column>
                 <el-table-column align="center" prop="petmaster.addr" label="买家地址"  >
                </el-table-column>
                <el-table-column align="center" prop="outTradeNo" label="订单编号"  width="260">
                </el-table-column>
                <el-table-column align="center" class="el-icon-time"   label="购买时间" width="250">
                     <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.buytime }}</span>
      </template>
                </el-table-column>
                  <el-table-column align="center" prop="ordertotal1" label="总金额" >
                </el-table-column>
                  
                  <el-table-column align="center"  label="商品详情" >
                       <template slot-scope="scope">         
                       <el-button type="warning" plain @click="xiangqing(scope.$index, scope.row)">详情</el-button>
                        </template>
                </el-table-column>
                
              
                <el-table-column label="订单操作" width="180" align="center">
                    <template slot-scope="scope">          
                                <el-switch
                                     :value="scope.row.statebuy"
                                     @change="changeanniu(scope.row)"
                                     active-color="#13ce66"
                                     inactive-color="#ff4949">
                                  </el-switch>
                    </template>
                </el-table-column>
            </el-table>
             <div class="pagination">
                 <el-pagination
        @prev-click="prevpage"
        @next-click="nextpage"
        @current-change="currentchange"
        background
        :current-page="pagenationbuy.curpage "
        layout="prev, pager, next,sizes,jumper"
        :page-sizes="[5,10]"
        :total="pagenationbuy.total"
        :page-size="pagenationbuy.eachpage"
        @size-change="sizechange"
        >
    </el-pagination>
            </div>
        </div>



        <Orderbuied></Orderbuied>
        <Ordershow :spanArr="spanArr" :position="position"></Ordershow>

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
import Orderbuied from "./orderbuied";
import Ordershow from "./ordershow"

const { mapState, mapActions, mapMutations } = createNamespacedHelpers("store");
export default {
  name: "basetable",
  components: {
    Orderbuied,Ordershow
  },
  data() {
    return {
      select_cate1:"",
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
      spanArr:[],
      spanArr1:[],
      position:0,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      value1: true,
      value2: true
    };
  },
  created() {
    this.showorder();
    this.showorderbuied();
  },
  computed: {
    ...mapState(["orderitem", "pagenationbuy","contactarr"]),
   
  },
  methods: {
       ...mapActions(["showorder", "showorderbuied","showbyid"]),
        ...mapMutations(["setweigoummai","settypeone","settextone"]),
      xiangqing(index,rows){
          this.setweigoummai(true)
          this.showbyid(rows._id)
          // this.rowspan();
      },

    prevpage(page) {
      this.showorder({ page, rows: this.curpage });
    },
    nextpage(page) {
      this.showorder({ page, rows: this.curpage });
    },
    currentchange(page) {
      this.showorder({ page, rows: this.curpage });
    },
    sizechange(rows) {
      // console.log(page)
      this.curpage = rows;
      this.showorder({ page: this.pagenationbuy.curpage, rows });
    },
    changeanniu(i) {
      let statebuy = i.statebuy ? false : true;
      let statebuytwo = i.statebuytwo=="未发货"?"已发货":"未发货"
      axios({
        method: "put",
        url: "/orderbuy/" + i._id,
        data: {
          statebuy,
          statebuytwo
        }
      }).then(res => {
        axios({
          method: "get",
          url: "/orderbuy",
          params: {
            page: this.pagenationbuy.curpage,
            rows: this.pagenationbuy.eachpage
          }
        }).then(res => {
          if (res.data.rows.length == 0) {
            this.showorder({
              page: this.pagenationbuy.curpage - 1,
              rows: this.pagenationbuy.eachpage
            });
            this.showorderbuied();
          } else {
            this.showorder({
              page: this.pagenationbuy.curpage,
              rows: this.pagenationbuy.eachpage
            });
            this.showorderbuied();
          }
        });
      });
    },
    // 分页导航

    search() {
         this.settypeone(this.select_cate);
         this.settextone(this.select_word);
         this.showorder({ page: 1, rows: 5 });
      
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

