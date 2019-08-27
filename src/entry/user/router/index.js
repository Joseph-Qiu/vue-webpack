import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const My = () => import(/* webpackChunkName:"my" */ '../views/my/index.vue');

export default new Router({
    routes: [
        {
            path: '/',
            component: My
        },
        {
            path: '/my',
            component: My,
            name: 'my'
        }
    ]
});
