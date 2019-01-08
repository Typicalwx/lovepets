import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Home from "../components/common/Home.vue";
import Dashboard from "../components/page/supplier/Dashboard.vue";
import Statistics from "../components/page/supplier/statistics.vue";
import Store from "../components/page/supplier/store.vue";
import Supplier from "../components/page/supplier/supplier.vue";
import Users from "../components/page/supplier/users.vue";
export default new Router({
    routes: [

        {
            path: '/supplier',
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
                    path: '/statistics',
                    component: Statistics,
                    meta: { title: '统计' }
                },

            ]
        },
       
    ]
})
