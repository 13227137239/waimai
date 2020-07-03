<template>
  <div>
      <Shopheader></Shopheader>
     <div class="tab">
         <div class="tab-item">
             <router-link to="/shopGoods" replace>点餐</router-link>
         </div>
         <div class="tab-item">
             <router-link to="/shopRatings" replace>评价</router-link>
         </div>
         <div class="tab-item">
             <router-link to="/shopInfo" replace>商家</router-link>
         </div>
     </div>
     <keep-alive>
          <router-view></router-view>
     </keep-alive>
     
  </div>
</template>
<script>
import Shopheader from './ShopHeader/Shopheader.vue'
import {mapActions} from 'vuex'
export default {
    components:{
        Shopheader
    },
    methods:{
        ...mapActions(['AsyncGetShopGoods','AsyncGetRatings','AsyncGetInfo'])
    },
   async mounted(){

        const {data:src2} = await this.$http.get('/info')
        this.AsyncGetInfo(src2)
        console.log(src2)
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stulus/mixins.styl'
.tab
 height 40px
 line-height 40px
 background #fff
 bottom-border-1px:#666666
//
  .tab-item
   float left
   width: 33.33333%
   text-align center
   font-size 14px
   color:#999999

   a
    display block
    position relative
    &.router-link-active
     color #02a774
     &::after
      content ''
      position absolute
      left 50%
      bottom 1px
      width 35px
      height 2px
      transform translateX(-50%)
      background #02a774
</style>