<template>
  <div class="wrapper">
    <v-head :usersession="userName" :headtitle="headTitle"></v-head>
    <v-sidebar :items="item"></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags :dashboard="dashboard"></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
export default {
  data() {
    return {
      tagsList: [],
      dashboard: "dashboard",
      collapse: false,
      headTitle: "供应商管理系统",
      item: [
        {
          icon: "el-icon-setting",
          index: "dashboard",
          title: "系统首页"
        },
        {
          icon: "el-icon-goods",
          index: "suppliergoods",
          title: "供应商商品管理"
        },

        {
          icon: "el-icon-info",
          index: "supplier",
          title: "供应商详情"
        },
        {
          icon: "el-icon-edit-outline",
          index: "statistics",
          title: "统计"
        }
      ],
      userName: "",
      post: ""
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });

    axios({
      url: "/getsession",
      method: "get"
    }).then(({ data }) => {
      if (data.phone) {
        console.log("data", data);
        this.userName = data.account;
        this.post = data.role;
      } else {
        this.$router.push("/login");
      }
    });
  }
};
</script>
