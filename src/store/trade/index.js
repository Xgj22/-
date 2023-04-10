import { reqAddressInfo,reqShopInfo } from "@/api"

const actions = {
    async addressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code==200){
            commit('GETADDRESS',result.data)
            return 'ok'
        }else{
            Promise.reject(new Error('fault'))
        }
    },
    async getShopInfo({commit}){
        let result = await reqShopInfo()
        if(result.code==200){
            commit('GETSHOPINFO',result.data)
            return 'ok'
        }else{
            Promise.reject(new Error('fault'))
        }
    }
}

const mutations = {
    GETADDRESS(state,data){
        return state.addressInfo = data || []
    },
    GETSHOPINFO(state,data){
        return state.tradeInfo = data || {}
    }
}

const state = {
    addressInfo:[],
    tradeInfo:{}
}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}