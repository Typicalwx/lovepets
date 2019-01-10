<template>
  <div>
    <div>
      <h3>审批管理</h3>
      <PlatformList :platforms="platforms" :noBtn="noBtn" :yesBtn="yesBtn"></PlatformList>
    </div>
    <div>
      <h3>平台管理员管理</h3>
      <AdminList
        :admins="admins"
        :increaseBtn="increaseBtn"
        :reduceBtn="reduceBtn"
        :showadmins="showadmins"
      ></AdminList>
    </div>
  </div>
</template>

<script>
import PlatformList from "./platformList.vue";
import AdminList from "./adminList.vue";
// import studentsAdd from "./studentsAdd.vue";
// import studentsList from "./studentsList.vue";
// import studentsUpdate from "./studentsUpdate.vue";
// import studentsPage from "./studentsPage.vue";
// import studentsSearch from "./studentsSearch";
import { createNamespacedHelpers } from "vuex";
import axios from "axios";
const { mapActions } = createNamespacedHelpers(
  "platformModule" //模块名
);
export default {
  data() {
    return {
      platforms: [],
      admins: []
    };
  },
  components: {
    PlatformList,
    AdminList
  },
  methods: {
    ...mapActions(["setStudents", "setPlatform"]),
    showplatform() {
      this.platforms = [];
      axios({
        method: "get",
        url: "users"
      }).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].state == 0 &&
            (data[i].role == "门店管理员" || data[i].role == "供应商管理员")
          ) {
            this.platforms.push(data[i]);
          }
        }
      });
    },
    showadmins() {
      this.admins = [];
      axios({
        method: "get",
        url: "users"
      }).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].role == "普通会员" || data[i].role == "平台管理员") {
            this.admins.push(data[i]);
          }
        }
      });
    },
    noBtn(id) {
      axios({
        method: "put",
        url: "/users/" + id,
        data: {
          state: 2
        }
      }).then(() => {
        this.showplatform();
        this.setPlatform();
        this.$message({
          message: "店铺审核状态为不可用",
          type: "warning"
        });
      });
    },
    yesBtn(id) {
      axios({
        method: "put",
        url: "/users/" + id,
        data: {
          state: 1
        }
      }).then(() => {
        this.showplatform();
        this.setPlatform();
        this.$message({
          message: "店铺审核通过",
          type: "success"
        });
      });
    },
    increaseBtn(id) {
      axios({
        method: "put",
        url: "/users/" + id,
        data: {
          role: "平台管理员"
        }
      }).then(() => {
        this.showadmins();
        this.setStudents();
      });
    },
    reduceBtn(id) {
      axios({
        method: "put",
        url: "/users/" + id,
        data: {
          role: "普通会员"
        }
      }).then(() => {
        this.showadmins();
        this.setStudents();
      });
    }
  }
};
</script>

<style>
</style>
