// import 'babel-polyfill';
import 'lib-flexible';
import Vue from 'vue';
import router from './router';
import 'src/common/less/common.less';

import ElementUI from 'element-ui';

import App from './App.vue';
import store from './store';
Vue.use(ElementUI);

Vue.config.productionTip = false;
store.state.router = router;
Vue.prototype.aaa = 4;

new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
});
