<template>
  <div>
    <el-container>
      <el-main>
        <el-table :data="gameList">

          <el-table-column
            label="游戏封面">
            <template slot-scope="scope">

              <el-image
                :fit="fit"
                :src="gameList[  scope.$index ].game.header_image"
                style="width: 200px; height: 200px"></el-image>

            </template>
          </el-table-column>
          <el-table-column
            label="游戏名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="价格"
            prop="price">
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
  name: "PlayerGameList",
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
    }
  },
  created() {
    this.playerGameListLoad();
  },
  methods: {
    async playerGameListLoad() {
      const {data: res} = await this.$axios.get('/apis/game/getAllGame2')
      this.gameList = res.data;
    },
    getHeaderImage(index) {
      console.log(this.gameList[index].game.header_image)
      return this.gameList[index].game.header_image;

    }

  }
}
</script>

<style scoped>

</style>
