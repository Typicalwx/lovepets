import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import PlatformHome from "../components/common/platformHome.vue";
import Dashboard from "../components/page/platform/Dashboard.vue";
import Statistics from "../components/page/platform/statistics.vue";
import Store from "../components/page/platform/store.vue";
import Supplier from "../components/page/platform/supplier.vue";
import Users from "../components/page/platform/users/index.vue";

export default new Router({
    mode:"history",
    routes: [
        {
            path: "/",
            redirect: '/dashboard'
        },
        {
            path: '/platform',
            component: PlatformHome,
            children: [
                {
                    path: '/dashboard',
                    component: Dashboard,
                    meta: { title: '系统首页' }
                },
                {
                    path: '/store',
                    component: Store,
                    meta: { title: '门店管理' }
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
        }
    ]
})
