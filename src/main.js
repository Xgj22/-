import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
Vue.config.productionTip = false
//三级联动，全局组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import { MessageBox,Button } from 'element-ui';
Vue.use(Button)
//消息提示框
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert;
// 分页器
import Pagination from '@/components/Pagination'
//1组件名字，2哪个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// //测试一下
// import {reqCategoryList} from '@/api'
import store from '@/store'
import * as API from '@/api'
//引入一下让虚拟服务器运行
import '@/mock/mockServer'
//引入表单校验插件
import '@/plugins/validate'
const vm = new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
