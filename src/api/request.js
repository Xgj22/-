
import store from '@/store'
import axios from 'axios'
import nProgress from 'nprogress'
import "nprogress/nprogress.css"

const requests = axios.create({
    //配置对象
    baseURL:'/api',
    timeout:5000
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    nProgress.start()
    //config：配置对象，对象里面有一个重要属性，请求头headers
    if(store.state.shopcart.USER_ID){
        config.headers.userTempId = store.state.shopcart.USER_ID;
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    //每一次发请求,请求头携带用户临时身份
    // config.headers.userTempId = SET_USERID();
    //不管那个模块发请求,请求拦截器，都可以触发。请求拦截器可以通过请求头每一次协大公共参数给服务器【用户未登录的临时身份】
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    nProgress.done()
    //成功的回调函数
    return res.data
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default requests