<template>
  <div>
    <el-dialog title="增加店员" :visible.sync="updateVisible" width="50%">
      <el-form ref="clerkform" label-width="50px">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职级" :label-width="formLabelWidth">
          <el-select v-model="grade" placeholder="店员职级" class="handle-select mr10">
            <el-option key="1" label="初级技师" value="初级技师"></el-option>
            <el-option key="2" label="中级技师" value="中级技师"></el-option>
            <el-option key="3" label="高级技师" value="高级技师"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCle()">确 定</el-button>
      </div>
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
  data() {
    return {
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapState([
      "clerkUpdateVisible",
      "storeId",
      "storeInfoData",
      "clerkInfor",
      "updateClerkIndex",
      "clerkInfor"
    ]),
    updateVisible: {
      get() {
        return this.clerkUpdateVisible;
      },
      set(value) {
        this.setClerkUpdateVisible(value);
      }
    },
    name: {
      get() {
        return this.clerkInfor.name;
      },
      set(value) {
        this.setClerkInfor({ ...this.clerkInfor, name: value });
      }
    },
    phone: {
      get() {
        return this.clerkInfor.phone;
      },
      set(value) {
        this.setClerkInfor({ ...this.clerkInfor, phone: value });
      }
    },
    grade: {
      get() {
        return this.clerkInfor.grade;
      },
      set(value) {
        this.setClerkInfor({ ...this.clerkInfor, grade: value });
      }
    }
  },
  methods: {
    ...mapMutations(["setClerkUpdateVisible", "setClerkInfor"]),
    ...mapActions(["setStoreInfoData", "updateClerk"]),
    updateCle() {
      this.updateVisible=false;
      this.$refs.clerkform.resetFields();
        let infor = this.storeInfoData;
      //   delete infor._id;
      //   console.log([...infor.clerk, this.form], 45);
      let arr = [];
      for (let i in this.storeInfoData.clerk) {
        if (i == this.updateClerkIndex) {
          arr.push(this.clerkInfor);
        } else {
          arr.push(this.storeInfoData.clerk[i]);
        }
      }
      console.log(arr)
      this.updateClerk(
          {
          ...infor,
          clerk: JSON.stringify(arr),
          location: JSON.stringify(infor.location)
        }
      );
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
  color: #666;
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
