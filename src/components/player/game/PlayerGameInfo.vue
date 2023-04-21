<template>
  <!--测试上传图片-->
  <div>


    <el-row>
      <el-col :span="24">
        <!--游戏详情-->
        <el-form>
          <el-card class="box-card">
            <el-form-item>
              <el-image
                :fit="fit"
                :src="this.game.header_image"
                style="width: 500px; height: 300px"></el-image>


            </el-form-item>
            <el-tag
              v-for="tag in tags">
              {{tag}}
            </el-tag>
            <el-form-item label="游戏名">
              <span>{{ this.game.name }}</span>
            </el-form-item>

          </el-card>

          <el-card class="box-card">

            <el-row>
              <el-col :span="2">
                <el-form-item label="价格">
                  <span>{{ this.game.price }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="4">
            <span v-if="(this.buy_button===0)">
              <!--如果未拥有该游戏-->
              <el-button type="primary"  @click="this.goBuyGame" >购买</el-button>
            </span>
                <span v-else>
              <!--如果拥有该游戏-->
              <span>!!!您已拥有该游戏!!!</span>
            </span>


              </el-col>
            </el-row>

            <el-form-item label="全网综合评分">
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
          </el-card>



          <!--显评分买按钮-->
          <div v-if="(this.rating_button===0)">
            <!--还没评分-->
            <el-card class="box-card">
            <!--<el-button type="primary"  @click="this.goRateGame"  plain>去评分</el-button>-->
              <el-button type="primary" @click="rateDialogViable = true">去评分</el-button>

              <el-dialog
                title="对该游戏评分"
                :visible.sync="rateDialogViable"
                width="30%"
                :before-close="handleClose">
                <el-form>
                  <!--name-->
                  <el-form-item label="评分" required>
                    <el-rate v-model="this.rateInput.rating"></el-rate>
                  </el-form-item>
                  <!--description-->
                  <el-form-item label="标签描述">
                    <el-input v-model="this.rateInput.comment" type="textarea"></el-input>
                  </el-form-item>
                </el-form>


                <span slot="footer" class="dialog-footer">
    <el-button @click="rateDialogViable = false">取 消</el-button>
    <el-button type="primary" @click="submitRating()">确 定</el-button>
  </span>
              </el-dialog>
            </el-card>
          </div>
          <div v-else>
            <!--已经 评分-->
            <el-card class="box-card">
              <div v-if="(this.myRating.accept===1)">
                <div class="block">
                  <span class="demonstration">您对该游戏的评分:</span>
                  <el-rate v-model="this.myRating.rating"></el-rate>
                </div>
                <div>
                  <p>您的评语:</p>
                </div>
                <input type="textarea" :value="this.myRating.comment">
                <!--<p>!!!您已经评分过该游戏了!!!</p>-->
              </div>
            </el-card>

          </div>
          <el-card class="box-card">
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
          </el-card>


          <el-card class="box-card">
            <h2>其他玩家的评论</h2>
            <el-table :data="ratingList"
                      height="650">

              <el-table-column
                label="玩家名" prop="player_name">
              </el-table-column>
              <el-table-column
                label="评分" prop="rating">
              </el-table-column>
              <el-table-column
                label="评论" prop="comment">
              </el-table-column>

            </el-table>
          </el-card>

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
        is_have: 1,
      },
      rating: 0,
      fit: 'contain',
      //是否给出购买接口
      buy_button: 0,
      //是否给出评分接口
      rating_button: 0,
      myRating: {//暂时废弃
        accept: 0,
        rating: 0,
        comment: '',
      },
      ratingList: [
        {
          player_name: '玩家名',
          rating: 0,
          comment: '评论',
          is_exist: 1,
        }
      ],
      rateDialogViable:false,
      rateInput:{
        rating:3,
        comment:'',
      },
      tags:['单机','休闲'],


    }
  },
  created() {
    // console.log(this.$route.params.id)
    this.playerGameInfoLoad(this.$route.params.id)
    //加载用户对游戏是否拥有的信息
    this.loadPlayer_game(this.$route.params.id)

    this.buyAndRatingButtonInfo(this.$route.params.id);

    this.loadRatingInfo(this.$route.params.id);

    this.loadTags(this.$route.params.id);

  },

  methods: {
    //游戏信息加载
    async playerGameInfoLoad(id) {
      const {data: res} = await this.$axios.get('/apis/game/getGameInfo/' + id)
      //加载游戏
      this.game = res.data.game;
      this.rating = res.data.rating;
      // console.log(this.game)
      // console.log(this.rating)
      this.game.create_time *= 1000;
      //
    },
    //player_game加载
    async loadPlayer_game(game_id) {
      const {data: res} = await this.$axios.get('/apis/player/selectPlayerGameByOne/' + game_id);
      console.log("player_game加载")
      console.log(res.data)
      this.game.is_have = res.data.is_have;
      console.log(this.game.is_have)
    },

    //加载评分信息
    async loadRatingInfo(game_id) {
      const {data: res} = await this.$axios.get('/apis/player/getRatingInfo/' + game_id);
      this.myRating = res.data.myRating;
      this.ratingList = res.data.ratingList;
      console.log(this.myRating)
      console.log(this.ratingList)

    },
    //购买按钮和评分按钮显示加载
    async buyAndRatingButtonInfo(game_id) {
      const {data: res} = await this.$axios.get('/apis/player/buyAndRatingButtonInfo/' + game_id);
      // console.log(res.data);
      this.buy_button = res.data.buy_button;
      this.rating_button = res.data.rating_button;

    },
    //加载游戏标签
    async loadTags(game_id){
      const {data: res} = await this.$axios.get('/apis/player/getTags/' + game_id);
      this.tags=res.data;

    },


    //买游戏
    async goBuyGame() {//参数game_id
      const {data: res} = await this.$axios.get('/apis/player/playerBuyGame/' + this.game.id);
      if (res.code === 0) {//余额不足
        this.$message.error(res.msg);
      } else {
        this.$message.success(res.msg);
        this.$router.push('/')

      }

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    async submitRating(){//提交评论
      this.$message.success("提交评论成功")
      this.rateDialogViable = false;
      console.log(this.rateInput)

      //带着数据去添加评论
      // const {data: res} = await this.$axios.get('/apis/player/putPlayerRating/' + this.game.id+'/'+this.rateInput.rating+'/'+this.rateInput.comment);

    }


  }
}
</script>

<style scoped>

</style>
