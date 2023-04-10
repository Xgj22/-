import requests from "./request";
import mockRequests from "./mockAjax";
//三级联动接口
///api/product/getBaseCategoryList get 无参数
//发请求：axios发送请求返回结果Promise对象

export const reqCategoryList = () => requests({
    url:'/product/getBaseCategoryList',
    method:'get'
})

export const reqGetBannerList = () => mockRequests({
    url:'/banners',
    method:'get'
})

export const reqGetPhotoList = () => mockRequests({
    url:'/floors',
    method:'get'
})

export const reqGetSearchInfo = (pagram) =>requests({
    url:'/list',
    method:'post',
    data:pagram
})

export const reqGetDetailInfo = (skuId) =>requests({
    url:`/item/${skuId}`,
    method:'get'
})

export const reqAddOrUpdateCart = (skuId,skuNum) =>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

//获取购物车列表
export const reqGetShopCartList = () =>requests({
    url:'/cart/cartList',
    method:'get'
})

//删除购物车列表
export const reqDeleteShopCartList = (skuId) =>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})

//更新商品的选择状态
export const reqUpdateChecked = (skuId,isChecked) =>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

//获取注册验证码
export const reqGetcode = (phone) =>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})

//用户注册，由于接口中没有提供带参路径，直接data携带过去
export const reqUserRegister = (params) =>requests({
    url:'/user/passport/register',
    data:params,
    method:'post'
})

//登录的接口
export const reqUserLogin = (params) =>requests({
    url:'/user/passport/login',
    data:params,
    method:'post'
})

//获取用户登录成功以后用户信息的接口
export const reqGetUserInfo = () =>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

//退出登录
export const reqUserLogout = () =>requests({
    url:'/user/passport/logout',
    method:'get'
})

//获取用户地址信息
export const reqAddressInfo = () =>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

//获取商品清单数据
export const reqShopInfo = () =>requests({
    url:'/order/auth/trade',
    method:'get'
})

//请求订单
export const reqSumbitOrder = (tradeNo,params) =>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data:params,
    method:'post'
})

//获取订单支付信息
export const reqPayInfo = (orderId) =>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

//获取订单支付状态
export const reqGetPayStatus = (orderId) =>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

//获取我的订单
export const reqGetMyOrderList = (page,limit) =>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})