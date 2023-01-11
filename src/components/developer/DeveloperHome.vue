<template>
  <div>
    <h1>developerHome</h1>
    <el-button @click="destorySession">注销</el-button>
  </div>
</template>

<script>
  export default {
    name: "DeveloperHome",
    data(){
      return{
        developerInfo:{
          //user
          id:'',
          username:'',
          password: '',
          type:1,
          create_time:''
        }
      }
    },
    created() {
      this.developerHomeLoad();
    },
    methods:{
      //加载主页
      async developerHomeLoad(){
        const {data: res}=await this.$axios.get('/apis/developer/homeLoad')
        if (res.code===0){//失败
          this.$message.error(res.msg)
          this.$router.push('/')
        }else {//成功
          //表示欢迎
          this.$message.success(res.msg)
          //更新数据

        }


      },
      //注销
      async destorySession(){
        const {data: res}=await this.$axios.get('/apis/login/destorySession')
        this.$message.info("您已退出登录")
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
