import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const User = () => import(/* webpackChunkName:"user" */ '../views/user/index.vue');
const Home = () => import(/* webpackChunkName:"home" */ '../views/index/index.vue');

export default new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/user',
            component: User,
            name: 'user'
        },
        {
            path: '/home',
            component: Home,
            name: 'home'
        }
    ]
});
