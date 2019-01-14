import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import SupplierHome from "../components/common/supplierHome.vue";
import Dashboard from "../components/page/suppliergoods/Dashboard.vue";
import Statistics from "../components/page/suppliergoods/statistics.vue";
import Supplier from "../components/page/supplier/sup";
import Ceshi from "../components/page/stores/supplier"

import Suppliergoods from "../components/page/suppliergoods/supplier.vue"
import Registere from "../components/registere/index"
import Login from "../components/login/index"
import Details from "../components/details/index"
import Detailses from "../components/detailses/index"

import StoreGoods from "../components/page/stores/goods/index.vue";
import Storehome from "../components/common/Storehome.vue";
import StoreDashboard from "../components/page/stores/HomePage/Dashboard";
import StoreStatistics from "../components/page/stores/tongji/statistics.vue";
// import Users from "../components/page/stores/users.vue";
import Serve from "../components/page/stores/serve/serveindex"
import Order from "../components/page/stores/order/orderindex"
// import Login from "../components/page/stores/Login.vue"
import PlatformHome from "../components/common/platformHome.vue";
import DashboardMoney from "../components/page/platform/Dashboard.vue";
import StatisticsMoney from "../components/page/platform/statistics.vue";
import StoreMoney from "../components/page/platform/store.vue";
import SupplierMoney from "../components/page/platform/supplier.vue";
import Users from "../components/page/platform/users/index.vue";
// import Petowners from "../components/page/"

import PetLove from "../components/page/petowners/petowners"

import StoreAdministrator from "../components/page/storeAdministrator/storeAdministrator"


export default new Router({
    mode: "history",
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
                // {
                //     // PetPage
                //     // Petowners
                //     path: '/petowners',
                //     component: Petowners,
                //     meta: { title: '宠主管理' }
                // },
                {
                    path: '/statistics',
                    component: Statistics,
                    meta: { title: '统计' }
                },

            ]
        },
        {
            path: '/store',
            component: Storehome,
            children: [
                {
                    path: '/storedashboard',
                    component: StoreDashboard,
                    meta: { title: '门店首页' }
                },
                {
                    path: '/storegoods',
                    component: StoreGoods,
                    meta: { title: '门店商品' }
                },
                {
                    path: '/storecomment',
                    component: Ceshi,
                    meta: { title: '评论管理' }
                },
                {
                    path: '/storeserve',
                    component: Serve,
                    meta: { title: '服务管理' }
                },
                {
                    path: '/storeorder',
                    component: Order,
                    meta: { title: '订单管理' }
                },
                {
                    path: '/storestatistics',
                    component: StoreStatistics,
                    meta: { title: '统计' }
                },

            ]
        },
        {
            path: '/platform',
            component: PlatformHome,
            children: [
                {
                    path: '/dashboardmoney',
                    component: DashboardMoney,
                    meta: { title: '系统首页' }
                },
                {
                    path: '/storemoney',
                    component: StoreAdministrator,
                    meta: { title: '平台门店管理' }
                },
                {
                    path: '/suppliermoney',
                    component: PetLove,
                    meta: { title: '平台宠管理' }
                },
                {
                    path: '/users',
                    component: Users,
                    meta: { title: '平台用户管理' }
                },
                {
                    path: '/statisticsmoney',
                    component: StatisticsMoney,
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

