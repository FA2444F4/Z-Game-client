<template>
  <div>
    <h1>administratorHome</h1>
    <el-button @click="destorySession">注销</el-button>
  </div>
</template>

<script>
  export default {
    name: "AdministratorHome",
    methods:{
      //注销
      async destorySession(){
        const {data: res}=await this.$axios.get('/apis/login/destorySession')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
