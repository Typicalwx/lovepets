<template>
  <div class="wrapper">
    <v-head :headtitle="headtitle" :usersession="usersession"></v-head>
    <v-sidebar :items="items"></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags :dashboardmoney="dashboardmoney"></v-tags>
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
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
import axios from "axios";
export default {
  data() {
    return {
      dashboardmoney: "dashboardmoney",
      usersession: "",
      tagsList: [],
      collapse: false,
      headtitle: "平台管理系统",
      items: [
        {
          icon: "el-icon-setting",
          index: "dashboardmoney",
          title: "平台系统首页"
        },
        {
          icon: "el-icon-document",
          index: "storemoney",
          title: "平台门店管理"
        },
        {
          icon: "el-icon-goods",
          index: "suppliermoney",
          title: "平台宠管理"
        },

        {
          icon: "el-icon-info",
          index: "users",
          title: "平台用户管理"
        },
        {
          icon: "el-icon-edit-outline",
          index: "platformsupplier",
          title: "供应商管理"
        },
        {
          icon: "el-icon-edit-outline",
          index: "statisticsmoney",
          title: "平台统计"
        },
               {
          icon: "el-icon-edit-outline",
          index: "statisticsmoneys",
          title: "销售额统计"
        }
      ]
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    axios({
      method: "get",
      url: "/getsession"
    }).then(({ data }) => {
      this.usersession = data.account;
    });
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
  }
};
</script>
