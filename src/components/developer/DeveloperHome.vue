<template>
  <div>
    <div style="height: 100%;width: 100%;position: absolute">
      <el-container style="height: 100%">
        <!--顶部栏-->
        <el-header>
          <el-row>
            <el-col :span="6">
              <h2>开发商首页</h2>
            </el-col>
            <el-col :span="18">
              <el-menu mode="horizontal" :default-active="activeIndex">
                <!--<el-menu-item index="1">1</el-menu-item>-->
                <el-submenu index="2">
                  <template slot="title" style="color: #dc143c">游戏管理</template>
                  <el-menu-item index="2-1">
                    <router-link to="/developerGameList"> 游戏列表</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="/developerGameAdd">发布游戏</router-link>
                  </el-menu-item>
                </el-submenu>

                <el-submenu index="5">
                  <template slot="title" style="color: #dc143c">游戏论坛</template>
                  <el-menu-item index="5-1">
                    <!--<router-link to="/playerRatingList">论坛首页</router-link>-->
                    <router-link to="/developerForumHome">论坛首页</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-2">
                    <router-link to="/myEssayList2">我的文章</router-link>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title" style="color: #dc143c">资产管理</template>
                  <el-menu-item index="4-1">
                    <router-link to="/developerWalletInfo">资产信息</router-link>
                  </el-menu-item>
                 <!-- <el-menu-item index="4-2">
                    <router-link to="#">待定</router-link>
                  </el-menu-item>-->
                </el-submenu>

                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    {{this.developerInfo.name}}
                  </template>
                  <el-menu-item index="3-1" style="margin-bottom: 10px">
                    <el-button @click="destorySession">退出登录</el-button>
                  </el-menu-item>
                  <el-menu-item index="3-2" style="margin-bottom: 10px">
                    <router-link to="/developerInfo">
                      <el-button>开发商信息</el-button>
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
    name: "DeveloperHome",
    data() {
      return {
        developerInfo: {
          //user
          id: '',
          username: '',
          password: '',
          type: 2,
          create_time: 0,
          //developer
          deposit: 0,
          name: '',
          phone: '',
          description: '',
        },
        activeIndex: '2-1',//顶部栏选的哪个
      }
    },
    created() {
      this.developerHomeLoad();
    },
    methods: {
      //加载主页
      async developerHomeLoad() {
        const {data: res} = await this.$axios.get('/apis/developer/homeLoad')
        if (res.code === 0) {//失败
          this.$message.error(res.msg)
          this.$router.push('/')
        } else {//成功
          //表示欢迎
          this.$message.success(res.msg)
          //更新数据
          this.developerInfo.name=res.data.developer.name;
        }


      },
      //注销
      async destorySession() {
        const {data: res} = await this.$axios.get('/apis/login/destorySession')
        this.$message.info("您已退出登录")
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
