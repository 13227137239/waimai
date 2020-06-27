<template>
  <div>
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>

        <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
        </span>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav" >
        <div class="swiper-container" v-if="categoryList.length>0">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(item2,index) in item" :key="index">
                <div class="food_container">
                  <img :src="http1+item2.image_url" />
                </div>
                <span>{{item2.title}}</span>
              </a>

            </div>
 
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./msite_back.svg" v-else >
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList></ShopList>
      </div>
    </section>
  </div>
</template>
<script>
import '../../assets/stulus/mixins.styl'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import ShopList from '.././ShopList/ShopList.vue'
import { mapState } from 'vuex'
export default {
  data(){
    return{
      http1:'http://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  watch:{
    categoryList(value){
       this.$nextTick(()=>{
           var mySwiper = new Swiper('.swiper-container', {
      // direction: 'vertical', // 垂直切换选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
       })
    }
  },
  computed: {
    ...mapState(['address', 'categoryList']),

    categorysArr() {
      
      const arr = []
      let minArr = []
      this.categoryList.forEach(item => {
         if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(item)
      })
      return arr
    }
  },
  mounted() {
    //vuex异步请求地址
    this.$store.dispatch('asyncGetAddress', this)
    this.$store.dispatch('asyncGetCategory', this)
   
  
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
$green = #02a774;
$yellow = #F5A100;
$bc = #e4e4e4;

// 一像素下边框
bottom-border-1px($color) {
  position: relative;
  border: none;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: $color;
    transform: scaleY(0.5);
  }
}

// 一像素上边框
top-border-1px($color) {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: $color;
  }
}

// 根据像素比缩放1px像素边框
@media only screen and (-webkit-device-pixel-ratio: 2) {
  .border-1px {
    &::before {
      transform: scaleY(0.5);
    }
  }
}

@media only screen and (-webkit-device-pixel-ratio: 3) {
  .border-1px {
    &::before {
      transform: scaleY(0.333333);
    }
  }
}

clearFix() {
  @css { * }zoom: 1;

  &::after {
    content: '';
    display: block;
    clear: both;
    // @import "../../assets/stulus/mixins.styl"
  }
}

&.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>