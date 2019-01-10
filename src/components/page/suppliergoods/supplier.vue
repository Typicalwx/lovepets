<template>
  <div>
    <supplierAdd></supplierAdd>
    <supplierUpdate></supplierUpdate>
    <supplierList></supplierList>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import supplierList from "./supplierList";
import supplierAdd from "./supplierAdd";
import supplierUpdate from "./supplierUpdate";

const { mapActions, mapState } = createNamespacedHelpers(
  "supplierModules" // 模块名
);
export default {
  created: function() {
    this.setSuppliergoods();
  },
  //   data() {
  //     return {
  //         name:"llllk"
  //     };
  //   },
  computed: {
    ...mapState(["suppliergoods"])
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
