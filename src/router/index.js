import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Storehome from "../components/common/Storehome.vue";
import Dashboard from "../components/page/stores/Dashboard.vue";
import Statistics from "../components/page/stores/statistics.vue";
import Store from "../components/page/stores/store.vue";
import Supplier from "../components/page/stores/supplier.vue";
import Users from "../components/page/stores/users.vue";
import Serve from "../components/page/stores/serve/serveindex"
import Order from "../components/page/stores/order/orderindex"
// import Login from "../components/page/stores/Login.vue"
export default new Router({
    mode: 'history',
    routes: [
        {
            path:"/",
            redirect:"/storeinfo"
        },
        {
            path: '/storeguanli',
            component: Storehome,
            children:[
                {
                    path: '/storeinfo',
                    component:Dashboard,
                    meta: { title: '门店信息' }
                },
                {
                    path: '/storemanage',
                    component:Store ,
                    meta: { title: '门店商品' }
                },
                {
                    path: '/storesupplier',
                    component: Supplier,
                    meta: { title: '评论管理' }
                },
                {
                    path: '/storeserve',
                    component: Serve,
                    meta: { title: '服务管理' }
                },
                {
                    path: '/storeusers',
                    component: Order,
                    meta: { title: '订单管理' }
                },
                {
                    path: '/storestatistics',
                    component:Statistics,
                    meta: { title: '统计' }
                },
              
            ]
        },
     
    ]
})
