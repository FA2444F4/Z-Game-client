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
import {Message} from 'element-ui'

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
//注意：这里使用的$message,所以在使用时候也是this.$message
Vue.prototype.$message = function(msg){
  return Message({
    message: msg,
    duration: 500
  })
}
//分别对success、warning和error等样式进行设置
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 500
  })
}
Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 500
  })
}
Vue.prototype.$message.error = function (msg) {
  return Message.error({
    message: msg,
    duration: 500
  })
}
Vue.prototype.$message.info = function (msg) {
  return Message.error({
    message: msg,
    duration: 500
  })
}

new Vue({
  //挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
