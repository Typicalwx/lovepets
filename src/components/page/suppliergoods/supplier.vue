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
export default {
  created: function() {
    axios({
      method: "get",
      url: "/supplier",
      params: { usersId: "5c3831061b3ba76f6f14bc6e" }
    }).then(({ data }) => {
      console.log("哈哈哈", data[0]._id);
      // this.supId = data[0]._id;
      this.setSuppliergoods({ page: 1, rows: 5, supplierId: data[0]._id });
    });
    // this.setSuppliergoods();
  },

  computed: {
    // ...mapState(["suppliergoods"])
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
