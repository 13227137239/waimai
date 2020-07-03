<template>
  <section class="search" >
    <HeaderTop title="搜索"></HeaderTop>

    <form class="search_form">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model.trim="getarr.keyword"/>
      <input type="button" value="提交" class="search_submit" @click="search"/>
    </form>
    <section class="list" v-if="SearchList.length>0" style="overflow: hidden;height: 515px;">
      <ul class="list_container" ref="listscroll">
        <li class="list_li" v-for="(item,index) in SearchList" :key="index">
          <section class="item_left">
            <img src="https://s1.ax1x.com/2020/07/02/NbsBMn.th.png" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.recent_order_num}} 单</p>
              <p>{{item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}} 公里</p>
            </div>
          </section>
        </li>
      </ul>
    </section>
     <div class="search_none" v-else>{{show?'请输入搜索内容':'很抱歉！无搜索结果'}}</div>

  </section>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import BScroll from 'better-scroll'
export default {
  data(){
    return{
      
      getarr:{
         keyword:'',
         this1:this
      },
       
      show:true,
      // yes:true

    }
  },
  watch:{
  SearchList(val){
     this.$nextTick(()=>{

           if(this.$refs.listscroll){
                            const ul = this.$refs.listscroll
      ul.style.height = this.SearchList.length*71+'px'
      //重新输入才会创建滚动条
      if(this.now == this.getarr.keyword){
        this.scroll.refresh()
        return
      }
       this.scroll =   new BScroll('.list')
           }
  
     this.now = this.getarr.keyword
     
})
    // }
 
if(val.length==0){
  this.show=false
}
  }
  },
  components: {
    HeaderTop
  },
  computed:{
    ...mapState(['SearchList'])
  },
  methods:{
    ...mapActions(['AsyncSearch']),
    search(){
      if(this.getarr.keyword){
        this.AsyncSearch(this.getarr)
      }
    }
  },
  mounted(){
    if(this.SearchList.length){
       this.$nextTick(()=>{
      if(!this.scroll){
       this.scroll =   new BScroll('.list')
      }else if(this.scroll){
        this.scroll.refresh()
      }
    })
    }  
  }
}
</script>
 <style lang="stylus" rel="stylesheet/stylus">
 @import '../../assets/stulus/mixins.styl'
 .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
      height: 30px;
      line-height: 30px;

</style>