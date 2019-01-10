import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Storehome from "../components/common/Storehome.vue";
import Dashboard from "../components/page/stores/HomePage/Dashboard";
import Statistics from "../components/page/stores/statistics.vue";
import Supplier from "../components/page/stores/supplier.vue";
import Users from "../components/page/stores/users.vue";

import StoreGoods from "../components/page/stores/goods/index.vue"
// import Login from "../components/page/stores/Login.vue"
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/store',
            component: Storehome,
            children: [
                {
                    path: '/dashboard',
                    component: Dashboard,
                    meta: { title: '门店首页' }
                },
                {
                    path: '/storegoods',
                    component: StoreGoods,
                    meta: { title: '门店商品' }
                },
                {
                    path: '/supplier',
                    component: Supplier,
                    meta: { title: '供应商管理' }
                },
                {
                    path: '/users',
                    component: Users,
                    meta: { title: '用户管理' }
                },
                {
                    path: '/statistics',
                    component: Statistics,
                    meta: { title: '统计' }
                },

            ]
        },
     
    ]
})
