<template>
  <div>
    <supplierAdd></supplierAdd>
    <supplierUpdate></supplierUpdate>
    <supplierList></supplierList>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
import supplierList from "./supplierList";
import supplierAdd from "./supplierAdd";
import supplierUpdate from "./supplierUpdate";

const { mapActions, mapState } = createNamespacedHelpers(
  "supplierModules" // 模块名
);
const {
  mapActions: supmapActions,
  mapState: supmapState
} = createNamespacedHelpers(
  "supModules" // 模块名
);
export default {
  beforeCreate() {
    axios({
      url: "/getsession",
      method: "get"
    }).then(({ data }) => {
      if (data.phone) {
        this.$store.commit("supModules/setUsersId", data._id);
        axios({
          method: "get",
          url: "/supplier",
          params: { usersId: data._id }
        }).then(({ data }) => {
          console.log("哈哈哈", data[0]._id);
          // this.supId = data[0]._id;
          this.setSuppliergoods({ page: 1, rows: 5, supplierId: data[0]._id });
        });
      }
    });

    // this.setSuppliergoods();
  },
  mounted() {
    console.log("用户id", this.usersId);
  },
  computed: {
    // ...mapState(["suppliergoods"])
    ...supmapState(["usersId"])
  },
  methods: {
    ...mapActions(["setSuppliergoods"])
  },

  components: {
    supplierAdd,
    supplierUpdate,
    supplierList
  }
};
</script>

<style>
</style>
