//search的小仓库
import { reqGetSearchInfo } from "@/api"

const actions = {
    async reqGetSearchInfo({commit},searchParams){
        let result = await reqGetSearchInfo(searchParams);
        if(result.code === 200){
            commit('REQGETSEARCHINFO',result.data)
        }
    }
}
const mutations = {
    REQGETSEARCHINFO(state,data){
        state.searchList = data
    }
}
const state = {
    searchList:{}
}
const getters = {
    //计算新的属性:state,当前小仓库的数据
    goodsList(state){
        return state.searchList.goodsList||{}
    },
    attrsList(state){
        return state.searchList.attrsList||{}
    },
    trademarkList(state){
        return state.searchList.trademarkList||{}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}