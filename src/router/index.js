import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../components/MSite/MSite.vue'
import Order from '../components/Order/Order.vue'
import Profile from '../components/Profile/Profile.vue'
import Search from '../components/Search/Search.vue'
import Login from '../components/Login/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/msite',
    meta:{
      showFooter:true
    }
  },
  {
    path: '/msite',
    component: MSite,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/order',
    component: Order,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/search',
    component: Search,
    meta:{
      showFooter:true
    }
  },
  {
    path:'/login',
    component:Login

  }
]

const router = new VueRouter({
  routes
})

export default router
