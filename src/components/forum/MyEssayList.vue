<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="15" :offset="1">
        <h2 style="color: blue">我的文章</h2>
      </el-col>

    </el-row>



    <el-row :gutter="20">
      <el-col :span="10" :offset="7">
        <!--卡片-->
        <el-card class="box-card" v-for="(essay ,index) in essayList" style="margin-bottom: 10px"
                 :offset="(2+(index > 0 ? 1 : 0))">
          <div slot="header" class="clearfix">
            <el-row :gutter="20">
              <el-col :span="10">
                <h1>{{ essay.essay_name }}</h1>
              </el-col>
              <el-col :span="5" :offset="5">
                <span v-if="(essay.publisher_type===0)"><i class="el-icon-user"></i>管理员 : </span>
                <span v-if="(essay.publisher_type===1)"><i class="el-icon-user"></i>玩家 : </span>
                <span v-if="(essay.publisher_type===2)"><i class="el-icon-user"></i>开发商 : </span>
              </el-col>
              <el-col :span="4">
                <span>{{ essay.publisher_name }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4" :offset="20">
                <span><p style="font-style:italic;font-size: 8px">{{ getTimeString(essay.create_time) }}</p></span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4" :offset="20">
                <el-button @click="goToEssayInfo(essay.id)">查看详情</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-input v-model="essay.essay_comment" type="textarea" :rows="8"></el-input>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="3" :offset="21">
                点赞数 :
                <i class="el-icon-caret-top"></i>
                <b>{{essay.likes}}</b>
              </el-col>
            </el-row>
          </div>

        </el-card>

      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "MyEssayList",
  data() {
    return {
      //所有散文信息
      essayList: [
        {
          id: 0,
          publisher_id: 0,
          publisher_name: '小小',
          create_time: 1681820015,
          essay_name: '我是标题',
          essay_comment: '我是内容',
          likes: 99,

          publisher_type: 0,
        },
        {
          id: 0,
          publisher_id: 0,
          publisher_name: '111111111111',
          create_time: 0,
          essay_name: '111111111111',
          essay_comment: '111111111111',
          likes: 0,

          publisher_type: 0,
        }
      ],
      user_type:0,
    }
  },
  created() {
    // this.loadForumHomeUserInfo();
    this.loadMyEssayList();
    this.getUserType();


  },
  methods:{
    //初始化essayList
    async loadMyEssayList(){
      const {data: res} = await this.$axios.get('/apis/essay/loadMyEssayList');
      this.essayList=res.data;
    },
    //去往essay详情页
    goToEssayInfo(essay_id) {
      // alert(essay_id)
      if (this.user_type===0){
        this.$router.push({
          path:'/essayInfo0',
          name:'EssayInfo0',
          params:{
            essay_id:essay_id,
          }
        });
      }else if(this.user_type===1){
        this.$router.push({
          path:'/essayInfo1',
          name:'EssayInfo1',
          params:{
            essay_id:essay_id,
          }
        });
      }else {
        this.$router.push({
          path:'/essayInfo2',
          name:'EssayInfo2',
          params:{
            essay_id:essay_id,
          }
        });
      }

    },
    //获取文本格式的时间
    getTimeString(timestamp) {
      // 假设timestamp是一个以秒为单位的时间戳
      var milliseconds = timestamp * 1000;
      // 创建一个Date对象
      var date = new Date(milliseconds);
      // 格式化日期和时间
      var formatted = date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
      // 输出结果
      // console.log(formatted); // "2021/4/19 16:00"
      return formatted;
    },
    //获取用户类型
    async getUserType(){

      const {data: res} = await this.$axios.get('/apis/login/getUserType');
      this.user_type=res.data;
      // alert("getUserType"+this.user_type)

    },
  }
}
</script>

<style scoped>

</style>
