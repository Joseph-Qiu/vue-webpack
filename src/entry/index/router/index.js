import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const Home = () => import(/* webpackChunkName:"home" */ '../views/home/index.vue');

export default new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/home',
            component: Home,
            name: 'home'
        }
    ]
});
