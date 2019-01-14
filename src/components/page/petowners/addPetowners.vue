<template>
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
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
// import { mapActions, mapMutations, mapState } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "petowner" // 模块名
);
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

  computed: {
    ...mapState(["petowners", "search", "pagination"]),
  },
  methods: {
    ...mapActions(["setPetowners"]),
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
      console.log(row);
      this.form = row;
      this.editVisible = true;
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
      }).then(()=> {
        // this.$store.commit("setPetowner", value);
         this.setPetowners();
        // console.log(data);
      });
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
</script>

<style>
</style>
