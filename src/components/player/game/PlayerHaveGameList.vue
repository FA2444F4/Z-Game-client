<template>
  <div>
    <el-container>
      <!--顶部操作-->
      <!--<el-header>
        <el-row>
          <el-col :span="10">
            <el-input v-model="input" placeholder="模糊查询搜索游戏"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary"  @click="playerSelectGame(input)">搜索</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <el-button type="primary" plain @click="byRatingDescending">按评分降序</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain @click="byRatingAscending">按评分升序</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain @click="byPriceDescending">按价格降序</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain @click="byPriceAscending">按价格升序</el-button>
          </el-col>
        </el-row>
      </el-header>-->
      <!--主体-->
      <el-main>
        <el-table :data="gameList"
                  height="650">
          <!--游戏封面-->
          <el-table-column label="游戏封面">
            <template slot-scope="scope">
              <el-image
                :fit="fit"
                :src="gameList[scope.$index].game.header_image"
                style="width: 200px; height: 200px"></el-image>
            </template>
          </el-table-column>

          <!--游戏名-->
          <el-table-column
            label="游戏名">
            <template v-slot="{row}">
              {{ row.game.name }}
            </template>
          </el-table-column>


          <el-table-column
            label="价格">
            <template v-slot="{row}">
              {{ row.game.price }}
            </template>
          </el-table-column>
          <!--评分-->
          <el-table-column
            label="全网综合评分">
            <template v-slot="{row}">
               <span v-if="(row.rating===-1)">
                <span>暂无评分</span>
                </span>
              <span v-else>
                  <span>{{ row.rating }}</span>
               </span>
            </template>
          </el-table-column>


          <el-table-column label="操作">
            <template v-slot="{row}">
              <div>
                <!--详情-->
                <el-button @click.prevent="goGameInfo(row.game.id)">详情</el-button>
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
  name: "PlayerHaveGameList",
  data() {
    return {
      //所有游戏
      gameList: [
        {
          game: {
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
          },
          rating: 0,
        }
      ],
      fit: 'contain',
      input: '',
    }
  },
  created() {
    this.playerGameListLoad();
  },
  methods: {
    //加载玩家已拥有游戏
    async playerGameListLoad() {
      const {data: res} = await this.$axios.get('/apis/game/getPlayerGameList')
      this.gameList = res.data;
      // console.log(this.gameList)

    },
    getHeaderImage(index) {
      console.log(this.gameList[index].game.header_image)
      return this.gameList[index].game.header_image;

    },
    async goGameInfo(id) {
      this.$router.push({
        name: 'PlayerGameInfo',
        path: '/playerGameInfo',
        params: {
          id: id,
        }
      })
    },
    async playerSelectGame(input){
      //判断是否纯空格
      let flag=true;//true为纯空格
      for(let i=0;i<input.length;i++){
        if(input[i]!==' '){
          flag=false;
          break;
        }
      }
      if(flag){//如果纯空格
        const {data: res} = await this.$axios.get('/apis/game/getAllGame2')
        this.gameList = res.data;
        return
      }
      // console.log(input)
      if(input===''||input===null||input===undefined){
        const {data: res} = await this.$axios.get('/apis/game/getAllGame2')
        this.gameList = res.data;
        return
      }else {
        const {data: res} = await this.$axios.get('/apis/game/selectGameByInput/'+input);
        this.gameList = res.data;
        return
      }

    },
    /*async byRatingDescending(){
      const {data: res} = await this.$axios.get('/apis/game/getGameListByRatingDescending')
      this.gameList=res.data;
    },
    async byRatingAscending(){
      const {data: res} = await this.$axios.get('/apis/game/getGameListByRatingAscending')
      this.gameList=res.data;
    },
    async byPriceDescending(){
      const {data: res} = await this.$axios.get('/apis/game/getGameListByPriceDescending')
      this.gameList=res.data;
    },
    async byPriceAscending(){
      const {data: res} = await this.$axios.get('/apis/game/getGameListByPriceAscending')
      this.gameList=res.data;
    }*/


  }
}
</script>

<style scoped>

</style>
