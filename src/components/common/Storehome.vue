<template>
  <div class="wrapper">
    <v-head :headtitle="headtitle" :usersession="usersession" :imgUrl="headImg"></v-head>
    <v-sidebar :items="items"></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags :dashboard="storedashboard"></v-tags>
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

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "storeModule"
);
const { mapMutations: storeserve } = createNamespacedHelpers("store");

export default {
  data() {
    return {
      storedashboard: "storedashboard",
      usersession: "",
      userId: "",
      tagsList: [],
      collapse: false,
      headtitle: "门店管理系统",
      items: [
        {
          icon: "el-icon-setting",
          index: "storedashboard",
          title: "门店信息"
        },
        {
          icon: "el-icon-document",
          index: "storegoods",
          title: "门店商品"
        },
        {
          icon: "el-icon-goods",
          index: "storecomment",
          title: "评论管理(测试)"
        },

        {
          icon: "el-icon-goods",
          index: "storeserve",
          title: "服务管理"
        },

        {
          icon: "el-icon-phone",
          index: "storeorder",
          title: "订单管理"
        },
        {
          icon: "el-icon-edit-outline",
          title: "统计",
          subs: [
            {
              index: "storestatistics",
              title: "销量统计"
            },
            {
              index: "markdown",
              title: "销售额统计"
            }
          ]
        }
      ],
      headImg: ""
    };
  },
  methods: {
    ...mapMutations(["setStoreId", "setUserId"]),
    ...mapActions(["setStoreInfoData"]),
    ...storeserve(["setserveStoreId"])
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
      if (data._id) {
        this.userId = data._id;
        console.log("???", this.userId);
        this.usersession = data.account;
        this.setUserId(data._id);
        axios({
          url: "/stores/zhaoid",
          method: "get",
          params: {
            userId: this.userId
          }
        }).then(res => {
          this.setserveStoreId(res.data._id);
          this.headImg = res.data.storeImage;
        });
        this.setStoreInfoData();
      } else {
        this.$router.push("/login");
      }
    });
  }
};
</script>
