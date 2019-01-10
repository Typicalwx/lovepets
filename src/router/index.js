import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Home from "../components/common/Home.vue";
import Dashboard from "../components/page/Dashboard.vue";
import Statistics from "../components/page/statistics.vue";
import Store from "../components/page/store.vue";
import Supplier from "../components/page/supplier.vue";
import Users from "../components/page/users.vue";
import Petowners from "../components/page/petowners/petowners.vue";
import PetPage from "../components/common/petowner/petPage.vue";
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: Home,
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
                    // PetPage
                    // Petowners
                    path: '/petowners',
                    component: Petowners,
                    meta: { title: '宠主管理' }
                },
                {
                    path: '/statistics',
                    component: Statistics,
                    meta: { title: '统计' }
                },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
