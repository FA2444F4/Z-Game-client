<template>
  <div>
    <el-container>
      <!--顶部操作-->
      <el-header>
        <el-row>
          <el-col :span="10">
            <el-input v-model="input" placeholder="模糊查询搜索游戏"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="playerSelectGame(input)">搜索</el-button>
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
      </el-header>
      <!--主体-->
      <el-main>
        <el-table :data="gameList"
                  height="650">
          <!--游戏信息-->
          <el-table-column label="游戏信息">
            <template slot-scope="scope">
              <el-card @click.native="goGameInfo(gameList[scope.$index].game.id)">

                <el-image
                  :fit="fit"
                  :src="gameList[scope.$index].game.header_image"
                  style="width: 200px; height: 200px"></el-image>


                <h3>{{ gameList[scope.$index].game.name }}</h3>
                <p>¥{{ gameList[scope.$index].game.price }}</p>

              </el-card>

            </template>
          </el-table-column>
          <!--游戏封面-->
          <!--<el-table-column label="游戏封面">
            <template slot-scope="scope">
              <el-image
                :fit="fit"
                :src="gameList[scope.$index].game.header_image"
                style="width: 200px; height: 200px"></el-image>
            </template>
          </el-table-column>-->

          <!--游戏名-->
          <!--<el-table-column
            label="游戏名">
            <template v-slot="{row}">
              {{ row.game.name }}
            </template>
          </el-table-column>-->


          <!--价格-->
          <!--<el-table-column
            label="价格">
            <template v-slot="{row}">
              {{ row.game.price }}
            </template>
          </el-table-column>-->


          <!--评分-->
          <el-table-column
            style="height: 100%"
            label="评分">
            <template v-slot="{row}" style="height: 100%">
              <el-card style="height: 100%" >
                <!--评分-->
                <span v-if="(row.rating===-1)">
                <span>暂无评分</span>
                </span>
                <span v-else>
                <el-rate
                  v-model="row.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
              </el-rate>
               </span>
                <!--梯度分级-->

                <div style="margin-top: 10px">
                  <el-progress style="margin-top: 2px" text-inside="true" stroke-width="25"    color="#008AC2" :percentage="(100*(row.five)/(row.one+row.two+row.three+row.four+row.five))"></el-progress>
                  <el-progress style="margin-top: 2px" text-inside="true" stroke-width="25"    color="#15A2DB" :percentage="(100*(row.four)/(row.one+row.two+row.three+row.four+row.five))"></el-progress>
                  <el-progress style="margin-top: 2px" text-inside="true" stroke-width="25"    color="#1DADE8" :percentage="(100*(row.three)/(row.one+row.two+row.three+row.four+row.five))"></el-progress>
                  <el-progress style="margin-top: 2px" text-inside="true" stroke-width="25"    color="#33BCF3" :percentage="(100*(row.two)/(row.one+row.two+row.three+row.four+row.five))"></el-progress>
                  <el-progress style="margin-top: 2px" text-inside="true" stroke-width="25"    color="#5BD0FF" :percentage="(100*(row.one)/(row.one+row.two+row.three+row.four+row.five))"></el-progress>
                  <!--<el-progress :percentage="(row.five)"></el-progress>
                  <el-progress :percentage="(row.four)"></el-progress>
                  <el-progress :percentage="(row.three)"></el-progress>
                  <el-progress :percentage="(row.two)"></el-progress>
                  <el-progress :percentage="(row.one)"></el-progress>-->
                </div>
              </el-card>

            </template>
          </el-table-column>


          <!--<el-table-column label="操作">
            <template v-slot="{row}">
              <el-card>
                <div>
                  &lt;!&ndash;详情&ndash;&gt;
                  <el-button @click.prevent="goGameInfo(row.game.id)">详情</el-button>
                </div>
              </el-card>

            </template>
          </el-table-column>--><!---->
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
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        }
      ],
      fit: 'contain',
      input: '',
      //各游戏每个评分的数量
      /*gameRatingList: [
        {
          game_id: 0,
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
      ]*/
    }
  },
  created() {
    this.playerGameListLoad();

  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    async playerGameListLoad() {
      const {data: res} = await this.$axios.get('/apis/game/getAllGame2')
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
    async playerSelectGame(input) {
      //判断是否纯空格
      let flag = true;//true为纯空格
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== ' ') {
          flag = false;
          break;
        }
      }
      if (flag) {//如果纯空格
        const {data: res} = await this.$axios.get('/apis/game/getAllGame2')
        this.gameList = res.data;
        return
      }
      // console.log(input)
      if (input === '' || input === null || input === undefined) {
        const {data: res} = await this.$axios.get('/apis/game/getAllGame2')
        this.gameList = res.data;
        return
      } else {
        const {data: res} = await this.$axios.get('/apis/game/selectGameByInput/' + input);
        this.gameList = res.data;
        return
      }

    },
    async byRatingDescending() {
      const {data: res} = await this.$axios.get('/apis/game/getGameListByRatingDescending')
      this.gameList = res.data;
    },
    async byRatingAscending() {
      const {data: res} = await this.$axios.get('/apis/game/getGameListByRatingAscending')
      this.gameList = res.data;
    },
    async byPriceDescending() {
      const {data: res} = await this.$axios.get('/apis/game/getGameListByPriceDescending')
      this.gameList = res.data;
    },
    async byPriceAscending() {
      const {data: res} = await this.$axios.get('/apis/game/getGameListByPriceAscending')
      this.gameList = res.data;
    }


  }
}
</script>

<style scoped>

</style>
