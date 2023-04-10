import axios from 'axios'
import nProgress from 'nprogress'
import "nprogress/nprogress.css"

const mockRequests = axios.create({
    //配置对象
    baseURL:'/mock',
    timeout:5000
})
//请求拦截器
mockRequests.interceptors.request.use((config)=>{
    nProgress.start()
    //config：配置对象，对象里面有一个重要属性，请求头headers
    return config
})

//响应拦截器
mockRequests.interceptors.response.use((res)=>{
    nProgress.done()
    //成功的回调函数
    return res.data
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default mockRequests