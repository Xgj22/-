// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
// 路由懒加载
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
//注意是routes
export default [
    {
        redirect:'/center/myorder',
        path:'/center',
        component:Center,
        meta:{
            ishow:true
        },
        children:[
            {
                path:'/center/myorder',
                component:myOrder,
            },
            {
                path:'/center/grouporder',
                component:groupOrder,
            }
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{
            ishow:true
        }
    },
    {
        path:'/pay/:tradeNo?',
        component:Pay,
        meta:{
            ishow:true
        }
    },
    {
        path:'/trade',
        component:Trade,
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next('false')
            }
        },
        meta:{
            ishow:true
        }
    },
    {
        path:'/shopcart', 
        component:ShopCart,
        beforeEnter: (to, from, next) => {
            if(from.path=='/addcartsucess'){
                next()
            }else{
                next('false')
            }
        },
        meta:{
            ishow:true
        }
    },
    {
        path:'/addcartsucess',
        // 
        // name:'addcartsucess',
        component:AddCartSuccess,
        meta:{
            ishow:true
        }
    },
    {
        path:'/detail/:skuId?',
        component:Detail,
        meta:{
            ishow:true
        }
    },
    {
        path:'/home',
        component:() => import('@/pages/Home'),
        meta:{
            ishow:true
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            ishow:false
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            ishow:false
        }
    },
    {
        name:"search",
        //写了占位符会导致 只写了路径的routerlink无法跳转
        path:'/search/:keyword',
        // path:'/search',
        component:Search,
        meta:{
            ishow:true
        },
        
    },
    //重定向,在项目跑起来的时候，访问/，立刻访问到首页
    {
        path:'*',
        redirect:"/home",
        meta:{
            ishow:true
        }
    }
]
    
        
    


