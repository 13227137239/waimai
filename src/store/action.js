
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
    },
    //异步保存商品信息
    AsyncGetShopGoods(context,goods){
   context.commit('getShopGoods',goods)
  
    },
    //异步保存评价
   AsyncGetRatings(context,ratings){
   context.commit('getRatings',ratings)
    },
    //异步保存店铺信息
   AsyncGetInfo(context,info){
   context.commit('getInfo',info)
    },
    //更新food
    updateFoodCount(context,{isAdd,food}){
        if(isAdd){
        context.commit('truecount',{food})
        }else{
        context.commit('falsecount',{food})
        }
    }

}