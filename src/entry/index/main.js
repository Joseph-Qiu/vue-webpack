// import 'babel-polyfill';
import 'lib-flexible';
import Vue from 'vue';
import router from './router'
import "src/common/less/common.less";

import ElementUI from 'element-ui';
Vue.use(ElementUI);

import App from './App.vue';
import store from '../../store';

Vue.config.productionTip = false;
store.state.router = router;

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});