import Vue from 'vue'
import App from './App'
// 导入路由模块
import router from './router'
// 导入axios
import axios from "axios";
//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Loading} from "element-ui";

Vue.config.productionTip = false

//声明请求拦截器
let loadingInstance =null
axios.interceptors.request.use((config)=>{
  //展示loading效果
  loadingInstance =Loading.service({fullscreen:true})
  return config
})
//声明响应拦截器
axios.interceptors.response.use((response)=>{
  //隐藏loading效果
  loadingInstance.close()
  return response
})


// 全局配置axios
Vue.prototype.$axios = axios
//注册element ui
Vue.use(ElementUI)


new Vue({
  //挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
