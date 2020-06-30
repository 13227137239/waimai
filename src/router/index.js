import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../components/MSite/MSite.vue'
import Order from '../components/Order/Order.vue'
import Profile from '../components/Profile/Profile.vue'
import Search from '../components/Search/Search.vue'
import Login from '../components/Login/Login.vue'
import Shop from '../components/Shop/Shop.vue'
import ShopGoods from '../components/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../components/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../components/Shop/ShopInfo/ShopInfo.vue'

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

  },
  {
    path:'/shop',
    component:Shop,
    children:[
      {
        path:"/shopGoods",
        component:ShopGoods,
      },
      {
        path:"/shopRatings",
        component:ShopRatings,
      },
      {
        path:"/shopInfo",
        component:ShopInfo,
      },
      {
        path:'',
        redirect:'/shopGoods'
      }
    ]
  }
]


//点相同路由会报错
const originalreplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
 return originalreplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
