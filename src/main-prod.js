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


//给全局挂载一个过滤器
Vue.filter('dateFormat',function(originVal){
    const dt =  new Date(originVal)
    const y = dt.getFullYear()+''
    const m = (dt.getMonth() +1 +'').padStart(2,"0")
    const d = (dt.getDate() +'').padStart(2,'0')
    const hh = (dt.getHours() +'').padStart(2,'0')
    const mm = (dt.getMinutes()+'').padStart(2,'0')
    const ss = (dt.getSeconds()+'').padStart(2,'0')
   
    return `${y}-${m}-${d}-${hh}-${mm}-${ss}`
   })

Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
