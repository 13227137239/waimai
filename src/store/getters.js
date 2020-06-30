export default {
    totalCount(state){
        return state.cartList.reduce((total,currentValue)=>total+currentValue.count,0)
    },
    totalPrice(state){
        return state.cartList.reduce((total,currentValue)=>total+currentValue.count*currentValue.price,0)
    },
}