<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 门店列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-add " @click="add">增加门店</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="type" placeholder="筛选" class="handle-select mr10">
                   <el-option key="0" label="全部" value=""></el-option>
                <el-option key="1" label="姓名" value="name"></el-option>
                <el-option key="2" label="电话" value="phone"></el-option>
                <el-option key="3" label="昵称" value="Nickname"></el-option>
                <el-option key="4" label="区域" value="area"></el-option>
                </el-select>
                <el-input v-model="value" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchUser">搜索</el-button>
            </div>
            <el-table :data="storeAdministrator" border class="table" ref="multipleTable">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="users.account" label="登录名" sortable width="150">
                </el-table-column>
                <el-table-column prop="users.phone" label="手机号" width="120">
                </el-table-column>
                <el-table-column prop="users.name" label="姓名" >
                </el-table-column>
                   <el-table-column prop="name" label="门店名" >
                </el-table-column>
                   <el-table-column prop="number" label="营业执照号码" >
                </el-table-column>
                   <el-table-column prop="city" label="所在城市" >
                </el-table-column>
                   <el-table-column prop="legal" label="法人" >
                </el-table-column>
                   <el-table-column prop="phone" label="联系电话" >
                </el-table-column>
                  <el-table-column   label="状态" width="80" align="center">
                    <template slot-scope="scope" >
                      <div  v-if="scope.row.users.state=='可用'" class="green"> <i class="el-icon-success"></i> {{scope.row.users.state}}</div>
                              <div v-else class="red"> <i class="el-icon-warning"></i>{{ scope.row.users.state}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-tickets" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.users.state=='可用'">封禁</el-button>
                         <el-button type="text" icon="el-icon-delete" class="green" @click="handleDelete(scope.$index, scope.row)" v-else>解除封禁</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
             <el-pagination
               background
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="5" 
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
                 </el-pagination>
              </div>
            </div>
       <!-- 详情弹出框 -->
            <Detail :form="form" :detail="detail"></Detail>

        <!-- 编辑弹出框 -->
            <Update></Update>
<!-- 增加 -->
           <AddStore :detail="detail"></AddStore>
        <!--提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">确定？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from "axios";
import AddStore from "./AddStore";
import Detail from "./Detail";
import Update from "./Update";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeAdministrator" // 模块名
);
export default {
  components: {
    AddStore,
    Detail,
    Update
  },
  name: "basetable",
  data() {
    return {
      red: "red",
      green: "green",

      licenseImage: "",
      dialogVisible: false,
      storeImage: "",
      addVisible: false,
      addDetaliVisible: false,
      detailsVisible: false,
      editVisible: false,
      delVisible: false,
      form: {
        account: "",
        name: "", //用户名称name
        addr: "",
        area: "",
        phone: "",
        pwd: "",
        state: ""
      },
      detail: {
        name: "", //点名name
        number: "",
        licenseImage: "", //营业执照图
        addr: "",
        city: "",
        legal: "", //法人
        location: "",
        phone: "",
        storeImage: "",
        phone: "",
        commission: "" //佣金
      },
      idx: -1,
      id: "",
      usersId: ""
    };
  },
  created() {
    this.setStoreAdministrator();
  },

  computed: {
    ...mapState([
      "storeAdministrator",
      "search",
      "pagination",
      "updateStore",
      "storeId"
    ]),
    type: {
      get() {
        return this.search.type;
      },
      set(value) {
        this.$store.commit("storeAdministrator/setType", value);
      }
    },
    value: {
      get() {
        return this.search.value;
      },
      set(value) {
        this.$store.commit("storeAdministrator/setValue", value);
      }
    }
  },
  methods: {
    ...mapMutations([
      "setType",
      "setValue",
      "setAddVisible",
      "setDetailsVisible",
      "setPagination",
      "setUpdateVisible",
      "setUpdateStore",
      "setStoreId"
    ]),
    ...mapActions(["setStoreAdministrator"]),

    // 分页导航
    handleCurrentChange(val) {
      this.setPagination({ ...this.pagination, curpage: val });
      this.setStoreAdministrator({ rows: this.pagination.eachpage });
    },
    // 搜索
    searchUser() {
      this.setStoreAdministrator();
    },
    // 详情
    handleDetails(index, row) {
      this.setDetailsVisible(true);
      this.form = row.users;
      this.detail = row;
      // console.log(this.form);
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = index;
      this.id = row._id;
      console.log(row);
      // this.detail = row;
      this.setStoreId(row._id);
      this.setUpdateStore(row);
      this.setUpdateVisible(true);
    },
    // 保存编辑

    saveEdit() {
      this.editVisible = false;
      axios({
        method: "put",
        url: "/stores/" + this.id,
        data: {
          phone: this.detail.phone,
          name: this.detail.name,
          number: this.detail.number,
          licenseImage: this.detail.licenseImage,
          addr: this.detail.addr,
          city: this.detail.city,
          legal: this.detail.legal,
          addr: this.detail.addr,
          area: this.detail.area,
          location: JSON.stringify(this.detail.location),
          storeImage: this.storeImage
        }
      }).then(() => {
        // console.log(data);
        this.setStoreAdministrator();
      });
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 增加
    add() {
      this.setAddVisible(true);
    },

    // 删除

    handleDelete(index, row) {
      console.log(row);
      this.idx = index;
      this.id = row._id;
      this.usersId = row.users._id;
      this.form.sate = row.users.state;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      // this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 确定封禁
    deleteRow() {
      console.log("id", this.usersId);
      console.log("state", this.form.sate == "可用");
      if (this.form.sate == "可用") {
        axios({
          method: "put",
          url: "/users/" + this.usersId,
          data: {
            state: 3
          }
        }).then(() => {
          this.$message({
            message: "店铺状态为不可用",
            type: "warning"
          });
          this.setStoreAdministrator();
          this.delVisible = false;
        });
      } else {
        axios({
          method: "put",
          url: "/users/" + this.usersId,
          data: {
            state: 1
          }
        }).then(() => {
          this.$message({
            message: "店铺状态为可用",
            type: "success"
          });
          this.setStoreAdministrator();
          this.delVisible = false;
        });
      }
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
.green {
  color: forestgreen;
}
.mr10 {
  margin-right: 10px;
}
.center {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.cell {
  display: flex;
  justify-content: space-between;
}
.agent-vlist {
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}
.adduser {
  text-align: center;
}
</style>
