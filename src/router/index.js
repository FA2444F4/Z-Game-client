import Vue from 'vue'
import VueRouter from "vue-router";
// @代表src目录
// import BookList from "@/components/BookList";
import BookList from "../components/BookList.vue";
import BookDetail from "../components/BookDetail.vue";
import Login from "../components/loginAndRegister/Login.vue";
import AdministratorHome from "../components/administrator/AdministratorHome";
import PlayerHome from "../components/home/PlayerHome";
import DeveloperHome from "../components/home/DeveloperHome";
import playerRegister from "../components/loginAndRegister/playerRegister";
import developerRegister from "../components/loginAndRegister/developerRegister";
import TagManage from "../components/administrator/TagManage";


//安装路由插件
Vue.use(VueRouter)

//创建路由实例对象
const router = new VueRouter({
  // mode:"history",

  //路由规则
  routes: [
    {path: '/', redirect: '/login'},//重定向
    {path: '/login', component: Login},
    {
      path: '/administratorHome',
      name: 'administratorHome',
      component: AdministratorHome,
      children: [
        {path: '/tagManage', component: TagManage},
      ]
    },
    {path: '/playerHome', component: PlayerHome},
    {path: '/developerHome', component: DeveloperHome},
    {path: '/playerRegister', component: playerRegister},
    {path: '/developerRegister', component: developerRegister},



    {path: '/bookList', component: BookList},
    {path: '/book/:id', component: BookDetail, props: true},
  ],
})

//向外共享路由实例对象
export default router
