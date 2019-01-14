<template>
  <div>
    <supList></supList>
    <supUpdate></supUpdate>
  </div>
</template>

<script>
import supList from "./supList";
import supUpdate from "./supUpdate";
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers(
  "supModules" // 模块名
);
export default {
  created() {
    //因为供应商关联了user，
    //组件初始化时通过session取出userid，再通过id去查找哪个供应商
    axios({
      url: "/getsession",
      method: "get"
    }).then(({ data }) => {
      if (data.phone) {
        console.log("session", data._id);
        this.setSuppliers(data._id);
        this.$store.commit("supModules/setUsersId", data._id);
      }
    });
  },

  computed: {
    ...mapState(["setUsersId"])
  },
  methods: {
    ...mapActions(["setSuppliers"])
  },
  components: {
    supList,
    supUpdate
  }
};
</script>

<style>
</style>
