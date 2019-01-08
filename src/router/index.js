import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Storehome from "../components/common/Storehome.vue";
import Dashboard from "../components/page/stores/Dashboard.vue";
import Statistics from "../components/page/stores/statistics.vue";
import Store from "../components/page/stores/store.vue";
import Supplier from "../components/page/stores/supplier.vue";
import Users from "../components/page/stores/users.vue";
// import Login from "../components/page/stores/Login.vue"
export default new Router({
    mode: 'history',
    routes: [
<<<<<<< HEAD
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
=======
        {
            path:"/",
            redirect:"/dashboard"
        },
        {
            path: '/store',
            component: Storehome,
            children:[
                {
                    path: '/dashboard',
                    component:Dashboard,
                    meta: { title: '门店信息' }
>>>>>>> remotes/origin/typ
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
