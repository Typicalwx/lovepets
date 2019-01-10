<template>
  <div>
    <el-dialog title="修改商品" :visible.sync="updateDialogVisible" width="50%">
      <el-form v-if="storeGood" :model="form" ref="form" label-width="50px">
        <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推广标题" :label-width="formLabelWidth">
          <el-input v-model="title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用料" :label-width="formLabelWidth">
          <el-input v-model="method" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适合物种" :label-width="formLabelWidth">
          <el-input v-model="applySfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格" :label-width="formLabelWidth">
          <el-input v-model="exclusiveSfc " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格" :label-width="formLabelWidth">
          <el-input v-model="packSfc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味" :label-width="formLabelWidth">
          <el-input v-model="flavor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用" :label-width="formLabelWidth">
          <el-input v-model="specialFuc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地" :label-width="formLabelWidth">
          <el-input v-model="placeOfOrigin" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出产日期" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="特点" :label-width="formLabelWidth">
          <el-input v-model="features" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保质期" :label-width="formLabelWidth">
          <el-input v-model="shelfLife" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货总数" :label-width="formLabelWidth">
          <el-input v-model="total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进货价格" :label-width="formLabelWidth">
          <el-input v-model="price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="售价" :label-width="formLabelWidth">
          <el-input v-model="newPrice" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-upload
          action="/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="images"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStoreGood('form')">确 定</el-button>
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
        sales: 0,
        images: []
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    ...mapState(["storeUpdateVisible", "storeGood"]),
    updateDialogVisible: {
      get() {
        console.log(this.storeUpdateVisible);
        return this.storeUpdateVisible;
      },
      set(storeUpdateVisible) {
        console.log("updateSwitch", storeUpdateVisible);
        this.setStoreUpdateVisible(storeUpdateVisible);
      }
    },
    name: {
      get() {
        console.log("name", this.storeGood.name);
        return this.storeGood.name || "";
      },
      set(value) {
        console.log("headImssssgSrc", value);
        this.setStoreGood({ ...this.storeGood, name: value });
      }
    },
    title: {
      get() {
        console.log("title", this.storeGood.title);
        return this.storeGood.title;
      },
      set(value) {
        console.log("title", value);
        this.setStoreGood({ ...this.storeGood, title: value });
      }
    },
    type: {
      get() {
        console.log("type", this.storeGood.type);
        return this.storeGood.type;
      },
      set(value) {
        console.log("type", value);
        this.setStoreGood({ ...this.storeGood, type: value });
      }
    },
    method: {
      get() {
        console.log("method", this.storeGood.method);
        return this.storeGood.method;
      },
      set(value) {
        console.log("method", value);
        this.setStoreGood({ ...this.storeGood, method: value });
      }
    },
    applySfc: {
      get() {
        console.log("applySfc", this.storeGood.applySfc);
        return this.storeGood.applySfc;
      },
      set(value) {
        console.log("applySfc", value);
        this.setStoreGood({ ...this.storeGood, applySfc: value });
      }
    },
    exclusiveSfc: {
      get() {
        console.log("exclusiveSfc", this.storeGood.exclusiveSfc);
        return this.storeGood.exclusiveSfc;
      },
      set(value) {
        console.log("exclusiveSfc", value);
        this.setStoreGood({ ...this.storeGood, exclusiveSfc: value });
      }
    },
    packSfc: {
      get() {
        console.log("packSfc", this.storeGood.packSfc);
        return this.storeGood.packSfc;
      },
      set(value) {
        console.log("packSfc", value);
        this.setStoreGood({ ...this.storeGood, packSfc: value });
      }
    },
    flavor: {
      get() {
        console.log("flavor", this.storeGood.flavor);
        return this.storeGood.flavor;
      },
      set(value) {
        console.log("flavor", value);
        this.setStoreGood({ ...this.storeGood, flavor: value });
      }
    },
    specialFuc: {
      get() {
        console.log("specialFuc", this.storeGood.specialFuc);
        return this.storeGood.specialFuc;
      },
      set(value) {
        console.log("specialFuc", value);
        this.setStoreGood({ ...this.storeGood, specialFuc: value });
      }
    },
    placeOfOrigin: {
      get() {
        console.log("placeOfOrigin", this.storeGood.placeOfOrigin);
        return this.storeGood.placeOfOrigin;
      },
      set(value) {
        console.log("placeOfOrigin", value);
        this.setStoreGood({ ...this.storeGood, placeOfOrigin: value });
      }
    },
    date: {
      get() {
        console.log("date", this.storeGood.date);
        return this.storeGood.date;
      },
      set(value) {
        console.log("date", value);
        this.setStoreGood({ ...this.storeGood, date: value });
      }
    },
    features: {
      get() {
        console.log("features", this.storeGood.features);
        return this.storeGood.features;
      },
      set(value) {
        console.log("features", value);
        this.setStoreGood({ ...this.storeGood, features: value });
      }
    },
    shelfLife: {
      get() {
        console.log("shelfLife", this.storeGood.shelfLife);
        return this.storeGood.shelfLife;
      },
      set(value) {
        console.log("shelfLife", value);
        this.setStoreGood({ ...this.storeGood, shelfLife: value });
      }
    },
    total: {
      get() {
        console.log("total", this.storeGood.total);
        return this.storeGood.total;
      },
      set(value) {
        console.log("total", value);
        this.setStoreGood({ ...this.storeGood, total: value });
      }
    },
    newPrice: {
      get() {
        console.log("newPrice", this.storeGood.newPrice);
        return this.storeGood.newPrice;
      },
      set(value) {
        console.log("newPrice", value);
        this.setStoreGood({ ...this.storeGood, newPrice: value });
      }
    },
    price: {
      get() {
        console.log("price", this.storeGood.price);
        return this.storeGood.price || "";
      },
      set(value) {
        console.log("price", value);
        this.setStoreGood({ ...this.storeGood, price: value });
      }
    },
    images: {
      get() {
        console.log("images", this.storeGood.images);
        return this.storeGood.images || [];
      },
      set(value) {
        console.log("images", value);
        this.setStoreGood({ ...this.storeGood, images: value });
      }
    }
  },
  methods: {
    ...mapMutations(["setStoreUpdateVisible", "setStoreGood"]),
    ...mapActions(["setStoregoods"]),
    updateStoreGood() {
      //   console.log({ ...this.form, images: JSON.stringify(this.form.images) });
      // this.form.images = JSON.stringify(this.form.images);
      this.updateDialogVisible = false;
      //   this.$refs.form.resetFields();
      console.log(this.images, 90);
      axios({
        url: "/storegoods/" + this.storeGood._id,
        method: "put",
        data: {
          name: this.name,
          title: this.title,
          type: this.type,
          method: this.method,
          applySfc: this.applySfc,
          exclusiveSfc: this.exclusiveSfc,
          total: this.total,
          packSfc: this.packSfc,
          flavor: this.flavor,
          specialFuc: this.specialFuc,
          placeOfOrigin: this.placeOfOrigin,
          date: this.date,
          shelfLife: this.shelfLife,
          features: this.features,
          price: this.price,
          newPrice: this.newPrice,
          images: JSON.stringify(this.images)
        }
      }).then(({ data }) => {
        // console.log(data,7777);
        this.setStoregoods();
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(this.images, 45);
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
