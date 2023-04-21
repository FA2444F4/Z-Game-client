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
import DeveloperWalletInfo from "../components/developer/assets/DeveloperWalletInfo.vue";
import PlayerWalletInfo from "../components/player/assets/PlayerWalletInfo.vue";
import PlayerHaveGameList from "../components/player/game/PlayerHaveGameList.vue";
import PlayerRatingList from "../components/player/game/PlayerRatingList.vue";
import ForumHome from "../components/forum/ForumHome.vue";
import MyEssayList from "../components/forum/MyEssayList.vue";
import EssayInfo from "../components/forum/EssayInfo.vue";
import Bus from "../components/utils/Bus.vue";
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
        {path: '/administratorForumHome', component: ForumHome ,name: 'ForumHome'},
        {path: '/myEssayList0', component: MyEssayList,name:'MyEssayList'},
        {path: '/essayInfo0',component: EssayInfo,name: 'EssayInfo0'},
        // {path: '/essayInfo00',component: EssayInfo,name: 'EssayInfo'},

      ]
    },
    {//玩家首页
      path: '/playerHome',
      name: 'playerHome',
      component: PlayerHome,
      redirect: '/playerGameRecommend',
      children: [
        {path: '/playerInfo', component: PlayerInfo},
        {path: '/playerGameList', component: PlayerGameList},
        {path: '/playerGameRecommend', component: PlayerGameRecommend},
        {path: '/playerGameInfo', component: PlayerGameInfo, name: 'PlayerGameInfo'},
        {path: '/playerWalletInfo', component: PlayerWalletInfo, name: 'PlayerWalletInfo'},
        {path: '/playerHaveGameList', component: PlayerHaveGameList, name: 'PlayerHaveGameList'},
        {path: '/playerRatingList', component: PlayerRatingList, name: 'PlayerRatingList'},
        {path: '/playerForumHome', component: ForumHome ,name: 'ForumHome'},
        {path: '/myEssayList1', component: MyEssayList,name:'MyEssayList'},
        {path: '/essayInfo1',component: EssayInfo,name: 'EssayInfo1'},
        // {path: '/essayInfo11',component: EssayInfo,name: 'EssayInfo'},






      ]
    },
    {//开发商首页
      path: '/developerHome',
      name: 'developerHome',
      component: DeveloperHome,
      redirect: '/developerGameList',
      children: [
        {path: '/developerInfo', component: DeveloperInfo},
        {path: '/developerGameList', component: DeveloperGameList},
        {path: '/developerGameAdd', component: DeveloperGameAdd},
        {path: '/developerGameUpdate', component: DeveloperGameUpdate, name: 'DeveloperGameUpdate'},
        {path: '/developerWalletInfo', component: DeveloperWalletInfo, name: 'DeveloperWalletInfo'},
        {path: '/developerForumHome', component: ForumHome ,name: 'ForumHome'},
        {path: '/myEssayList2', component: MyEssayList,name:'MyEssayList'},
        {path: '/essayInfo2',component: EssayInfo,name: 'EssayInfo2'},
        // {path: '/essayInfo22',component: EssayInfo,name: 'EssayInfo'},



      ]
    },
    {path: '/playerRegister', component: playerRegister},
    {path: '/developerRegister', component: developerRegister},
    {path:'/bus',component:Bus,name:'Bus'},


  ],
})

//向外共享路由实例对象
export default router
