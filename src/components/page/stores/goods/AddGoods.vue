<template>
  <div>
    <el-button @click="dialogFormVisible = true" style="float:left">新增商品</el-button>
    <el-dialog title="增加商品" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm">
        <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推广标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用料" :label-width="formLabelWidth">
          <el-input v-model="form.method" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适合物种" :label-width="formLabelWidth">
          <el-input v-model="form.applySfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格" :label-width="formLabelWidth">
          <el-input v-model="form.exclusiveSfc " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格" :label-width="formLabelWidth">
          <el-input v-model="form.packSfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味" :label-width="formLabelWidth">
          <el-input v-model="form.flavor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用" :label-width="formLabelWidth">
          <el-input v-model="form.specialFuc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地" :label-width="formLabelWidth">
          <el-input v-model="form.placeOfOrigin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出产日期" :label-width="formLabelWidth">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特点" :label-width="formLabelWidth">
          <el-input v-model="form.features" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保质期" :label-width="formLabelWidth">
          <el-input v-model="form.shelfLife" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货总数" :label-width="formLabelWidth">
          <el-input v-model="form.total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="售价" :label-width="formLabelWidth">
          <el-input v-model="form.newPrice" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-upload
          action="/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="form.images"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStoreGood">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        title: "",
        type: "",
        method: "",
        applySfc: "",
        exclusiveSfc: "",
        total: "",
        packSfc: "",
        flavor: "",
        specialFuc: "",
        placeOfOrigin: "",
        date: "",
        shelfLife: "",
        features: "",
        price: "",
        newPrice: "",
        sales: "",
        images: []
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    ...mapActions(["setStudents"]),
    addStoreGood() {
      console.log(this.form);
      this.form.images = JSON.stringify(this.form.images);
      axios({
        url: "/stores",
        method: "post",
        data: this.form
      }).then(({ data }) => {
        this.dialogFormVisible = false;
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.images = [
        ...this.form.images,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
a {
  text-decoration: none;
  cursor: pointer;
  color: #666;
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
.picture {
  border: 1px dashed #8c939d;
}
.avatar-uploader {
  margin-top: 10px;
}
</style>
