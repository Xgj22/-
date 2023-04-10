//购物车的小仓库
import { reqGetShopCartList,reqDeleteShopCartList,reqUpdateChecked} from '@/api'
import SET_USERID from '@/utils/uuid_token'

const actions = {
    async getShopCartList({commit}){
        let result = await reqGetShopCartList()
        //需要携带用户的临时ID，利用请求头携带过去
        if(result.code==200){
            commit('GETSHOPCARTLIST',result.data)
        }
    },
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteShopCartList(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fault'))
        }
    },
    async changeChecked({commit},{skuId,isChecked}){
        let result = await reqUpdateChecked(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fault'))
        }
    },
    async deleteAllCart({getters,dispatch}){
        let promiseAll = []
        getters.cartInfoList.forEach(element => {
            if(element.isChecked==1){
                promiseAll.push(dispatch('deleteCartListBySkuId',element.skuId)) 
            }
        });
        try {
            await Promise.all(promiseAll)
            return 'ok'
        } catch (error) {}
    },
    async allUpdateCheck({getters,dispatch},checked){
        let promiseAll = []
        getters.cartInfoList.forEach(element =>{
            promiseAll.push(dispatch('changeChecked',{
                skuId:element.skuId,
                isChecked:checked == true ? "1" : "0"
            }))
        })
        try {
            await Promise.all(promiseAll)
            return 'ok'
        } catch (error) {
            
        }
    }
}
const mutations = {
    GETSHOPCARTLIST(state,data){
        state.cartList = data[0] || []
        // console.log(state.cartList.cartInfoList)
    }
}
const state = {
    //vuex仓库存储用户临时身份,vuex存储数据确实非持久化的，SET_USERID执行返回结果,可是本地存储获取的！！
    USER_ID: SET_USERID(),
    cartList:{},
}
const getters = {
    // 计算新的属性:state,当前小仓库的数据
    cartInfoList(state){
        // console.log(state.cartList.cartInfoList)
        return state.cartList.cartInfoList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}