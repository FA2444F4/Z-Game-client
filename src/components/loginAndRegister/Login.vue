<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container  style="height: 100%">
      <!--顶部栏-->
      <el-header>
        <el-row>
          <el-col :span="6">
            <h2>Z-Game</h2>
          </el-col>
          <el-col :span="6" :offset="12">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-submenu index="1">
                <template slot="title">注册</template>
                <el-menu-item index="1-1">
                  <router-link to="/playerRegister">玩家注册</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/developerRegister">开发商注册</router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <!--中间-->
      <el-main>
        <!--登录表单-->
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form :model="form" ref="loginForm">
              <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <!--底部栏-->
      <!--<el-footer>
      </el-footer>-->
    </el-container>
  </div>






</template>

<script>
  export default {
    name: "Login",
    data(){
      return {
        form:{
          username: '',
          password: ''
        }
      }
    },
    methods:{
      async login(){
        const {data: res}=await this.$axios.get('/apis/login/'+this.form.username+'/'+this.form.password)
        if(res.code===1){//登录成功
          if(res.data.type===0){//管理员
            this.$router.push('/administratorHome')
          }else if(res.data.type===1){//玩家
            this.$router.push('/playerHome')
          }else if(res.data.type===2){//开发商
            this.$router.push('/developerHome')
          }
        }else {
          this.$message.error("用户名或密码错误")
        }
      }
    }
  }
</script>

<style scoped>

</style>
