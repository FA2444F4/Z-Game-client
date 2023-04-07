<template>
  <div>
    <!--强制评价量不够的用户去评价游戏-->
    <el-dialog
      title="您必须评价过5个游戏才能为您推荐游戏哦!"
      :visible="getDialogVisible()"
      width="90%"
      top="5vh"
      height="100%"
      :destroy-on-close="true"
      :before-close="closeDialog"
    >
      <!--里面放10个框-->
      <el-row :gutter="20">
        <el-col :span="4" :offset="2">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[0].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[0].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[0].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[1].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[1].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[1].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[2].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[2].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[2].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[3].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[3].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[3].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[4].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[4].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[4].rating"></el-rate>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[5].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[5].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[5].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[6].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[6].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[6].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[7].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[7].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[7].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[8].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[8].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[8].rating"></el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[9].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[9].game.name }}</span>
            <el-rate v-model="waitingRatingGameList[9].rating"></el-rate>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refreshWaitingRatingList()">换一批</el-button>
        <el-button @click="submitRating()">提交评论</el-button>
     </span>
    </el-dialog>
    <div v-if="!getDialogVisible()">
      已经评价够了游戏
    </div>

    <!--正式推荐游戏-->
  </div>
</template>

<script>
export default {
  name: "PlayerGameRecommend",
  data() {
    return {
      ifRatingNumberEnough: 0,//1表示评论够了,0表示不够
      waitingRatingGameList: [//待评价的游戏列表
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
      fit: "contain",
      url: 'https://upload.wikimedia.org/wikipedia/zh/7/71/PvZ_cover.jpg',
    }
  },
  created() {
    //判断玩家游戏评论数是否>=5
    this.ifPlayerRatingNumberEnough();

    //
    this.getWaitingRatingGameList()
  },
  methods: {
    //判断玩家游戏评论数是否>=5
    async ifPlayerRatingNumberEnough() {
      const {data: res} = await this.$axios.get('/apis/player/ifPlayerRatingNumberEnough')
      this.ifRatingNumberEnough = res.data;
      console.log(this.ifRatingNumberEnough);
    },
    getDialogVisible() {
      return this.ifRatingNumberEnough === 0;
    },
    async getWaitingRatingGameList() {
      const {data: res} = await this.$axios.get('/apis/game/getWaitingRatingGameList')
      // console.log(res.data);
      this.waitingRatingGameList = res.data;
    },
    closeDialog() {//关闭对话框
      this.$router.push("/PlayerGameList")
    },
    async refreshWaitingRatingList(){//刷新待评论列表
      //先提交评论
      let ratingList=[];
      for (let i = 0; i < this.waitingRatingGameList.length; i++) {
        ratingList.push({"id":this.waitingRatingGameList[i].game.id,"rating":this.waitingRatingGameList[i].rating});
      }
      console.log(ratingList)
      //让后端带着数组去改
      const {data :res}=await this.$axios.put('apis/player/playerSubmitRating',ratingList);
      //然后去往游戏全部列表
      this.$router.push("/");

    },
    async submitRating(){//提交评论
      let ratingList=[];
      for (let i = 0; i < this.waitingRatingGameList.length; i++) {
          ratingList.push({"id":this.waitingRatingGameList[i].game.id,"rating":this.waitingRatingGameList[i].rating});
      }
      console.log(ratingList)
      //让后端带着数组去改
      const {data :res}=await this.$axios.put('apis/player/playerSubmitRating',ratingList);
      this.$router.push('/PlayerGameList');
    }

  }
}
</script>

<style scoped>

</style>
