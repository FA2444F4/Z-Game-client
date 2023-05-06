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
            <!--<el-rate v-model="waitingRatingGameList[0].rating"></el-rate>-->
            <el-rate
              v-model="waitingRatingGameList[0].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[1].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[1].game.name }}</span>
            <!--<el-rate v-model="waitingRatingGameList[1].rating"></el-rate>-->
            <el-rate
              v-model="waitingRatingGameList[1].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[2].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[2].game.name }}</span>
            <el-rate
              v-model="waitingRatingGameList[2].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[3].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[3].game.name }}</span>
            <el-rate
              v-model="waitingRatingGameList[3].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[4].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[4].game.name }}</span>
            <el-rate
              v-model="waitingRatingGameList[4].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
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
            <el-rate
              v-model="waitingRatingGameList[5].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[6].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[6].game.name }}</span>
            <el-rate
              v-model="waitingRatingGameList[6].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[7].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[7].game.name }}</span>
            <el-rate
              v-model="waitingRatingGameList[7].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[8].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[8].game.name }}</span>
            <el-rate
              v-model="waitingRatingGameList[8].rating"
               show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
        <el-col :span="4">
          <el-image
            style="height: 200px;width: 200px"
            :fit="fit"
            :src="waitingRatingGameList[9].game.header_image"></el-image>
          <div class="block">
            <span class="demonstration">{{ waitingRatingGameList[9].game.name }}</span>
            <el-rate
              v-model="waitingRatingGameList[9].rating"
                show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refreshWaitingRatingList()">换一批</el-button>
        <el-button @click="submitRating()">提交评论</el-button>
     </span>
    </el-dialog>
    <div v-if="!getDialogVisible()">
      <!--游戏推荐-->
     <!-- <div class="block">
        <span class="demonstration">游戏推荐</span>
        <el-carousel height="150px">

          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>

        </el-carousel>
      </div>-->
      <template>
        <el-carousel :interval="4000" type="card" height="600px">
          <el-carousel-item v-for="item in recommentdGameList">
            <!--<el-card class="box-card">-->
              <el-image
                align="center"
                style="height: 300px;width: 300px"
                :fit="fit"
                :src="item.game.header_image"></el-image>
              <div class="block">
                <h2 class="demonstration" style="color: #dc4d14">{{ item.game.name }}</h2>
                <div v-if="item.rating!==-1">
                  <!--<el-rate v-model="item.rating"></el-rate>-->
                  <el-rate
                    v-model="item.rating"
                    disabled show-score text-color="#ff9900" score-template="{value}">
                  </el-rate>
                </div>
                <div v-if="item.rating===-1">
                  <p>暂无评分</p>
                </div>
                <p>{{item.game.description}}</p>
                <el-button @click.prevent="goGameInfo(item.game.id)">查看详情</el-button>
              </div>
            <!--</el-card>-->

          </el-carousel-item>
          <!--<el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>-->
        </el-carousel>
      </template>
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
      recommentdGameList:[
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

    //
    // this.getTestRecommendGame();
    // this.getRecommendGameList();
    this.getRecommendGameListPlus();
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
      for (let i = 0; i < this.waitingRatingGameList.length; i++) {
        this.waitingRatingGameList[i].rating=0;
      }
      console.log("this.waitingRatingGameList")
      console.log(this.waitingRatingGameList)
    },
    closeDialog() {//关闭对话框
      this.$router.push("/PlayerGameList")
    },
    async refreshWaitingRatingList(){//刷新待评论列表
      //先提交评论
      let ratingList=[];
      for (let i = 0; i < this.waitingRatingGameList.length; i++) {
        if(this.waitingRatingGameList[i].rating>=1&&this.waitingRatingGameList[i].rating<=5){

          ratingList.push({"id":this.waitingRatingGameList[i].game.id,"rating":this.waitingRatingGameList[i].rating});
        }
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
        if(this.waitingRatingGameList[i].rating>=1&&this.waitingRatingGameList[i].rating<=5){
          ratingList.push({"id":this.waitingRatingGameList[i].game.id,"rating":this.waitingRatingGameList[i].rating});
          }
      }
      console.log(ratingList)
      //让后端带着数组去改
      const {data :res}=await this.$axios.put('apis/player/playerSubmitRating',ratingList);
      this.$router.push('/PlayerGameList');
    },
    //获得测试的游戏
    async getTestRecommendGame(){
      const {data :res}=await this.$axios.get('apis/player/getTestRecommendGame');
      this.recommentdGameList=res.data;
      // console.log("test")
      // console.log(res.data)
    },
    //测试
    async getRecommendGameList(){
      const {data :res}=await this.$axios.get('apis/player/getRecommendGameList');
      // console.log(res.data)
      this.recommentdGameList=res.data;
    },
    async getRecommendGameListPlus(){
      const {data :res}=await this.$axios.get('apis/player/getRecommendGameListPlus');
      this.recommentdGameList=res.data;
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

  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
