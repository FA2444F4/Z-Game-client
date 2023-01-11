<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container style="height: 100%">
      <!--顶部栏-->
      <el-header>
        <el-row>
          <el-col :span="6">
            <h2>管理员信息页</h2>
          </el-col>
        </el-row>
      </el-header>
      <!--中间-->
      <el-main>
        <!--注册表单-->
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form :model="administratorInfo" ref="administratorInfoForm">
              <el-form-item label="用户名" required prop="username">
                <el-input v-model="administratorInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" required prop="password">
                <el-input type="password" v-model="administratorInfo.password" show-password></el-input>
              </el-form-item>
              <div class="block" disabled="disabled">
                <span class="demonstration">账户创建日期</span>
                <el-date-picker
                  v-model="administratorInfo.create_time"
                  type="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </div>

              <el-form-item label="昵称" required>
                <el-input v-model="administratorInfo.nick_name"></el-input>
              </el-form-item>
              <el-button type="primary" @click="updateAdministratorInfo">更新</el-button>
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
    name: "AdministratorInfo",
    data() {
      return {
        administratorInfo: {
          id: '',
          username: '',
          password: '',
          type: 0,
          create_time: 0,

          nick_name: '管理员昵称(预设测试)'
        },
      }
    },
    methods: {
      //更新请求
      async updateAdministratorInfo() {
        //检验是否非空
        if (this.administratorInfo.username === '' || this.administratorInfo.username === null) {
          this.$message.error("请填写用户名")
          return null;
        }
        if (this.administratorInfo.password === '' || this.administratorInfo.password === null) {
          this.$message.error("请填写密码")
          return null;
        }
        if (this.administratorInfo.nick_name === '' || this.administratorInfo.nick_name === null) {
          this.$message.error("请填写昵称")
          return null;
        }
        //检验用户名是否重复
        const {data: res} = await this.$axios.get('apis/administrator/checkDuplicateUsername/' + this.administratorInfo.username)
        if (res.data !== this.administratorInfo.id) {
          this.$message.error("您的新用户名已被抢注,请换一个")
          this.administratorInfo.username = ''
          return null;
        }
        //通过检验了,提交更新
        //记得时间要改
        const {data: res2} = await this.$axios.put('apis/administrator/updateAdministratorInfo', {
          user: {
            id: this.administratorInfo.id,
            username: this.administratorInfo.username,
            password: this.administratorInfo.password,
            type: this.administratorInfo.type,
            create_time: this.administratorInfo.create_time / 1000,

          },
          administrator: {
            id: this.administratorInfo.id,
            nick_name: this.administratorInfo.nick_name
          }
        });
        this.$message.success("修改成功")
        this.administratorHomeLoad()


      },
      //加载信息
      async administratorHomeLoad() {
        const {data: res} = await this.$axios.get('/apis/administrator/homeLoad')
        if (res.code === 0) {//失败
          this.$message.error(res.msg)//错误访问
          this.$router.push('/')
        } else {//成功
          //更新数据
          // console.log(res)
          this.administratorInfo.id = res.data.user.id;
          this.administratorInfo.username = res.data.user.username;
          // this.administratorInfo.password = res.data.user.password   ;
          this.administratorInfo.type = res.data.user.type;
          this.administratorInfo.create_time = res.data.user.create_time * 1000;

          this.administratorInfo.nick_name = res.data.administrator.nick_name;
        }


      }
    },
    created() {
      this.administratorHomeLoad();
    }
  }
</script>

<style scoped>

</style>
