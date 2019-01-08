<template>
  <h1>供应商:{{suppliergoods}}</h1>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers(
  "supplierModules" // 模块名
);
export default {
  created: function() {
    this.setSupplierModules();
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
    ...mapActions(["setSupplierModules"])
  }
};
</script>

<style>
</style>
