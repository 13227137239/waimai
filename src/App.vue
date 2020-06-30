<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {mapMutations} from 'vuex'
export default {
  components: {
    FooterGuide
  },
  methods:{
    ...mapMutations(['receive_userInfo'])
  },
 async mounted(){
    const result = await this.$http.get("/dev-api/userinfo")
    if(result.data.data){
       this.receive_userInfo(result.data.data)
    }
   
    console.log(result)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>