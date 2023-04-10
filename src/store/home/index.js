//home的小仓库
//reqCategoryList
import {reqCategoryList,reqGetBannerList, reqGetPhotoList} from '@/api/index.js'

const actions = {
    async categoryList({ commit, state, dispatch }) {
        // 获取服务器的数据,存储在vuex仓库中
        // reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        // await 等待成功的结果
        let result = await reqCategoryList();
        // 判断服务器返回的状态是200->成功
        if (result.code == 200) {
            //提交mutation存储服务器数据
            commit("CATEGORYLIST", result.data);
        }
    },
    async getBannerList({ commit, state, dispatch }){
        let result = await reqGetBannerList();
        if(result.code == 200){
            //发请求成功，返回result.data
            commit('GETBANNERLIST',result.data)
        }
    },
    async getPhotoList({commit, state, dispatch }){
        let result = await reqGetPhotoList()
        if(result.code==200){
            commit('GETPHOTOLIST',result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state,data){
        state.categoryList = data
    },
    GETBANNERLIST(state,data){
        // console.log("得到数据")
        // console.log(data)
        state.bannerList = data
        
    },
    GETPHOTOLIST(state,data){
        // console.log(data)
        state.photoList = data
    }
}
const state = {
    categoryList:[],
    bannerList:[],
    photoList:[]
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}