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
    }


}
