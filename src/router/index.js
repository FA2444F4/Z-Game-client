import Vue from 'vue'
import VueRouter from "vue-router";
// @代表src目录
// import BookList from "@/components/BookList";
import Login from "../components/loginAndRegister/Login.vue";
import AdministratorHome from "../components/administrator/AdministratorHome";
import PlayerHome from "../components/player/PlayerHome";
import DeveloperHome from "../components/developer/DeveloperHome";
import playerRegister from "../components/loginAndRegister/PlayerRegister";
import developerRegister from "../components/loginAndRegister/DeveloperRegister";
import TagManage from "../components/administrator/TagManage";
import AdministratorInfo from "../components/administrator/AdministratorInfo";
import PlayerInfo from "../components/player/PlayerInfo";
import DeveloperInfo from "../components/developer/DeveloperInfo";
import DeveloperGameAdd from "../components/developer/game/DeveloperGameAdd.vue";
import DeveloperGameList from "../components/developer/game/DeveloperGameList.vue";
import DeveloperGameUpdate from "../components/developer/game/DeveloperGameUpdate.vue";
import PlayerGameList from "../components/player/game/PlayerGameList.vue";
import PlayerGameRecommend from "../components/player/game/PlayerGameRecommend.vue";
import PlayerGameInfo from "../components/player/game/PlayerGameInfo.vue";

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
      redirect:'/playerGameRecommend',
      children: [
        {path: '/playerInfo', component: PlayerInfo},
        {path:'/playerGameList',component: PlayerGameList},
        {path:'/playerGameRecommend',component: PlayerGameRecommend},
        {path:'/playerGameInfo',component: PlayerGameInfo,name:'PlayerGameInfo'},
      ]
    },
    {//开发商首页
      path: '/developerHome',
      name: 'developerHome',
      component: DeveloperHome,
      redirect:'/developerGameList',
      children: [
        {path: '/developerInfo', component: DeveloperInfo},
        {path: '/developerGameList', component: DeveloperGameList},
        {path: '/developerGameAdd',component: DeveloperGameAdd},
        {path: '/developerGameUpdate',component: DeveloperGameUpdate,name:'DeveloperGameUpdate'},
      ]
    },
    {path: '/playerRegister', component: playerRegister},
    {path: '/developerRegister', component: developerRegister},



  ],
})

//向外共享路由实例对象
export default router
