<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="15" :offset="1">
        <h2 style="color: blue">论坛首页</h2>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="editEssayDialogVisible = true">发布文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-input v-model="input" placeholder="模糊查询搜索文章"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="loadEssayListTakeInput">搜索</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-row>
        <el-col :span="3" :offset="7">
          <el-button type="primary" plain @click="loadEssayListTakeNew">新发布优先</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" plain @click="loadEssayListTakeOld">旧发布优先</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" plain @click="loadEssayListTakeLikes">按点赞数排名</el-button>
        </el-col>

      </el-row>
    </el-row>
    <el-dialog
      title="撰写文章"
      :visible.sync="editEssayDialogVisible"
      width="80%"
      :before-close="handleClose">
      <el-form :model="inputEssay">
        <!--name-->
        <el-form-item label="文章标题" required>
          <el-input v-model="inputEssay.essay_name"></el-input>
        </el-form-item>
        <!--description-->
        <el-form-item label="文章内容">
          <el-input v-model="inputEssay.essay_comment" type="textarea" :rows="12"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editEssayDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addEssay()">发布</el-button>
  </span>
    </el-dialog>
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
                <b>{{ essay.likes }}</b>
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
  name: "ForumHome",
  data() {
    return {
      user_type: 0,
      editEssayDialogVisible: false,//新写文章页面flag
      inputEssay: {//输入的文章
        essay_name: '',
        essay_comment: '',
      },
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
      input: '',//用户搜索词

    }
  },
  created() {
    // this.loadForumHomeUserInfo();
    this.loadEssayList();
    this.getUserType();


  },
  methods: {
    //初始化用户信息
    /*async loadForumHomeUserInfo(){
      const {data: res} = await this.$axios.get('/apis/login/loadForumHomeUserInfo');
      this.user_type=res.data;
    },*/
    //

    //初始化essayList
    async loadEssayList() {
      const {data: res} = await this.$axios.get('/apis/essay/loadEssayList');
      this.essayList = res.data;
    },
    //按时间从新到旧
    async loadEssayListTakeNew() {
      const {data: res} = await this.$axios.get('/apis/essay/loadEssayListTakeNew');
      this.essayList = res.data;
    },
    //按时间从旧到新
    async loadEssayListTakeOld() {
      const {data: res} = await this.$axios.get('/apis/essay/loadEssayListTakeOld');
      this.essayList = res.data;
    },
    //按赞数排名
    async loadEssayListTakeLikes() {
      const {data: res} = await this.$axios.get('/apis/essay/loadEssayListTakeLikes');
      this.essayList = res.data;
    },
    //根据搜索查询
    async loadEssayListTakeInput() {
      //判断是否纯空格
      let flag = true;//true为纯空格
      for (let i = 0; i < this.input.length; i++) {
        if (this.input[i] !== ' ') {
          flag = false;
          break;
        }
      }
      if (flag) {//如果纯空格
        const {data: res} = await this.$axios.get('/apis/essay/loadEssayList')
        this.essayList = res.data;
        return
      }
      // console.log(input)
      if (this.input === '' || this.input === null || this.input === undefined) {
        const {data: res} = await this.$axios.get('/apis/essay/loadEssayList')
        this.essayList = res.data;
        return
      } else {
        const {data: res} = await this.$axios.get('/apis/essay/loadEssayListTakeInput/' + this.input);
        this.essayList = res.data;
        return
      }
    },
    //新增文章
    async addEssay() {
      this.editEssayDialogVisible = false;
      //
      const {data: res} = await this.$axios.post('/apis/essay/addEssay', {
        id: null,
        publisher_id: null,
        publisher_name: null,
        create_time: null,
        essay_name: this.inputEssay.essay_name,
        essay_comment: this.inputEssay.essay_comment,
        likes: null,
      })
      this.$message.success("发布文章成功!")
      this.$router.go(0);
      /*if(this.user_type===0){

        this.$router.push("/administratorForumHome")
      }else if(this.user_type===1){
        this.$router.push("/playerForumHome")

      }else {
        this.$router.push("/developerForumHome")

      }*/


    },

    //对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    }
    ,

    //去往essay详情页
    goToEssayInfo(essay_id) {
      // alert("goTOessayInfo")
      if (this.user_type === 0) {
        // alert("000000000")

        this.$router.push({
          name: 'EssayInfo0',
          path: '/essayInfo0',
          params: {
            essay_id: essay_id,
          }
        });
      } else if (this.user_type === 1) {
        // alert("111111111112")

        this.$router.push({
          name: 'EssayInfo1',
          path: '/essayInfo1',
          params: {
            essay_id: essay_id,
          }
        });
      } else {
        // alert("222222222222222")

        this.$router.push({
          name: 'EssayInfo2',
          path: '/essayInfo2',
          params: {
            essay_id: essay_id,
          }
        });
      }


      ///////////
    }
    ,

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
    async getUserType() {

      const {data: res} = await this.$axios.get('/apis/login/getUserType');
      this.user_type = res.data;
      // alert("getUserType"+this.user_type)
    },

  }
}
</script>

<style scoped>

</style>
