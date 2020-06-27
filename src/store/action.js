
export default {
    //异步获取地址
   async asyncGetAddress(context,this1){
   const {data:src} = await this1.$http.get("/dev-api/position/"+context.state.latitude+','+context.state.longitude)
   context.commit('getAddress',src.data)
    },
    //异步获取食品列表
   async asyncGetCategory(context,this1){
   const {data:src} = await this1.$http.get("/dev-api/index_category/")
   context.commit('getCategory',src.data)
    },
    //异步获取商家列表
   async asyncGetShop(context,this1){
   const {data:src} = await this1.$http.get("/dev-api/shops/?latitude="+40.10038+"&longitude="+116.36867)
   context.commit('getShop',src.data)
    }


}