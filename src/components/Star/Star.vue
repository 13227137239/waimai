<template>

    <div class="star" :class="'star-'+size">
      <span class="star-item " v-for="(sc,index) in starclass" :class="sc" :key="index"></span>

    </div>
  
</template>
<script>

export default {
    props:{
        score:Number,
        size:Number
    },
    computed:{
        starclass(){
            const {score} = this
            let starList = []
            //加上满星  
            for(let i=0;i<Math.floor(score);i++){
                starList.push('on')
            }
            //加上半星
            if(score<Math.round(score)){
                starList.push('half')
            }
            let ll = starList.length
            //剩余长度
            for(let j=0;j<5-ll;j++){
                starList.push('off')
            }
            return starList
        }
    }
}

</script>
<style lang="stylus" rel="stylessheet/stylus">
@import "../../assets/stulus/mixins.styl"
// bg-image($url)
//   background-image: url($url + "@2x.png")
//   @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
//     background-image: url($url + "@3x.png")



 .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>