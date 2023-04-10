import VueRouter from "vue-router";
import Vue from 'vue'
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter)

const router = new VueRouter({
    //配置路由
    routes,
    //设置滚动条的位置
    scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        return { y: 0 };
    }
})

router.beforeEach(async(to,from,next)=>{
    let HasToken = store.state.user.token
    //用户信息,有用户信息就不用多发一遍请求
    let hasNickName = store.state.user.nickName;
    if(HasToken){
        if(to.path=='/login'){
            next('/home')
            return false
        }else{
            if(hasNickName){
                next()
            }else{
                try {
                    //请求用户信息
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //有token但是没有用户信息，直接退出
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }    
        }
    }else{
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect='+toPath);
        } else {
            next();
        }
    }
})

export default router