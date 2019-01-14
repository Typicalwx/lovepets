<template>
  <div>
    <el-dialog title="增加商品" :visible.sync="addStoreDiolog" width="50%">
      <el-form
        :model="supplierGood"
        ref="form"
        label-width="50px"
        :rules="rules"
        style="width:580px;"
      >
        <el-form-item label="商品名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推广标题" :label-width="formLabelWidth" prop="name">
          <el-input v-model="title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="name">
          <!-- <el-input v-model="type" autocomplete="off"></el-input> -->
          <el-select v-model="type" placeholder="类型" class="handle-select mr10">
            <el-option key="1" label="狗粮" value="狗粮"></el-option>
            <el-option key="2" label="猫粮" value="猫粮"></el-option>
            <el-option key="3" label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用料" :label-width="formLabelWidth" prop="name">
          <el-input v-model="method" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适合物种" :label-width="formLabelWidth" prop="name">
          <el-input v-model="applySfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格" :label-width="formLabelWidth" prop="name">
          <el-input v-model="exclusiveSfc " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格" :label-width="formLabelWidth" prop="name">
          <el-input v-model="packSfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味" :label-width="formLabelWidth" prop="name">
          <el-input v-model="flavor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用" :label-width="formLabelWidth" prop="name">
          <el-input v-model="specialFuc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地" :label-width="formLabelWidth" prop="name">
          <el-input v-model="placeOfOrigin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出产日期" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            prop="date1"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="特点" :label-width="formLabelWidth" prop="name">
          <el-input v-model="features" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保质期" :label-width="formLabelWidth" prop="name">
          <el-input v-model="shelfLife" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货总数" :label-width="formLabelWidth" prop="name">
          <el-input v-model="total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价格" :label-width="formLabelWidth" prop="name">
          <el-input v-model="price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="售价" :label-width="formLabelWidth" prop="name">
          <el-input v-model="newPrice" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="/upload"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="images||[]"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="addStoreGood('form')">确 定</el-button>
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
      dialogFormVisible: false,
      form: {
        name: "",
        title: "",
        type: "",
        method: "",
        applySfc: "",
        exclusiveSfc: "",
        packSfc: "",
        flavor: "",
        specialFuc: "",
        placeOfOrigin: "",
        date: "",
        shelfLife: "",
        features: "",
        price: "",
        newPrice: "",

        images: []
      },
      total: "",
      goodState: "商品",
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  // beforeUpdate() {
  //   this.form = this.supplierGood;
  // },
  computed: {
    ...mapState(["storeAddVisible", "storeId", "supplierGood", "supplierId"]),
    addStoreDiolog: {
      get() {
        console.log(this.storeAddVisible);
        return this.storeAddVisible;
        //非map情况下，模块有嵌套的话，想要找到最里层的state 需要加上组件名(就是modules里面的属性名)，然后直接点属性
      },
      set(storeAddVisible) {
        console.log("updateSwitch", storeAddVisible);
        this.setStoreAddVisible(storeAddVisible);
        //非map情况下，模块有嵌套的话，想要提交。用模块名/属性名
      }
    },
    name: {
      get() {
        return this.supplierGood.name || "";
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, name: value });
      }
    },
    title: {
      get() {
        return this.supplierGood.title;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, title: value });
      }
    },
    type: {
      get() {
        return this.supplierGood.type;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, type: value });
      }
    },
    method: {
      get() {
        return this.supplierGood.method;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, method: value });
      }
    },
    applySfc: {
      get() {
        return this.supplierGood.applySfc;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, applySfc: value });
      }
    },
    exclusiveSfc: {
      get() {
        return this.supplierGood.exclusiveSfc;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, exclusiveSfc: value });
      }
    },
    packSfc: {
      get() {
        return this.supplierGood.packSfc;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, packSfc: value });
      }
    },
    flavor: {
      get() {
        return this.supplierGood.flavor;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, flavor: value });
      }
    },
    specialFuc: {
      get() {
        return this.supplierGood.specialFuc;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, specialFuc: value });
      }
    },
    placeOfOrigin: {
      get() {
        return this.supplierGood.placeOfOrigin;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, placeOfOrigin: value });
      }
    },
    date: {
      get() {
        return this.supplierGood.date;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, date: value });
      }
    },
    features: {
      get() {
        return this.supplierGood.features;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, features: value });
      }
    },
    shelfLife: {
      get() {
        return this.supplierGood.shelfLife;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, shelfLife: value });
      }
    },
    // total: {
    //   get() {
    //     return this.supplierGood.total;
    //   },
    //   set(value) {
    //     this.setSupplierGood({ ...this.supplierGood, total: value });
    //   }
    // },
    newPrice: {
      get() {
        return this.supplierGood.newPrice;
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, newPrice: value });
      }
    },
    price: {
      get() {
        return this.supplierGood.price || "";
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, price: value });
      }
    },
    images: {
      get() {
        return this.supplierGood.images || [];
      },
      set(value) {
        this.setSupplierGood({ ...this.supplierGood, images: value });
      }
    }
  },
  methods: {
    ...mapMutations(["setStoreAddVisible", "setSupplierId", "setSupplierGood"]),
    ...mapActions(["setStoregoods"]),
    // 确认添加
    addStoreGood() {
      this.$refs["form"].validate(valid => {
        console.log(valid, "valid");
        var myDate = new Date();
        let date = myDate.toLocaleDateString();
        if (valid) {
          this.addStoreDiolog = false;
          console.log(this.$refs, "uuu");
          axios({
            url: "/storegoods",
            method: "post",
            data: {
              ...this.supplierGood,
              images: JSON.stringify(this.images),
              storeId: this.storeId,
              goodState: this.goodState,
              supplierId: this.supplierId || "",
              sales: 0,
              total: this.total,
              time: date
            }
          }).then(({ data }) => {
            this.setStoregoods();
            this.$refs["form"].resetFields();
            // this.form = {};
            this.$refs["form"].clearValidate();
            this.setSupplierId("");
            this.setSupplierGood({});
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log({ ...this.form, images: JSON.stringify(this.form.images) });
      // this.form.images = JSON.stringify(this.form.images);
    },
    cancelDialog() {
       this.$refs["form"].clearValidate();
      this.addStoreDiolog = false;
      this.setSupplierId("");
      this.setSupplierGood({});
    },
    handleAvatarSuccess(res, file) {
      this.images = [
        ...this.images,
        { name: file.name, url: "/upload/" + res }
      ];
      console.log(res, file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let arr = this.images;
      for (let i in arr) {
        if (arr[i].uid == file.uid) {
          arr.splice(i, 1);
          break;
        }
      }
      this.images = arr;
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
</style>
