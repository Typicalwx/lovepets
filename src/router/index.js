import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
<<<<<<< HEAD
import SupplierHome from "../components/common/supplierHome.vue";
import Dashboard from "../components/page/suppliergoods/Dashboard.vue";
import Statistics from "../components/page/suppliergoods/statistics.vue";
// import Store from "../components/page/suppliergoods/store.vue";
import Suppliergoods from "../components/page/suppliergoods/supplier.vue";
import Supplier from "../components/page/supplier/sup";
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

    ]
})
=======
import Registere from "../components/registere/index"
import Login from "../components/login/index"
import Details from "../components/details/index"
import Detailses from "../components/detailses/index"
import VueRouter from 'vue-router';
Vue.use(VueRouter); //注册
export default new VueRouter({
    mode: "history",
    routes: [

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

>>>>>>> wlm
