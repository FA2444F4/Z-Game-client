<template>
  <div>
    <el-main>
      <el-table :data="ratingList"
                height="650">

        <el-table-column
          label="游戏id" prop="game_id">
        </el-table-column>


        <el-table-column
          label="游戏名" prop="game_name">
        </el-table-column>

        <el-table-column
          label="评分" prop="rating">
        </el-table-column>

        <el-table-column
          label="评语" prop="comment">
        </el-table-column>





      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "PlayerRatingList",
  data(){
    return{
      ratingList:[
        {
          //评分列表:游戏id,游戏名,评分,评语,评分时间
          game_id:1,
          game_name:'游戏名',
          rating:3,
          comment:'评语',
          create_time:0,
          is_exist:1,
        }
      ]
    }
  },
  created() {
    this.loadPlayerRatingList();
  },
  methods:{
    async loadPlayerRatingList(){
      const {data: res} = await this.$axios.get('/apis/player/getPlayerRatingList');
      //加载数据
      // console.log(res.data);
      this.ratingList=res.data;
    }
  }
}
</script>

<style scoped>

</style>
