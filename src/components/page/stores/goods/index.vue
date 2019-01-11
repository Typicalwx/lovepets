<template>
  <div>
    <AddGoods></AddGoods>
    <StoreList></StoreList>
    <UpdateGoods></UpdateGoods>
    <AddSupplierGoods></AddSupplierGoods>
  </div>
</template>

<script>
import AddGoods from "./AddGoods.vue";
import StoreList from "./StoreList.vue";
import UpdateGoods from "./UpdateGoods.vue";
import AddSupplierGoods from "./AddSupplierGoods.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  "storeModule" //模块名
);
export default {
  components: {
    AddGoods,
    StoreList,
    UpdateGoods,
    AddSupplierGoods
  },
  created: function() {
    this.setStoregoods();
  },
  methods: {
    ...mapActions(["setStoregoods"])
  }
};
</script>

<style>
</style>
