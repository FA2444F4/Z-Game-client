<template>
  <!--测试上传图片-->
  <div>



    <el-row>
      <el-col :span="24">
        <!--游戏详情-->
        <el-form>
          <el-form-item>
            <el-image
              :fit="fit"
              :src="this.game.header_image"
              style="width: 500px; height: 300px"></el-image>
          </el-form-item>
          <el-form-item label="游戏名">
            <span>{{ this.game.name }}</span>
          </el-form-item>
          <el-form-item label="价格">
            <span>{{ this.game.price }}</span>
          </el-form-item>
          <el-form-item label="评分">
        <span v-if="(rating===-1)">
          <span>暂无评分</span>
        </span>
            <span v-else>
          <span>{{ this.rating }}</span>
        </span>
          </el-form-item>
          <el-form-item label="游戏介绍">
            <el-input type="textarea" v-model="game.description"
                      :autosize="{ minRows: 3, maxRows: 10}"></el-input>
          </el-form-item>
          <el-form-item label="游戏发布日期" width="70%">
            <el-date-picker
              style="width:500px"
              v-model="game.create_time"
              type="timestamp">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-image
              :fit="fit"
              :src="this.game.screenshot1"
              style="width: 200px; height: 200px"></el-image>
          </el-form-item>
          <el-form-item label="">
            <el-image
              :fit="fit"
              :src="this.game.screenshot2"
              style="width: 200px; height: 200px"></el-image>
          </el-form-item>
          <el-form-item label="">
            <el-image
              :fit="fit"
              :src="this.game.screenshot3"
              style="width: 200px; height: 200px"></el-image>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>



  </div>
</template>

<script>
export default {
  name: "PlayerGameInfo",
  data() {
    return {
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
  },
  methods: {
    async playerGameInfoLoad(id) {
      const {data: res} = await this.$axios.get('/apis/game/getGameInfo/' + id)
      //加载游戏
      this.game = res.data.game;
      this.rating = res.data.rating;
      // console.log(this.game)
      // console.log(this.rating)
      this.game.create_time *= 1000;
    },




  },

  created() {
    // console.log(this.$route.params.id)
    this.playerGameInfoLoad(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
