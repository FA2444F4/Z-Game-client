<template>
  <div>
    <div style="height: 100%;width: 100%;position: absolute">
      <el-container style="height: 100%">
        <!--顶部栏-->
        <el-header>
          <el-row>
            <el-col :span="6">
              <h2>玩家首页</h2>
            </el-col>
            <el-col :span="18">
              <el-menu mode="horizontal" :default-active="activeIndex">
                <el-submenu index="1">
                  <template slot="title">全网游戏</template>
                  <el-menu-item index="1-1">
                    <router-link to="/playerGameRecommend"> 游戏推荐</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2">
                    <router-link to="/playerGameList">所有游戏</router-link>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">游戏管理</template>
                  <el-menu-item index="2-1">
                    <router-link to="/playerHaveGameList">我的游戏</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="/playerRatingList">我的评分</router-link>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title" style="color: #dc143c">游戏论坛</template>
                  <el-menu-item index="5-1">
                    <!--<router-link to="/playerRatingList">论坛首页</router-link>-->
                    <router-link to="/playerForumHome">论坛首页</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-2">
                    <router-link to="/myEssayList1">我的文章</router-link>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title" style="color: #dc143c">资产管理</template>
                  <el-menu-item index="4-1">
                    <router-link to="/playerWalletInfo">资产信息</router-link>
                  </el-menu-item>
                  <!--<el-menu-item index="4-2">
                    <router-link to="#">待定</router-link>
                  </el-menu-item>-->
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    {{this.playerInfo.nick_name}}
                  </template>
                  <el-menu-item index="3-1" style="margin-bottom: 10px">
                    <el-button @click="destorySession">退出登录</el-button>
                  </el-menu-item>
                  <el-menu-item index="3-2" style="margin-bottom: 10px">
                      <router-link to="/playerInfo">
                        <el-button>玩家信息</el-button>
                      </router-link>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-header>
        <!--中间-->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!--底部栏-->
        <!--<el-footer>
        </el-footer>-->
      </el-container>
    </div>


  </div>
</template>

<script>
  export default {
    name: "PlayerHome",
    data() {
      return {
        playerInfo:{
          id: '',
          username: '',//>>>
          password: '',//>>>
          type: 1,
          create_time: 0,

          status: 0,
          deposit: 0,
          nick_name: '',//>>>
          name:'',//>>>
          sex:0,//>>>
          phone:'',//>>>
        },
        activeIndex: '1-1',//顶部栏选的哪个
      }
    },
    created() {
      this.playerHomeLoad();
    },
    methods: {
      //加载主页
      async playerHomeLoad() {
        const {data: res} = await this.$axios.get('/apis/player/homeLoad')
        if (res.code === 0) {//失败
          this.$message.error(res.msg)
          this.$router.push('/')
        } else {//成功
          //表示欢迎
          this.$message.success(res.msg)
          //更新数据
          this.playerInfo.nick_name=res.data.player.nick_name;

        }


      },
      //注销
      async destorySession() {
        const {data: res} = await this.$axios.get('/apis/login/destorySession')
        this.$message.info("您已退出登录")
        console.log("登出")
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
