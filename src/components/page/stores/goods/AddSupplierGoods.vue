<template>
  <div>
    <el-dialog title="增加商品" :visible.sync="addvisible" width="92%">
      <el-table
        :data="suppliergoods"
        border
        class="table"
        ref="multipleTable"
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
        <el-table-column label="图片" width="150" align="center">
          <template slot-scope="scope">
            <img class="goodImages" :src="scope.row.images[0].url" alt>
            <img class="goodImages" :src="scope.row.images[1].url" alt>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addvisible = false">取 消</el-button>
        <el-button type="primary" @click="addStoreGood('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supplierModules"
);

const {
  mapActions: supplierAction,
  mapState: supplierState,
  mapMutations: supplierMuta
} = createNamespacedHelpers("storeModule");

export default {
  computed: {
    ...mapState(["suppliergoods", "addSupplierGoodsVisible"]),
    ...supplierState(["addSupplierGoodsVisible"]),
    addvisible: {
      get() {
        return this.addSupplierGoodsVisible;
      },
      set(value) {
        this.setAddSupplierVisible(value);
      }
    }
  },
  created() {
    this.setSuppliergoods();
  },
  name: "basetable",
  data() {
    return {
      suppliergoodsId: "",
      url: "./vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
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

  methods: {
    ...mapActions(["setSuppliergoods"]),
    ...mapMutations(["setAddVisible", "setUpdateVisible"]),
    ...supplierMuta([
      "setAddSupplierVisible",
      "setSupplierGood",
      "setSupplierId",
      "setStoreAddVisible"
    ]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 选择色添加的商品
    addStoreGood() {
      if (this.multipleSelection.length == 0) {
        this.addvisible = false;
      } else if (this.multipleSelection.length != 1) {
        this.$message("请选择一条数据，且只能选择一条");
      } else {
        this.addvisible = false;
        let id = this.multipleSelection[0].supplier.id;
        console.log(this.multipleSelection[0],id,"ud ID")
        this.setSupplierId(id);
        delete this.multipleSelection[0]._id;
        delete this.multipleSelection[0].total;
        this.setSupplierGood(this.multipleSelection[0]);
        this.setStoreAddVisible(true);
      }
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style>
.goodImages {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

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