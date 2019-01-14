<template>
  <span>
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <el-form :model="addForm" status-icon ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="品牌:" prop="name">
          <el-input type="text" v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宣传标语:" prop="title">
          <el-input type="text" v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-input type="text" v-model="addForm.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="制作方法/材料:" prop="method">
          <el-input type="text" v-model="addForm.method" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用类型:" prop="applySfc">
          <el-input type="text" v-model="addForm.applySfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用品种:" prop="exclusiveSfc">
          <el-input type="text" v-model="addForm.exclusiveSfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总数:" prop="total">
          <el-input type="text" v-model="addForm.total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量:" prop="packSfc">
          <el-input type="text" v-model="addForm.packSfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味:" prop="flavor">
          <el-input type="text" v-model="addForm.flavor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特效:" prop="SpecialFuc">
          <el-input type="text" v-model="addForm.SpecialFuc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地:" prop="placeOfOrigin">
          <el-input type="text" v-model="addForm.placeOfOrigin" autocomplete="off"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">选择日期:</span>
          <el-date-picker
            v-model="addForm.date"
            type="date"
            style="margin-bottom:20px"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <el-form-item label="保质期:" prop="shelfLife">
          <el-input type="text" v-model="addForm.shelfLife" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特色说明:" prop="features">
          <el-input type="text" v-model="addForm.features" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批发价格:" prop="price">
          <el-input type="text" v-model="addForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片:" prop="images">
          <el-input type="text" v-model="addForm.images" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-upload
          action="/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="addForm.images"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确定增加</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "supplierModules" // 模块名
);
const { mapActions: setSupId, mapState: supId } = createNamespacedHelpers(
  "supModules" // 供应商详情模块名
);
export default {
  updated() {
    console.log("add用户id", this.usersId);
    // this.setSuppliers("5c384dec1b3ba76f6f14f752");
    this.setSuppliers(this.usersId);
  },
  data() {
    return {
      addForm: {
        name: "",
        title: "",
        type: "",
        method: "",
        applySfc: "",
        exclusiveSfc: "",
        total: "",
        packSfc: "",
        flavor: "",
        SpecialFuc: "",
        placeOfOrigin: "",
        date: "",
        shelfLife: "",
        features: "",
        price: "",
        images: []
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    ...mapState(["addVisible"]),
    ...supId(["supId", "usersId"]),
    addVisible: {
      get() {
        return this.$store.state.supplierModules.addVisible;
      },
      set(addVisible) {
        console.log("addVisible", addVisible);
        this.$store.commit("supplierModules/setAddVisible", addVisible);
      }
    }
  },
  methods: {
    ...mapActions(["setSuppliergoods"]),
    ...setSupId(["setSuppliers"]),
    confirmAdd() {
      // console.log("123123", this.addForm.date.toLocaleDateString());
      let images = JSON.stringify(this.addForm.images);
      let date = this.addForm.date && this.addForm.date.toLocaleDateString();
      axios({
        method: "post",
        url: "/suppliergoods",
        data: { ...this.addForm, images, date, supplierId: this.supId }
      }).then(({ data }) => {
        this.addVisible = false;
        console.log("增加成功");
        this.addForm.images = [];
        this.$refs["addForm"].resetFields();
        console.log("qwer", this.supId);
        this.setSuppliergoods({ page: 1, rows: 5, supplierId: this.supId });
      });
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.addForm.images = [
        ...this.addForm.images,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log("上传", res, file);
    },
    handleRemove(file, fileList) {
      console.log("增加移除", file, fileList);
      let imgArr = this.addForm.images;
      for (let i in imgArr) {
        if (imgArr[i].uid == file.uid) {
          console.log("ID", imgArr[i].uid);
          console.log(i, 11111);
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
.demo-ruleForm {
  width: 100%;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item__label {
  font-size: 12px;
}

.demonstration {
  width: 100px;
  display: inline-block;
  text-align: right;
  padding-right: 12px;
  box-sizing: border-box;
}
</style>
