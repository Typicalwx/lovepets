<template>
  <div>
    <supList></supList>
  </div>
</template>

<script>
import supList from "./supList";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers(
  "supModules" // 模块名
);
export default {
  created: function() {
    this.setSuppliers();
  },

  computed: {
    ...mapState(["supplier"])
  },
  methods: {
    ...mapActions(["setSuppliers"])
  },
  components: {
    supList
  }
};
</script>

<style>
</style>
