<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods.data" :key="index" :class="index==currentIndex?'current':''" @click="showtop(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="item.icon" v-if="item.icon" />
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list-hook" v-for="(item,index) in goods.data" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(item1,index) in item.foods"
                :key="index "
                @click="showFood(item1)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="item1.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{item1.name}}</h2>
                  <p class="desc">{{item1.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{item1.sellCount}} 份</span>
                    <span>好评率 {{item1.rating}} %</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{item1.price}}</span>
                    <span class="old" v-if="item.oldPrice">￥{{item1.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper"><CartControl :food="item1"></CartControl></div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food='food'></Food>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import CartControl from '../../CartControl/CartControl.vue'
import ShopCart from '../../ShopCart/ShopCart.vue'
import Food from '../../Food/Food.vue'
import { mapState } from 'vuex'
import {mapActions} from 'vuex'

import Vue from 'vue'
export default {
    data() {
    return {
      //控制侧边栏变色
      scrollY: 0,
      tops: [],
      showfoodlistnum: 0,
      //食物详情
      food:{}
    }
  },
  components:{
    CartControl,
    Food,
    ShopCart
  },
  computed: {
    ...mapState(['goods']),
    //计算当前分类下标
    currentIndex() {
    let bb =0
      this.tops.forEach((item,index)=>{
        if(item< Math.floor(this.scrollY)){
           bb = index
        }
      })
    return bb
      
    }
  },
  methods: {
    //点击定位
    showtop(val){
      this.scrollY = this.tops[val]+5
      this.foodsScroll.scrollTo(0,-this.tops[val]-5,300)
    },
    //控制商品详情
    showFood(food){
      this.food = food
      Vue.set(food,'isShow',true)
      // this.food.isShow = true
    },
    ...mapActions(['AsyncGetShopGoods'])
  },
 async mounted(){
        const {data:src} = await this.$http.get('/goods')
        this.AsyncGetShopGoods(src)
  },

  watch: {
    goods() {
      this.$nextTick(() => {
        if(!this.foodsScroll){
 let listScroll =   new BScroll('.menu-wrapper',{
        click:true
      })
      
        //右侧滑动处理
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2,
          click:true
        })
        //收集scroll
        this.foodsScroll.on('scroll', ({ x, y }) => {
          this.scrollY = Math.abs(y)
        })
        //收集结束时的坐标（惯性没统计）
        this.foodsScroll.on('scrollEnd', ({ x, y }) => {
          this.scrollY = Math.abs(y)
        })
        //收集top
        const lis = document.getElementsByClassName('food-list-hook')
        lis.forEach((item)=>{
          this.tops.push(item.offsetTop)
        })
        }else if(this.foodsScroll){
          listScroll.refresh(),
          this.foodsScroll.refresh()
        }
     
      })
    }
  },

}
</script>

<style lang="stylus" rels="stylesheet/stylus">
@import '../../../assets/stulus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>