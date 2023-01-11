<template>
  <div>
    <div style="height: 100%;width: 100%;position: absolute">
      <el-container style="height: 100%">
        <!--顶部栏-->
        <el-header>
          <el-row>
            <el-col :span="6">
              <h2>管理员首页</h2>
            </el-col>
            <el-col :span="18">
              <el-menu mode="horizontal" :default-active="activeIndex">
                <el-menu-item index="1">1</el-menu-item>
                <el-submenu index="2">
                  <template slot="title">游戏管理</template>
                  <el-menu-item index="2-1">
                    <router-link to="/tagManage">标签管理</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="#">2-2</router-link>
                  </el-menu-item>
                </el-submenu>

                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    {{this.administratorInfo.nick_name}}
                  </template>
                  <el-menu-item index="3-1" style="margin-bottom: 10px">
                    <el-button @click="destorySession">退出登录</el-button>
                  </el-menu-item>
                  <el-menu-item index="3-2" style="margin-bottom: 10px">
                    <el-button>待定</el-button>
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
    name: "AdministratorHome",
    created() {
      this.administratorHomeLoad();
    },
    data() {
      return {
        administratorInfo: {
          id: '',
          username: '',
          password: '',
          type: 0,
          create_time: null,

          nick_name: '管理员昵称(预设测试)'
        },
        activeIndex: '1',//顶部栏选的哪个

      }
    },
    methods: {
      //加载主页
      async administratorHomeLoad() {
        const {data: res} = await this.$axios.get('/apis/administrator/homeLoad')
        if (res.code === 0) {//失败
          this.$message.error(res.msg)
          this.$router.push('/')
        } else {//成功
          //表示欢迎
          /*//测试 判断是否能不欢迎
          console.log(this.$route.params.dontWelcome)
          if(this.$route.params.dontWelcome!==undefined&&this.$route.params.dontWelcome!==null)*/
            this.$message.success(res.msg)
          //更新数据
          this.administratorInfo.nick_name=res.data.administrator.nick_name;
        }


      }
      ,
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
