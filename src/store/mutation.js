import Vue from 'vue'

export default {
    //获取地址
    getAddress(state,address){
         state.address = address
    },
    //获取食品列表
    getCategory(state,category){
        state.categoryList = category
    },
    //获取商品列表
    getShop(state,shop){
        state.shopsList = shop
    },
    //保存用户信息
    receive_userInfo(state,user){
    state.userInfo = user
    },
    //保存事物列表
    getShopGoods(state,goods){
        state.goods = goods
    },
    //保存评价信息
    getRatings(state,ratings){
        state.ratings = ratings
    },
    //保存店面信息
    getInfo(state,info){
        state.info = info
    },
    //count++
    truecount(state,{food}){
        if(!food.count){
        Vue.set(food,'count',1)  
        state.cartList.push(food)
        }else{
            food.count++
        }
    
    },
    //count--
    falsecount(state,{food}){
        if(food.count){
            food.count--
            if(food.count == 0){
                state.cartList.splice(state.cartList.indexOf(food),1)
            }
        }
    },
   //搜索
   Search(state,SearchList){
       state.SearchList  =  SearchList
   }
}
