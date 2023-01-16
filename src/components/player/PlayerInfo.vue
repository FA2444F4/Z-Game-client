<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container style="height: 100%">
      <!--顶部栏-->
      <el-header>
        <el-row>
          <el-col :span="6">
            <h2>玩家信息页</h2>
          </el-col>
        </el-row>
      </el-header>
      <!--中间-->
      <el-main>
        <!--注册表单-->
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form :model="playerInfo">
              <el-form-item label="id">
                <el-input v-model="playerInfo.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户名" required prop="username">
                <el-input v-model="playerInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" required prop="password">
                <el-input type="password" v-model="playerInfo.password" show-password></el-input>
              </el-form-item>
              <div class="block" disabled="disabled">
                <span class="demonstration">账户创建日期</span>
                <el-date-picker
                  v-model="playerInfo.create_time"
                  type="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <el-form-item label="状态">
                <el-radio-group v-model="playerInfo.status" disabled>
                  <el-radio-button :label="0">正常</el-radio-button>
                  <el-radio-button :label="1">禁言</el-radio-button>
                  <el-radio-button :label="2">封禁</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="余额">
                <el-input v-model="playerInfo.deposit" disabled></el-input>
              </el-form-item>
              <el-form-item label="昵称" required>
                <el-input v-model="playerInfo.nick_name"></el-input>
              </el-form-item>
              <el-form-item label="姓名" required>
                <el-input v-model="playerInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="playerInfo.sex">
                  <el-radio-button :label="1" >男</el-radio-button>
                  <el-radio-button :label="0" >女</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="手机号" required>
                <el-input v-model="playerInfo.phone"></el-input>
              </el-form-item>
              <el-button type="primary" @click="updatePlayerInfo">更新</el-button>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <!--底部栏-->
      <!--<el-footer>
      </el-footer>-->
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "PlayerInfo",
    data() {
      return {
        playerInfo: {
          id: '',
          username: '',//>>>
          password: '',//>>>
          type: 1,
          create_time: 0,

          status: 0,
          deposit: 0,
          nick_name: '',//>>>
          name: '',//>>>
          sex: 1,//>>>
          phone: 0,//>>>
        },
        sex: 0
      }
    },
    methods: {
      //更新请求
      async updatePlayerInfo() {


        //检验是否非空
        if (this.playerInfo.username === '' || this.playerInfo.username === null) {
          this.$message.error("请填写用户名")
          return null;
        }
        if (this.playerInfo.password === '' || this.playerInfo.password === null) {
          this.$message.error("请填写密码")
          return null;
        }
        if (this.playerInfo.nick_name === '' || this.playerInfo.nick_name === null) {
          this.$message.error("请填写昵称")
          return null;
        }
        if (this.playerInfo.name === '' || this.playerInfo.name === null) {
          this.$message.error("请填写姓名")
          return null;
        }
        if (this.playerInfo.phone === '' || this.playerInfo.phone === null) {
          this.$message.error("请填写手机号")
          return null;
        }
        //检查用户名是否重复
        const {data: res} = await this.$axios.get('apis/player/checkDuplicateUsername/' + this.playerInfo.username)
        if (res.data !== this.playerInfo.id) {
          this.$message.error("您的新用户名已被抢注,请换一个")
          this.playerInfo.username = ''
          return null;
        }
        //通过检验了,提交更新
        //记得时间要改
        const {data: res2} = await this.$axios.put('apis/player/updatePlayerInfo', {
          user: {
            id: this.playerInfo.id,
            username: this.playerInfo.username,
            password: this.playerInfo.password,
            type: this.playerInfo.type,
            create_time: this.playerInfo.create_time / 1000,

          },
          player: {
            id: this.playerInfo.id,
            status: this.playerInfo.status,
            deposit: this.playerInfo.deposit,
            nick_name: this.playerInfo.nick_name,
            name: this.playerInfo.name,
            // sex: parseFloat(this.playerInfo.sex),
            sex: this.playerInfo.sex,
            phone: this.playerInfo.phone,
          }
        });
        this.$message.success("修改成功")
        this.playerHomeLoad()


      },
      //加载信息
      async playerHomeLoad() {
        const {data: res} = await this.$axios.get('/apis/player/homeLoad')
        if (res.code === 0) {//失败
          this.$message.error(res.msg)//错误访问
          this.$router.push('/')
        } else {//成功
          //更新数据


          this.playerInfo.id = res.data.user.id;
          this.playerInfo.username = res.data.user.username;
          // this.playerInfo.password = res.data.user.password   ;
          this.playerInfo.type = res.data.user.type;
          this.playerInfo.create_time = res.data.user.create_time * 1000;

          this.playerInfo.status = res.data.player.status;
          this.playerInfo.deposit = res.data.player.deposit;
          this.playerInfo.nick_name = res.data.player.nick_name;
          this.playerInfo.name = res.data.player.name;
          this.playerInfo.sex = res.data.player.sex;
          // this.sex=res.data.player.sex;
          this.playerInfo.phone = res.data.player.phone;

        }


      },
      //性别改为男
      changeSex1(){
        this.playerInfo.sex=1;
        this.sex=1
      },
      //性别改为女
      changeSex0(){
        this.playerInfo.sex=0;
        this.sex=0;
        // console.log('性别改为女'+this.playerInfo)
      }
    },
    created() {
      this.playerHomeLoad()
    }
  }
</script>

<style scoped>

</style>
