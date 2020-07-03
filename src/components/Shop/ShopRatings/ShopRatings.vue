<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left" v-if="info.data">
          <h1 class="score">{{info.data.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper" v-if="info.data">
            <span class="title">服务态度</span>
            <Star :score="info.data.serviceScore" :size="36" />
            <span class="score">{{info.data.serviceScore}}</span>
          </div>
          <div class="score-wrapper" v-if="info.data">
            <span class="title">商品评分</span>
            <Star :score="info.data.foodScore" :size="36" />
            <span class="score">{{info.data.foodScore}}</span>
          </div>
          <div class="delivery-wrapper" v-if="info.data">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.data.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px" v-if="ratings.data">
          <span class="block positive" :class="selectType==2?'active':''" @click="selectType=2">
            全部
            <span class="count">{{ratings.data.length}}</span>
          </span>
          <span class="block positive"  :class="selectType==0?'active':''" @click="selectType=0">
            满意
            <span class="count">{{ratings.data.filter((item)=>{return item.rateType==0}).length}}</span>
          </span>
          <span class="block negative"  :class="selectType==1?'active':''" @click="selectType=1">
            不满意
            <span class="count">{{ratings.data.filter((item)=>{return item.rateType!=0 }).length}}</span>
          </span>
        </div>
        <div class="switch " :class="onlyText?'on':''" @click="onlyText=!onlyText">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(item,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="item.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <Star :score="item.score" :size="24" />
                <span class="delivery">{{item.deliveryTime?item.deliveryTime:'XX'}}分钟</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="item.rateType==0?'icon-thumb_up':'icon-thumb_down'"></span>
                <span class="item" v-for="(item1,index) in item.recommend" :key="index">{{item1}}</span>
              </div>
              <div class="time">{{item.rateTime | dateFormat }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Star from '../../Star/Star.vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      //只显示有文本的
      onlyText: false,
      //三个选择哪个高亮
      selectType: 2        //0满意   1no   2  
    }
  },
  components: {
    Star
  },
  methods: {
    ...mapActions(['AsyncGetRatings'])
  },
  computed: {
    ...mapState(['ratings', 'info']),
    filterRatings() {
      let { data: ratings } = this.ratings
//满意   是否只要文字
      if(this.selectType == 0){
        const arr1 =  ratings.filter((item)=>{
          return item.rateType==0
        })
        if(this.onlyText){
          return arr1.filter((item)=>{
            return (item.text.length) >0
          })
        }
        return arr1
      }
      //不满意    是否只要文字
      else if(this.selectType == 1){
        console.log(1)
       let arr2 =  ratings.filter((item)=>{
          return item.rateType==1
        })
        if(this.onlyText){
          return arr2.filter((item)=>{
            return (item.text.length) >0
          })
        }
        return arr2
      }
      //全部        是否只要文字
      else if(this.onlyText){
        return ratings.filter((item)=>{
          return (item.text.length)>0
        })
      }
      //全部     
      return ratings
    }
  },
  async mounted() {
    const { data: src1 } = await this.$http.get('/ratings')
    this.AsyncGetRatings(src1)
    console.log(src1)
  },
  watch: {
    ratings(val) {
      if ((val.data.length = 24)) {
        this.$nextTick(() => {
          // console.log(this.$refs.ratings)
        this.ratingsList =   new BScroll('.ratings')
        })
      }
     else if(ratingsList){
        this.ratingsList.refresh()
      }
    }
  }
}
</script>
<style lang="stylus" rels="stylesheet/stylus">
@import '../../../assets/stulus/mixins.styl';

.ratings {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;

        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .split {
    width: 100%;
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
  }

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      border-1px: rgba(7, 17, 27, 0.1);
      font-size: 0;

      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        background: rgba(77, 85, 93, 0.2);

        &.active {
          background: $green;
          color: #fff;
        }

        .count {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }

    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;

      &.on {
        .icon-check_circle {
          color: $green;
        }
      }

      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }

      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      display: flex;
      padding: 18px 0;
      bottom-border-1px: rgba(7, 17, 27, 0.1);

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thumb_up, .icon-thumb_down, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thumb_up {
            color: $yellow;
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>