import { reqGetDetailInfo,reqAddOrUpdateCart} from "@/api";
import SET_USERID from "@/utils/uuid_token";
const actions = {
    async getDetailInfo({commit},skuId){
        let result = await reqGetDetailInfo(skuId)
        if(result.code==200){
            commit('GETDETAILINFO',result.data)
        }
    },
    async getAddOrUpdateCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateCart(skuId,skuNum)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject()
        }
    }
}

const mutations = {
    GETDETAILINFO(state,data){
        return state.detailInfo = data || {}
    }
}

const state = {
    detailInfo : {},
    USER_ID: SET_USERID(),
}

const getters = {
    categoryView(){
        return state.detailInfo.categoryView || {}
    },
    //商品信息的数据
    skuInfo() {
        return state.detailInfo.skuInfo || {}
    },
    //商品销售属性列表的数据
    spuSaleAttrList() {
        return state.detailInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}