<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <!--卡片-->
        <el-card class="box-card" style="margin-bottom: 30px">
          <div slot="header" class="clearfix">
            <el-row :gutter="20">
              <el-col :span="10">
                <h1>{{ essay.essay_name }}</h1>
              </el-col>
              <el-col :span="3" :offset="7">
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
          </div>
          <div>
            <el-input v-model="essay.essay_comment" type="textarea" :rows="16"></el-input>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="2" :offset="18">
                <el-button type="primary" @click="addLikes()">点赞</el-button>
              </el-col>
              <el-col :span="3">
                点赞数 :
                <i class="el-icon-caret-top"></i>
                <b>{{ essay.likes }}</b>
              </el-col>
            </el-row>
          </div>

        </el-card>

      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="12" :offset="6">
        <el-button type="primary" @click="editMessageDialogVisible = true" style="width: 100%">发表评论</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="编辑评论"
      :visible.sync="editMessageDialogVisible"
      width="80%"
      :before-close="handleClose">
      <el-form>

        <!--description-->
        <el-form-item label="评论">
          <el-input v-model="inputMessage" type="textarea" :rows="12"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editMessageDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addMessage()">发布</el-button>
  </span>
    </el-dialog>

    <el-row :gutter="20">
      <el-col :span="12" :offset="6">

        <el-card class="box-card" v-if="(this.message===null||this.message.length===0)" style="margin-bottom: 10px"
                 shadow="hover">
          <b>该文章暂无评论</b>
        </el-card>
        <el-card class="box-card" v-for="(item,index) in message" style="margin-bottom: 10px" shadow="hover">
          <div slot="header" class="clearfix">
            <el-row :gutter="20">
              <el-col :span="2">
                {{index+1}}楼 :
              </el-col>
              <el-col :span="3" :offset="13">
                <span v-if="(item.messenger_type===0)"><i class="el-icon-user"></i>管理员 : </span>
                <span v-if="(item.messenger_type===1)"><i class="el-icon-user"></i>玩家 : </span>
                <span v-if="(item.messenger_type===2)"><i class="el-icon-user"></i>开发商 : </span>
              </el-col>
              <el-col :span="5">
                <span>{{ item.messenger_name }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="4" :offset="20">
                <span><p style="font-style:italic;font-size: 8px">{{ getTimeString(item.create_time) }}</p></span>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-input v-model="item.message" type="textarea" :rows="5"></el-input>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EssayInfo",
  data() {
    return {
      essay: {//文章
        id: 0,
        publisher_id: 0,
        publisher_name: '小小',
        create_time: 1681820015,
        essay_name: '我是标题',
        essay_comment: '我是内容',
        likes: 99,

        publisher_type: 0,
      },
      message: [//评论
        {
          id: 0,
          messenger_id: 0,
          messenger_name: '',
          create_time: 0,
          essay_id: 0,
          message: '',

          messenger_type: 0,
        }

      ],
      likesFlag: 0,//点赞过1,没点过0
      editMessageDialogVisible: false,
      inputMessage:'',//评论
      user_type:0,
    }
  },
  created() {
    this.essay.id = this.$route.params.essay_id;
    // alert("!!!!!!!!!!!"+this.essay.id)
    this.loadEssayInfo();
    this.getUserType()
  },
  /*activated(){
    this.essay.id = this.$route.params.essay_id;
    // alert("!!!!!!!!!!!"+this.essay.id)
    this.loadEssayInfo();
    this.getUserType()
  },*/
  methods: {
    async loadEssayInfo() {
      const essay_id = this.essay.id;
      // alert(essay_id)
      //找后端要essay和相关message
      const {data: res} = await this.$axios.get('/apis/essay/loadEssayInfo/' + essay_id);
      this.essay = res.data.essay;
      this.message = res.data.message;

      // console.log(this.essay );
      // console.log(this.message );

    },
    async addLikes() {
      if (this.likesFlag === 0) {//没点过赞
        const {data: res} = await this.$axios.put('/apis/essay/addLikes/' + this.essay.id);
        this.essay.likes += 1;
        this.likesFlag = 1;
        this.$message.success("点赞成功")
      }else {
        this.$message.warning("您已经点过赞了")

      }
    },
    async addMessage(){
      const {data: res} = await this.$axios.post('/apis/essay/addMessage/'+this.essay.id+'/'+this.inputMessage);
      this.$message.success("发布评论成功");
      this.editMessageDialogVisible=false;




      if (this.user_type === 0) {
        this.$router.push({
          name:'Bus',
          path:'/bus',
          params:{
            name: 'EssayInfo0',
            path: '/essayInfo0',
            params: {
              essay_id: this.essay.id,
            }
          }
        });
      } else if (this.user_type === 1) {
        this.$router.push({
          name:'Bus',
          path:'/bus',
          params:{
            name: 'EssayInfo1',
            path: '/essayInfo1',
            params: {
              essay_id: this.essay.id,
            }
          }
        });
      } else {
        this.$router.push({
          name:'Bus',
          path:'/bus',
          params:{
            name: 'EssayInfo2',
            path: '/essayInfo2',
            params: {
              essay_id: this.essay.id,
            }
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
    //获取用户类型
    async getUserType() {

      const {data: res} = await this.$axios.get('/apis/login/getUserType');
      this.user_type = res.data;
      // alert("getUserType"+this.user_type)
    },
  },

  // watch:{
  //   $route(to,from){
  //     // this.init()
  //     //等其他初始化方法
  //     this.$router.go(0)
  //   }
  // }
}

</script>

<style scoped>

</style>
