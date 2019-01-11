import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import SupplierHome from "../components/common/supplierHome.vue";
import Dashboard from "../components/page/suppliergoods/Dashboard.vue";
import Statistics from "../components/page/suppliergoods/statistics.vue";
import Storehome from "../components/common/Storehome.vue";
// import Dashboard from "../components/page/stores/HomePage/Dashboard";
// import Statistics from "../components/page/stores/statistics.vue";
// import Supplier from "../components/page/stores/supplier.vue";
import Users from "../components/page/stores/users.vue";

import Registere from "../components/registere/index"
import Login from "../components/login/index"
import Details from "../components/details/index"
import Detailses from "../components/detailses/index"
import VueRouter from 'vue-router';
import StoreGoods from "../components/page/stores/goods/index.vue"
// import Login from "../components/page/stores/Login.vue"
export default new Router({
    routes: [
        {
            path: '/suppliergoods',
            component: SupplierHome,
            children: [
                {
                    path: '/dashboard',
                    component: Dashboard,
                    meta: { title: '系统首页' }
                },
                {
                    path: '/suppliergoods',
                    component: Suppliergoods,
                    meta: { title: '供应商商品管理' }
                },
                {
                    path: '/supplier',
                    component: Supplier,
                    meta: { title: '供应商详情' }
                },
                {
                    path: '/statistics',
                    component: Statistics,
                    meta: { title: '统计' }
                },

            ]
        },
        {
            path: "/",
            component: Registere
        },
        {
            path: "/register",
            component: Registere
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/details",
            component: Details
        },
        {
            path: "/detailses",
            component: Detailses
        }

    ]
})

