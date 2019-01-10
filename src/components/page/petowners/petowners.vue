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
                <el-select v-model="type" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="name"></el-option>
                    <el-option key="2" label="湖南省" value="age"></el-option>
                </el-select>
                <el-input v-model="value" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchUser">搜索</el-button>
            </div>
            <el-table :data="petowners" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="电话" sortable width="150">
                </el-table-column>
            
                <el-table-column prop="Nickname" label="昵称" width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="addr" label="送货地址" >
                </el-table-column>
                <el-table-column prop="area" label="区域" >
                </el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-tickets" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="pagination.total" >
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
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
              <el-alert
              title="警告！！！！作为一名优秀的平台管理员，擅自修改用户信息将承担相应的法律责任，我劝你善良！！！"
              type="error">
              </el-alert>
            <el-form ref="form" :model="form" label-width="50px">
                 <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
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
                    <el-input v-model="form.pets[index].birth" ></el-input>
                </el-form-item>
                  <el-form-item label="性格">
                  <el-input v-model="form.pets[index].character" ></el-input>
                </el-form-item>
            </div>
               </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
                    <el-input v-model="form.pets[index].birth" ></el-input>
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
import { mapActions, mapMutations, mapState } from "vuex";
// import { mapState } from "vuex";
// import Pet from "../common/Pet.vue";
// import InputElement from "../common/InputElement.vue";
export default {
  components: {
    // Pet,
    // InputElement
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
      idx: -1,
      id: ""
    };
  },
  created() {
    // this.getData();
    // this.show();
    // this.pagination = pagination;
    // console.log
    console.log(this.pagination);
    this.setPetowners();
  },

  computed: {
    ...mapState(["petowners", "search", "pagination"]),
    type: {
      get() {
        return this.search.type;
      },
      set(value) {
        console.log(value);
        this.$store.commit("setType", value);
      }
    },
    value: {
      get() {
        return this.search.value;
      },
      set(value) {
        this.$store.commit("setValue", value);
      }
    }
  },

  methods: {
    ...mapMutations(["setType", "setValue","setPagination"]),
    ...mapActions(["setPetowners"]),
    show() {
      axios({
        method: "get",
        url: "/petowners"
      }).then(({ data }) => {
        // console.log(data);
        this.petowners = data;
        // console.log(this.petowners);
      });
    },
    showById(id) {
      axios({
        method: "get",
        url: "/petowners/" + id
      }).then(({ data }) => {
        // console.log(this.petowners);
      });
    },
    // 分页导航
    handleCurrentChange(val) {
     this.setPagination({...this.pagination,curpage:val})
      this.setPetowners({val, rows:this.pagination.eachpage});
    },
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
      // console.log(row);
      this.form = row;
      this.editVisible = true;
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
          pwd: this.form.pwd
        }
      }).then(data => {
        this.show();
        // console.log(data);
      });
      // this.form=
    },
    // 删除
    handleDelete(index, row) {
      this.idx = index;
      this.id = row._id;
      // console.log(row);

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

    // 确定删除
    deleteRow() {
      axios({
        method: "delete",
        url: "/petowners/" + this.id
      }).then(({ data }) => {
        this.show();
      });

      // this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
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
