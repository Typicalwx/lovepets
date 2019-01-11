<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
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
            <el-table :data="storeAdministrator" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="users.account" label="登录名" sortable width="150">
                </el-table-column>
                <el-table-column prop="users.phone" label="手机号" width="120">
                </el-table-column>
                <el-table-column prop="users.name" label="姓名" >
                </el-table-column>
                  <el-table-column prop="users.state" label="状态" >
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
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-tickets" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog title="详情" :visible.sync="detailsVisible" width="30%">
            <el-form ref="form" label-width="50px">
                   <el-form-item label="登录账号">
                    <el-input v-model="form.account" :disabled="true"></el-input>
                </el-form-item>
                    <el-form-item label="登录密码">
                    <el-input v-model="form.apwd" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input v-model="form.role" :disabled="true"></el-input>
                </el-form-item>
               <el-form-item label="状态">
                    <el-input v-model="form.state" :disabled="true"></el-input>
                </el-form-item>
              <el-form-item label="店名">
                    <el-input v-model="detail.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码">
                    <el-input v-model="detail.number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="营业执照图片">
                     <el-upload
                 action="/upload"
                 list-type="picture-card"
                :file-list="detail.licenseImage">
                 </el-upload>
                 <el-dialog >
                 <img width="100%" :src="detail.licenseImage" alt>
               </el-dialog>
                </el-form-item>
                <el-form-item label="营业地址">
                    <el-input v-model="detail.addr" :disabled="true"></el-input>
                </el-form-item>
                 <el-form-item label="所在城市">
                    <el-input v-model="detail.city" :disabled="true"></el-input>
                </el-form-item>
                <!-- <el-form-item label="定位">
                    <el-input v-model="detail.location"></el-input>
                </el-form-item> -->
                 <el-form-item label="法人">
                    <el-input v-model="detail.legal" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="detail.phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                    <el-input v-model="detail.storeImage" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">

                <el-button type="primary" @click="detailsVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="店名">
                    <el-input v-model="detail.name"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码">
                    <el-input v-model="detail.number"></el-input>
                </el-form-item>
                <el-form-item label="营业执照图片">
                   <el-upload
                 action="/upload"
                 list-type="picture-card"
                 :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="detail.licenseImage">
                <i class="el-icon-plus"></i>
                 </el-upload>
                 <el-dialog :visible.sync="dialogVisible">
                 <img width="100%" :src="dialogImageUrl" alt>
               </el-dialog>
                </el-form-item>
                <el-form-item label="营业地址">
                    <el-input v-model="detail.addr"></el-input>
                </el-form-item>
                 <el-form-item label="所在城市">
                    <el-input v-model="detail.city"></el-input>
                </el-form-item>
                <el-form-item label="定位">
                    <el-input v-model="detail.location"></el-input>
                </el-form-item>
                 <el-form-item label="法人">
                    <el-input v-model="detail.legal"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="detail.phone"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                    <el-input v-model="detail.storeImage"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
       <!-- 增加弹门店登录账号信息出框 -->
        <el-dialog class="adduser" title="增加登录信息" :visible.sync="addVisible" width="25%">
            <el-form  label-width="80px">
                 <el-form-item label="登录名">
                    <el-input v-model="form.account"></el-input>
                 </el-form-item>
                  <el-form-item label="登录密码">
                    <el-input v-model="form.pwd"></el-input>
                 </el-form-item>
                  <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                   <el-form-item label="真实姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
         <!-- 增加弹门店详细信息出框 -->
        <el-dialog class="adduser" title="增加详细信息" :visible.sync="addDetaliVisible" width="25%">
            <el-form  label-width="80px">
                <el-form-item label="店名">
                    <el-input v-model="detail.name"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码">
                    <el-input v-model="detail.number"></el-input>
                </el-form-item>
                <el-form-item label="营业执照图片">

                 <el-upload
                 action="/upload"
                 list-type="picture-card"
                 :on-success="handleAvatarSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="detail.licenseImage">
                <i class="el-icon-plus"></i>
                 </el-upload>
                 <el-dialog :visible.sync="dialogVisible">
                 <img width="100%" :src="dialogImageUrl" alt>
               </el-dialog>
                    <el-input v-model="detail.licenseImage"></el-input>
                </el-form-item>
                <el-form-item label="营业地址">
                    <el-input v-model="detail.addr"></el-input>
                </el-form-item>
                 <el-form-item label="所在城市">
                    <el-input v-model="detail.city"></el-input>
                </el-form-item>
                <el-form-item label="定位">
                    <el-input v-model="detail.location"></el-input>
                </el-form-item>
                 <el-form-item label="法人">
                    <el-input v-model="detail.legal"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="detail.phone"></el-input>
                </el-form-item>
                <el-form-item label="头图">
                    <el-input v-model="detail.storeImage"></el-input>
                </el-form-item>
                <!-- <el-form-item label="VIP等级">
                    <el-input v-model="detail.area"></el-input>
                </el-form-item> -->
            
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDetaliVisible = false">取消</el-button>
                <el-button type="primary" @click="saveDetail">确 定</el-button>
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
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeAdministrator" // 模块名
);
export default {
  components: {
    // Pet,
    // InputElement
  },
  name: "basetable",
  data() {
    return {
      dialogImageUrl: [],
      dialogVisible: false,
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
        pwd: ""
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
      id: ""
    };
  },
  created() {
    // console.log(this.storeAdministrator);
    this.setStoreAdministrator();
  },

  computed: {
    ...mapState(["storeAdministrator", "search", "pagination"]),
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
    ...mapMutations(["setType", "setValue", "setPagination"]),
    ...mapActions(["setStoreAdministrator"]),
    showById(id) {
      axios({
        method: "get",
        url: "/petowners/" + id
      }).then(() => {});
    },
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
      this.detailsVisible = true;
      this.form = row.users;
      this.detail = row;
      console.log(row);
    },
    // 编辑
    handleEdit(index, row) {
      this.idx = index;
      this.id = row._id;
      // console.log(row);
      this.detail = row;
      this.editVisible = true;
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
          storeImage: this.detail.storeImage
        }
      }).then(() => {
        // console.log(data);
        this.setStoreAdministrator();
      });
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 增加
    add() {
      (this.form = {
        account: "",
        name: "",
        phone: "",
        pwd: ""
      }),
        (this.form.pets = []);
      this.addVisible = true;
    },
    // 保存增加
    saveAdd() {
      this.addVisible = false;
      // console.log(this.form);
      axios({
        method: "post",
        url: "/users",
        data: {
          role: "门店管理员",
          state: 1,
          account: this.form.account,
          phone: this.form.phone,
          name: this.form.name,
          pwd: this.form.pwd
        }
      }).then(({ data }) => {
        console.log(data);
        this.addDetaliVisible = true;
        this.id = data._id;
        // console.log(data);
      });
    },

    // 增加门店详情

    saveDetail() {
      console.log(this.id);
      axios({
        method: "post",
        url: "/stores",
        data: {
          userId: this.id,
          name: this.detail.name,
          number: this.detail.number,
          licenseImage: this.detail.licenseImage,
          addr: this.detail.addr,
          city: this.detail.city,
          legal: this.detail.legal,
          location: JSON.stringify(this.detail.location),
          phone: this.detail.phone,
          storeImage: this.detail.storeImage,
          clerk: JSON.stringify([]),
          commission: 0.004
        }
      }).then(({ data }) => {
        console.log(data);
        this.addDetaliVisible = false;
        this.setStoreAdministrator();
      });
    },
    // 删除
    handleDelete(index, row) {
      this.idx = index;
      this.id = row._id;
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
        url: "/storeAdministrator/" + this.id
      }).then(() => {
        this.setStoreAdministrator();
      });
      this.$message.success("删除成功");
      this.delVisible = false;
    },

    handleAvatarSuccess(res, file) {
      this.detail.licenseImage = [
        ...this.detail.licenseImage,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);

      let imgArr = this.detail.licenseImage;
      for (let i in imgArr) {
        if (imgArr[i].uid == file.uid) {
          // console.log("ID", imgArr[i].uid);
          // console.log(i, 11111);
          imgArr.splice(i, 1);
        }
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
.adduser {
  text-align: center;
}
</style>
