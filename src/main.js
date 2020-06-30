import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '../src/assets/css/reset.css'
import '../src/assets/stulus/mixins.styl'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
     loading: require('./assets/111.jpg'),//加载中图片，一定要有，不然会一直重复加载占位图
    //  error: require('img/error.png')  //加载失败图片
});
//加载mockServer
import './mock/mockServer'

import { Button,Dialog  } from 'vant';

Vue.use(Button)

Vue.prototype.$Dialog=Dialog
Vue.config.productionTip = false




Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
