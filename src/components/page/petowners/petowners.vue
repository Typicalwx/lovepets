<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-add " @click="add">增加宠主</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="type" placeholder="筛选" class="handle-select mr10">
                   <el-option key="0" label="全部" value="all"></el-option>
                <el-option key="1" label="姓名" value="name"></el-option>
                <el-option key="2" label="电话" value="phone"></el-option>
                <el-option key="3" label="昵称" value="Nickname"></el-option>
                <el-option key="4" label="区域" value="area"></el-option>
                </el-select>
                <el-input v-model="value" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchUser">搜索</el-button>
            </div>
            <el-table :data="petowners" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="电话" sortable width="120" align="center">
                </el-table-column>
            
                <el-table-column prop="Nickname" label="昵称" width="120" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120" align="center">
                </el-table-column>
                <el-table-column prop="addr" label="送货地址" align="center">
                </el-table-column>
                <el-table-column prop="area" label="区域" align="center">
                </el-table-column>
                  <el-table-column   label="状态" width="80" align="center">
                    <template slot-scope="scope" >
                      <div v-if="scope.row.state=='正常'" class="green"><i class="el-icon-success"></i> {{scope.row.state}}</div>
                              <div v-else class="red"><i class="el-icon-warning"></i> {{scope.row.state}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-tickets" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.state">封禁</el-button> -->
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.state=='正常'">封禁</el-button>
                         <el-button type="text" icon="el-icon-delete" class="green" @click="handleDelete(scope.$index, scope.row)" v-else>解除封禁</el-button>
                    </template>
                     
                </el-table-column>
            </el-table>
            <div class="pagination">
                <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="pagination.total" >
                </el-pagination> -->
                 <el-pagination
               background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="5" 
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
                </el-pagination>
            </div>
        </div>
 <!-- 详情弹出框 -->
        <el-dialog title="详情" :visible.sync="detailsVisible" width="30%">
            <el-form ref="form" label-width="50px">
                <el-form-item label="电话">
                    <el-input v-model="form.phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="送货地址">
                    <el-input v-model="form.addr" :disabled="true"></el-input>
                </el-form-item>
               <el-form-item label="区域">
                    <el-input v-model="form.area" :disabled="true"></el-input>
                </el-form-item>
               
                 <el-form-item label="状态">
                    <el-input v-model="form.state" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="宠物">
                     <el-table :data="form.pets" >
                <el-table-column  width="20" align="center">
                </el-table-column>
                <el-table-column prop="name" label="宠物名"  width="70">
                </el-table-column>
                <el-table-column prop="variety" label="品类" width="70">
                </el-table-column>
                <el-table-column prop="type" label="种类" width="60">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期" width="80">
                </el-table-column>
                <el-table-column prop="character" label="性格" >
                </el-table-column>
               </el-table>
               </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">

                <el-button type="primary" @click="detailsVisible = false">确 定</el-button>
            </span>
        </el-dialog>

       <!-- 增加弹出框 -->
        <el-dialog title="增加" :visible.sync="addVisible" width="25%">
       
            <el-form  label-width="50px">
                 <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                 </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.Nickname"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="送货地址">
                    <el-input v-model="form.addr"></el-input>
                </el-form-item>
               <el-form-item label="区域">
                    <el-input v-model="form.area"></el-input>
                </el-form-item>
                <el-form-item label="宠物">
                <div v-for="(item,index) in form.pets" :key="index" class="agent-vlist">
	<!-- 增加宠物 -->
              <el-form-item class="center">宠物{{index+1}} </el-form-item>
              <el-form-item label="宠物名">
                    <el-input v-model="form.pets[index].name" ></el-input>
                </el-form-item>
                  <el-form-item label="品类">
                    <el-input v-model="form.pets[index].variety" ></el-input>
                </el-form-item>
                  <el-form-item label="种类">
                    <el-input v-model="form.pets[index].type" ></el-input>
                </el-form-item>
                      <el-form-item label="颜色">
                    <el-input v-model="form.pets[index].color" ></el-input>
                </el-form-item>
                  <el-form-item label="出生日期">
                     <el-date-picker
                      v-model="form.pets[index].birth"
                      type="date"
                      value-format="yyyy-M-d"
                      placeholder="选择日期">
                   </el-date-picker>
                    <!-- <el-input v-model="form.pets[index].birth" ></el-input> -->
                </el-form-item>
                  <el-form-item label="性格">
                  <el-input v-model="form.pets[index].character" ></el-input>
                </el-form-item>
            <el-button type="plain" size="mini" class="center" @click="delet(index)">删除</el-button>
               </div>
                <el-button type="primary" icon="el-icon-edit" @click="addPets">增加宠物</el-button>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">确认修改？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
// import { mapActions, mapMutations, mapState } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "petowner" // 模块名
);
// import { mapState } from "vuex";
// import Pet from "../common/Pet.vue";

export default {
  components: {
    // Pet,
    // UpdatePetowners
  },
  name: "basetable",
  data() {
    return {
      addVisible: false,
      detailsVisible: false,
      editVisible: false,
      delVisible: false,
      form: {
        Nickname: "",
        name: "",
        addr: "",
        area: "",
        pets: [],
        phone: "",
        pwd: ""
      },
      state: "",
      idx: -1,
      id: ""
    };
  },
  created() {
    this.setPetowners();
    // console.log(this.petowners);
  },
  computed: {
    ...mapState(["petowners", "search", "pagination", "updateVisible"]),
    type: {
      get() {
        return this.search.type;
      },
      set(value) {
        if (value == "all") {
          value = null;
        }
        console.log(value);
        this.$store.commit("petowner/setType", value);
      }
    },
    value: {
      get() {
        return this.search.value;
      },
      set(value) {
        this.$store.commit("petowner/setValue", value);
      }
    },
    updatePetowners: {
      get() {
        return this.updatePetowners;
      },
      set(value) {
        this.setUpdatePetowners(value);
      }
    }
  },
  methods: {
    ...mapMutations([
      "setType",
      "setValue",
      "setPagination",
      "setUpdateVisible",
      "setPetowner",
      "setUpdatePetowners"
    ]),
    ...mapActions(["setPetowners"]),

    // 分页导航
    handleCurrentChange(val) {
      this.setPagination({ ...this.pagination, curpage: val });
      this.setPetowners({ val, rows: this.pagination.eachpage });
    },
    handleSizeChange() {},
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      //   if (process.env.NODE_ENV === "development") {
      //     this.url = "/ms/table/list";
      //   }
      //   this.$axios
      //     .post(this.url, {
      //       page: this.cur_page
      //     })
      //     .then(res => {
      //       this.tableData = res.data.list;
      //     });
    },
    searchUser() {
      this.setPetowners();
    },

    // 详情
    handleDetails(index, row) {
      this.detailsVisible = true;
      this.form = row;
      // console.log(this.form);
    },
    handleEdit(index, row) {
      this.idx = index;
      this.id = row._id;
      this.form.pets = row.pets;
      console.log(row.pets);
      this.updatePetowners = row;
      this.setUpdateVisible(true);
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      axios({
        method: "put",
        url: "/petowners/" + this.id,
        data: {
          phone: this.form.phone,
          name: this.form.name,
          Nickname: this.form.Nickname,
          addr: this.form.addr,
          area: this.form.area,
          pets: JSON.stringify(this.form.pets),
          pwd: this.form.pwd
        }
      }).then(({ data }) => {
        console.log(data);
        this.show();
      });
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },

    // 增加
    add() {
      (this.form = {
        Nickname: "",
        name: "",
        addr: "",
        area: "",
        pets: [],
        phone: "",
        pwd: ""
      }),
        (this.form.pets = []);
      this.addVisible = true;
      // console.log(this.form.name)
    },
    saveAdd() {
      this.addVisible = false;
      // console.log(this.form);
      axios({
        method: "post",
        url: "/petowners",
        data: {
          phone: this.form.phone,
          name: this.form.name,
          Nickname: this.form.Nickname,
          addr: this.form.addr,
          area: this.form.area,
          pets: JSON.stringify(this.form.pets),
          pwd: this.form.pwd,
          state: 1
        }
      }).then(() => {
        // this.$store.commit("setPetowner", value);
        this.setPetowners();
        // console.log(data);
      });
    },
    // 封禁
    handleDelete(index, row) {
      this.idx = index;
      this.id = row._id;
      this.state = row.state;
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

    // 确定删除
    deleteRow() {
      this.delVisible = false;
      console.log(this.state == "正常");
      if (this.state == "正常") {
        axios({
          method: "put",
          url: "/petowners/" + this.id,
          data: {
            state: 3
          }
        }).then(({ data }) => {
          console.log(data);
          this.$message.success("修改状态成功");
          this.delVisible = false;
          this.setPetowners();
        });
      } else {
        axios({
          method: "put",
          url: "/petowners/" + this.id,
          data: {
            state: 1
          }
        }).then(({ data }) => {
          this.$message.success("修改状态成功");
          this.delVisible = false;
          this.setPetowners();
        });
      }

      // this.tableData.splice(this.idx, 1);
    },

    // 添加宠物之增加输入框
    addPets() {
      let obj = {
        name: "",
        variety: "",
        type: "",
        color: "",
        birth: "",
        character: ""
      };
      this.form.pets.push(obj);
    },
    // 添加宠物之删除输入框
    delet(index) {
      this.form.pets.splice(index, 1);
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
</style>
