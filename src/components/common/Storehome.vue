<template>
    <div class="wrapper">
        <v-head :headtitle="headtitle"></v-head>
        <v-sidebar :items="items"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
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
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                headtitle:"门店管理系统",
                items:[
                    {
                        icon: 'el-icon-setting',
                        index: 'storeinfo',
                        title: '门店信息'
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'storemanage',
                        title: '门店商品'
                    },
                    {
                        icon: 'el-icon-phone',
                        index: 'storeserve',
                        title: '服务管理'
                    },
                    {
                        icon: 'el-icon-info',
                        index: 'storeusers',
                        title: '订单管理'
                    },
                     {
                        icon: 'el-icon-goods',
                        index: 'storesupplier',
                        title: '评论管理'
                    },
                    {
                        icon: 'el-icon-edit-outline',
                        index: 'storestatistics',
                        title: '统计'
                    },
                ]

            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
