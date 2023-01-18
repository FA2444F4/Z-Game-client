import Vue from 'vue'
import VueRouter from "vue-router";
// @代表src目录
// import BookList from "@/components/BookList";
import BookList from "../components/BookList.vue";
import BookDetail from "../components/BookDetail.vue";
import Login from "../components/loginAndRegister/Login.vue";
import AdministratorHome from "../components/administrator/AdministratorHome";
import PlayerHome from "../components/player/PlayerHome";
import DeveloperHome from "../components/developer/DeveloperHome";
import playerRegister from "../components/loginAndRegister/PlayerRegister";
import developerRegister from "../components/loginAndRegister/DeveloperRegister";
import TagManage from "../components/administrator/TagManage";
import GameManage from "../components/developer/game/GameManage";
import AdministratorInfo from "../components/administrator/AdministratorInfo";
import PlayerInfo from "../components/player/PlayerInfo";
import DeveloperInfo from "../components/developer/DeveloperInfo";


//安装路由插件
Vue.use(VueRouter)

//创建路由实例对象
const router = new VueRouter({
  // mode:"history",

  //路由规则
  routes: [
    {path: '/', redirect: '/login'},//重定向
    {path: '/login', component: Login},
    {//管理员首页
      path: '/administratorHome',
      name: 'administratorHome',
      component: AdministratorHome,
      children: [
        {path: '/tagManage', component: TagManage},
        {path: '/administratorInfo', component: AdministratorInfo},
      ]
    },
    {//玩家首页
      path: '/playerHome',
      name: 'playerHome',
      component: PlayerHome,
      children: [
        {path: '/playerInfo', component: PlayerInfo},
      ]
    },
    {//开发商首页
      path: '/developerHome',
      name: 'developerHome',
      component: DeveloperHome,
      children: [
        {path: '/gameManage', component: GameManage},
        {path: '/developerInfo', component: DeveloperInfo}
      ]
    },
    {path: '/playerRegister', component: playerRegister},
    {path: '/developerRegister', component: developerRegister},


    {path: '/bookList', component: BookList},
    {path: '/book/:id', component: BookDetail, props: true},
  ],
})

//向外共享路由实例对象
export default router
