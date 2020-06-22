<template>
  <div>  <section class="search">
         <HeaderTop title="搜索">

  </HeaderTop>
        <form class="search_form" action="#">
          <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
          <input type="submit" name="submit" class="search_submit">
        </form>
      </section></div>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue"
export default {
  components:{
    HeaderTop
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
$green = #02a774;
$yellow = #F5A100;
$bc = #e4e4e4;

// 一像素下边框
bottom-border-1px($color)
  position relative
  border none
  &:after
    content ''
    position absolute
    left 0
    bottom 0
    width 100%
    height 1px
    background-color $color
    transform scaleY(0.5)

// 一像素上边框
top-border-1px($color)
  position relative
  &::before
    content ''
    position absolute
    z-index 200
    left 0
    top 0
    width 100%
    height 1px
    background-color $color

//根据像素比缩放1px像素边框
@media only screen and (-webkit-device-pixel-ratio: 2 )
  .border-1px
    &::before
      transform scaleY(.5)

@media only screen and (-webkit-device-pixel-ratio: 3 )
  .border-1px
    &::before
      transform scaleY(.333333)
clearFix()
  *zoom 1
  &::after
    content ''
    display block
    clear both
    // @import "../../assets/stulus/mixins.styl"






.header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;

      .icon-sousuo {
        font-size: 25px;
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 20px;
        color: #fff;
        display: block;
      }
    }

   
  }

&.search  //搜索
          width 100%
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
</style>