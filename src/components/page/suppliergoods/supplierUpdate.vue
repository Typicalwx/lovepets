<template>
  <span>
    <el-dialog title="修改" :visible.sync="updateVisible" width="30%">
      <el-form
        :model="updateForm"
        status-icon
        ref="updateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="品牌:" prop="name">
          <el-input type="text" v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宣传标语:" prop="title">
          <el-input type="text" v-model="title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-input type="text" v-model="type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="制作方法/材料:" prop="method">
          <el-input type="text" v-model="method" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用类型:" prop="applySfc">
          <el-input type="text" v-model="applySfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用品种:" prop="exclusiveSfc">
          <el-input type="text" v-model="exclusiveSfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总数:" prop="total">
          <el-input type="text" v-model="total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量:" prop="packSfc">
          <el-input type="text" v-model="packSfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味:" prop="flavor">
          <el-input type="text" v-model="flavor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特效:" prop="SpecialFuc">
          <el-input type="text" v-model="SpecialFuc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地:" prop="placeOfOrigin">
          <el-input type="text" v-model="placeOfOrigin" autocomplete="off"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">选择日期:</span>
          <el-date-picker v-model="date" type="date" style="margin-bottom:20px" placeholder="选择日期"></el-date-picker>
        </div>
        <el-form-item label="保质期:" prop="shelfLife">
          <el-input type="text" v-model="shelfLife" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特色说明:" prop="features">
          <el-input type="text" v-model="features" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批发价格:" prop="price">
          <el-input type="text" v-model="price" autocomplete="off"></el-input>
        </el-form-item>
        <el-upload
          action="/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="suppliergood.images"
          class="qwe"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="upDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确定修改</el-button>
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
  created() {
    // axios({
    //   method: "get",
    //   url: "/supplier"
    // }).then(({ data }) => {
    //   console.log("供应商详情id", data[0]._id);
    //   this.supId = data[0]._id;
    // });
    // this.setSuppliers("5c384dec1b3ba76f6f14f752");
  },
  updated: function() {
    console.log("dsadsa", this.suppliergood);
  },
  data() {
    return {
      updateForm: {
        images: []
      },
      dialogImageUrl: "",
      upDialogVisible: false,
      allImgs: []
      // supId: "" //供应商详情的ID
    };
  },
  computed: {
    ...mapState(["updateVisible", "suppliergood"]),
    ...supId(["supId", "usersId"]),
    updateVisible: {
      get() {
        return this.$store.state.supplierModules.updateVisible;
      },
      set(updateVisible) {
        console.log("updateVisible", updateVisible);
        this.$store.commit("supplierModules/setUpdateVisible", updateVisible);
      }
    },
    name: {
      get() {
        // return this.$store.state.supplierModules.suppliergood.name;
        return this.suppliergood.name;
      },
      set(name) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          name
        });
      }
    },
    title: {
      get() {
        return this.suppliergood.title;
      },
      set(title) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          title
        });
      }
    },
    type: {
      get() {
        return this.suppliergood.type;
      },
      set(type) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          type
        });
      }
    },
    method: {
      get() {
        return this.suppliergood.method;
      },
      set(method) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          method
        });
      }
    },
    applySfc: {
      get() {
        return this.suppliergood.applySfc;
      },
      set(applySfc) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          applySfc
        });
      }
    },
    exclusiveSfc: {
      get() {
        return this.suppliergood.exclusiveSfc;
      },
      set(exclusiveSfc) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          exclusiveSfc
        });
      }
    },
    total: {
      get() {
        return this.suppliergood.total;
      },
      set(total) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          total
        });
      }
    },
    packSfc: {
      get() {
        return this.suppliergood.packSfc;
      },
      set(packSfc) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          packSfc
        });
      }
    },
    flavor: {
      get() {
        return this.suppliergood.flavor;
      },
      set(flavor) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          flavor
        });
      }
    },
    SpecialFuc: {
      get() {
        return this.suppliergood.SpecialFuc;
      },
      set(SpecialFuc) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          SpecialFuc
        });
      }
    },
    placeOfOrigin: {
      get() {
        return this.suppliergood.placeOfOrigin;
      },
      set(placeOfOrigin) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          placeOfOrigin
        });
      }
    },
    date: {
      get() {
        return this.suppliergood.date;
      },
      set(date) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          date
        });
      }
    },
    shelfLife: {
      get() {
        return this.suppliergood.shelfLife;
      },
      set(shelfLife) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          shelfLife
        });
      }
    },
    features: {
      get() {
        return this.suppliergood.features;
      },
      set(features) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          features
        });
      }
    },
    price: {
      get() {
        return this.suppliergood.price;
      },
      set(price) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          price
        });
      }
    },
    image: {
      get() {
        return this.suppliergood.images;
      },
      set(images) {
        this.$store.commit("supplierModules/setSuppliergood", {
          ...this.suppliergood,
          images: images
        });
      }
    }
  },

  methods: {
    // ...mapMutations(["setUpdateVisible"]),
    ...mapActions(["setSuppliergoods"]),
    ...setSupId(["setSuppliers"]),
    //确认修改
    confirmUpdate() {
      // console.log("xiugai id", this.usersId);
      let images = JSON.stringify([
        // ...this.allImgs,
        ...this.updateForm.images,
        ...this.image
      ]);
     
      // let date = this.date && this.date.toLocaleDateString();
      
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
.qwe {
  width: 468px;
  margin-left: 38px;
}
</style>
