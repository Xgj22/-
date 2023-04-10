import { reqGetcode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqUserLogout } from "@/api"

const actions = {
    async getCode({commit},phone){
        let result = await reqGetcode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fault'))
        }
    },
    async userRegister({commit},{phone,password,code}){
        let result = await reqUserRegister({phone,password,code})
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fault'))
        }
    },
    async userLogin({commit},{phone,password}){
        let result = await reqUserLogin({phone,password})
        
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fault'))
        }
    }
    ,
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        if(result.code==200){
            commit('USERNAME',result.data.nickName)
            return 'ok'
        }else{
            return Promise.reject(new Error('fault'))
        }
    },
    async userLogout({commit}){
        let result = await reqUserLogout()
        if(result.code==200){
            commit('USERLOGOUT',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fault'))
        }
    }
}

const mutations = {
    GETCODE(state,data){
        state.code = data
    },
    USERLOGIN(state,data){
        state.token = data
    },
    USERNAME(state,data){
        state.nickName = data
    },
    USERLOGOUT(state,data){
        state.code = ''
        state.nickName = ''
        //本地存储令牌清空
        localStorage.removeItem('TOKEN');
    }
}

const state = {
    code:'',
    //身份标识符很重要【存储在vuex】
    token: localStorage.getItem("TOKEN"),
    nickName:''
}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}