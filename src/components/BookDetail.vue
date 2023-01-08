<template>
  <div>
    <!--<h1>书号: {{id}}</h1>-->
    <!--<hr>
    <h2>书号: {{bookInfo.id}}</h2>
    <h2>类型: {{bookInfo.type}}</h2>
    <h2>书名: {{bookInfo.name}}</h2>
    <h2>说明: {{bookInfo.description}}</h2>-->


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>书本详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回</el-button>
      </div>
      <div class="text item">
        <p>书号: {{bookInfo.id}}</p>
        <p>类型: {{bookInfo.type}}</p>
        <p>书名: {{bookInfo.name}}</p>
        <p>说明: {{bookInfo.description}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "BookDetail",
    props: ['id'],
    data() {
      return {
        bookInfo: {}
      }

    },
    created() {
      this.getBookById()
    },
    methods: {
      async getBookById() {
        const {data: res} = await this.$axios.get("/apis/books/" + this.id)
        // console.log(res)
        if(res.code===20040)//数据失败
          return this.$message.error('获取用户数据失败')
        this.bookInfo=res.data
      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
