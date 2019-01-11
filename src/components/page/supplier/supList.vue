<template>
  <div class="table">
    <div class="container">
      <div class="handle-box"></div>
      <el-table :data="supplier" border class="table" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="供应商名称:" width="200" align="center"></el-table-column>
        <el-table-column prop="addr" label="供应商地址:" width="270" align="center"></el-table-column>
        <el-table-column prop="phone" label="供应商电话:" width="200" align="center"></el-table-column>
        <el-table-column prop="web" label="供应商网站:" width="200" align="center"></el-table-column>
        <el-table-column prop="licenseImage" label="供应商营业执照:" width="200" align="center"></el-table-column>
        <el-table-column prop="remark" label="供应商备注:" width="250" align="center"></el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <!-- <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>-->
    </div>

    <el-dialog title="修改" :visible.sync="suUpdateVisible" width="30%">
      <el-form
        :model="updateForm"
        status-icon
        ref="updateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供应商编码:" prop="supplier[0]._id">
          <el-input type="text" v-model="supplier[0]._id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称:" prop="upname">
          <el-input type="text" v-model="upname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址:" prop="upaddr">
          <el-input type="text" v-model="upaddr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商电话:" prop="upphone">
          <el-input type="text" v-model="upphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商网站:" prop="upweb">
          <el-input type="text" v-model="upweb" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商营业执照:" prop="uplicenseImage">
          <el-input type="text" v-model="uplicenseImage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商备注:" prop="upremark">
          <el-input type="text" v-model="upremark" autocomplete="off"></el-input>
        </el-form-item>

        <el-upload
          action="/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          class="qwe"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="upDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="suUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确定修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supModules" // 模块名
);
export default {
  created: function() {
    this.setSuppliers();
    console.log("111111111111111111111111111111111111111", this.supplier);
  },
  name: "basetable",
  data() {
    return {
      supplierId: "",
      url: "./vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_word: "",
      del_list: [],
      suUpdateVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      upDialogVisible: false,
      dialogImageUrl: "",
      updateForm: { images: [] }
    };
  },
  computed: {
    ...mapState(["supplier"]),
    upname: {
      get() {
        return this.supplier[0].name;
      },
      set(name) {
        this.$store.commit("supModules/setSupplier", {
          ...this.supplier[0],
          name
        });
      }
    },
    upaddr: {
      get() {
        return this.supplier[0].addr;
      },
      set(addr) {
        this.$store.commit("supModules/setSupplier", {
          ...this.supplier[0],
          addr
        });
      }
    },
    upphone: {
      get() {
        return this.supplier[0].phone;
      },
      set(phone) {
        this.$store.commit("supModules/setSupplier", {
          ...this.supplier[0],
          phone
        });
      }
    },
    upweb: {
      get() {
        return this.supplier[0].web;
      },
      set(web) {
        this.$store.commit("supModules/setSupplier", {
          ...this.supplier[0],
          web
        });
      }
    },
    uplicenseImage: {
      get() {
        return this.supplier[0].licenseImage;
      },
      set(licenseImage) {
        this.$store.commit("supModules/setSupplier", {
          ...this.supplier[0],
          licenseImage
        });
      }
    },
    upremark: {
      get() {
        return this.supplier[0].remark;
      },
      set(remark) {
        this.$store.commit("supModules/setSupplier", {
          ...this.supplier[0],
          remark
        });
      }
    }
  },

  methods: {
    ...mapActions(["setSuppliers"]),
    // ...mapMutations(["setAddVisible", "setUpdateVisible"]),
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      console.log("111111111111", res);
      this.updateForm.images = [
        ...this.updateForm.images,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
      console.log(" 数据", this.updateForm.images);
    },
    handleRemove(file, fileList) {
      console.log("file", file);
      console.log(" 数据", this.updateForm.images);
      let allImg = [...this.updateForm.images, ...this.suppliergood.images];
      for (let i in allImg) {
        if (allImg[i].uid == file.uid) {
          console.log("ID", allImg[i].uid);
          console.log(i, 11111);
          allImg.splice(i, 1);
        }
      }
      this.image = allImg;
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.upDialogVisible = true;
    },
    confirmUpdate() {
      let images = JSON.stringify([
        // ...this.allImgs,
        ...this.updateForm.images,
        ...this.image
      ]);
      axios({
        method: "put",
        url: "/suppliergoods/" + this.suppliergood._id,
        data: { ...this.suppliergood, images }
      }).then(({ data }) => {
        console.log("000000000000", data);
        this.updateVisible = false;
        this.setSuppliergoods({ page: 1, rows: 5, supplierId: this.supId });
        this.updateForm.images = [];
        // this.allImgs = [];
      });
    },
    // //删除按钮
    // handleDelete: function(index, supplier) {
    //   this.delVisible = true;
    //   this.supplierId = supplier._id;
    // },
    // // 确定删除
    // deleteRow(data) {
    //   axios({
    //     method: "delete",
    //     url: "/supplier/" + this.supplierId
    //   }).then(({ data }) => {
    //     this.$message.success("删除成功");
    //     this.delVisible = false;
    //     this.setSuppliers(); //重新加载所有数据
    //   });
    // },

    //修改按钮
    handleEdit: function(index, studentData) {
      // console.log("updateSwitch", studentData._id);
      this.suUpdateVisible = true; //打开修改面板

      // this.setSuppliergood(studentData._id);
    },

    //新增按钮打开模板
    // addBtn() {
    //   this.setAddVisible(true);
    // },
    // ```````````````````````````````````````````````
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
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
    // delAll() {
    //   console.log("s数据", this.multipleSelection);
    //   const length = this.multipleSelection.length;
    //   let str = "";
    //   this.del_list = this.del_list.concat(this.multipleSelection);
    //   for (let i = 0; i < length; i++) {
    //     str += this.multipleSelection[i].name + " ";
    //   }
    //   this.$message.error("删除了" + str);
    //   this.multipleSelection = [];
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    }
  }
};
</script>

<style>
</style>
