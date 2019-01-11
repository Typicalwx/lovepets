import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
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

