<template>
  <div>
    <el-container>
      <el-main>
        <el-table :data="gameList">

          <el-table-column
            prop="header_image"
            label="游戏封面">
            <template slot-scope="scope">
              <el-image
                style="width: 200px; height: 200px"
                :src="scope.row.header_image"
                :fit="fit"></el-image>
              </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="游戏名">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <div>
                <!--修改-->
                <el-button @click.prevent="goGameInfoOrUpdatePage(row.id)">
                  详情
                </el-button>
                <!--删除-->
                <el-button @click.prevent="deleteGame(row.id)">
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "DeveloperGameList",
    created() {
      this.getAllGame();
      console.log("111")
    },
    data(){
      return{
        //所有游戏
        gameList:[
          {
            id: 0,
            name: '',
            developer_id: 0,
            price: 0,
            create_time: 0,
            description: '',
            header_image: '',
            screenshot1: '',
            screenshot2: '',
            screenshot3: '',
            is_exist: 1,
          }
        ],
        fit:'contain',
      }
    },
    methods:{
      //获取所有游戏
      async getAllGame(){
        const {data: res} = await this.$axios.get('/apis/game/getGameListByDeveloperId')
        this.gameList = res.data;
      },
      //去游戏详情页
      goGameInfoOrUpdatePage(id){
        this.$router.push({
          name:"DeveloperGameUpdate",
          // path: '/gameUpdate',
          params:{
            id:id,
          },
        })
      },
      //删除游戏
      async deleteGame(id){
        const {data: res} = await this.$axios.delete('/apis/game/deleteGame/'+id)
      },
      //判断游戏是https还是base64

    }
  }
</script>

<style scoped>

</style>
