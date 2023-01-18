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
            <el-form :model="developerInfo">
              <el-form-item label="id">
                <el-input v-model="developerInfo.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户名" required prop="username">
                <el-input v-model="developerInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" required prop="password">
                <el-input type="password" v-model="developerInfo.password" show-password></el-input>
              </el-form-item>
              <div class="block" disabled="disabled">
                <span class="demonstration">账户创建日期</span>
                <el-date-picker
                  v-model="developerInfo.create_time"
                  type="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <el-form-item label="余额">
                <el-input v-model="developerInfo.deposit" disabled></el-input>
              </el-form-item>
              <el-form-item label="开发商名" required>
                <el-input v-model="developerInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" required>
                <el-input v-model="developerInfo.phone"></el-input>
              </el-form-item>

              <el-form-item label="描述" required>
                <el-input v-model="developerInfo.description" type="textarea"></el-input>
              </el-form-item>

              <el-button type="primary" @click="updateDeveloperInfo">更新</el-button>
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
    name: "DeveloperInfo",
    data() {
      return {
        developerInfo: {
          //user
          id: '',
          username: '',
          password: '',
          type: 2,
          create_time: 0,
          //developer
          deposit: 0,
          name: '',
          phone: '',
          description: '',
        },
      }
    },
    methods: {
      //加载信息
      async developerHomeLoad() {
        const {data: res} = await this.$axios.get('/apis/developer/homeLoad')
        if (res.code === 0) {
          this.$message.error(res.msg)//错误访问
          this.$router.push('/')
        } else {//成功
          //更新数据
          //user
          this.developerInfo.id = res.data.user.id;
          this.developerInfo.username = res.data.user.username;
          // this.developerInfo.password = res.data.user.password   ;
          this.developerInfo.type = res.data.user.type;
          this.developerInfo.create_time = res.data.user.create_time * 1000;
          //developer
          this.developerInfo.deposit = res.data.developer.deposit;
          this.developerInfo.name = res.data.developer.name;
          this.developerInfo.phone = res.data.developer.phone;
          this.developerInfo.description = res.data.developer.description;


        }
      },
      //更新信息
      async updateDeveloperInfo() {
        //检验是否非空
        if (this.developerInfo.username === '' || this.developerInfo.username === null) {
          this.$message.error("请填写用户名")
          return null;
        }
        if (this.developerInfo.password === '' || this.developerInfo.password === null) {
          this.$message.error("请填写密码")
          return null;
        }
        if (this.developerInfo.name === '' || this.developerInfo.name === null) {
          this.$message.error("请填写开发商名")
          return null;
        }
        if (this.developerInfo.phone === '' || this.developerInfo.phone === null) {
          this.$message.error("请填写手机号")
          return null;
        }
        if (this.developerInfo.description === '' || this.developerInfo.description === null) {
          this.$message.error("请填写厂商自述")
          return null;
        }
        //检查用户名是否重复
        const {data: res} = await this.$axios.get('apis/developer/checkDuplicateUsername/' + this.developerInfo.username)
        if (res.data !== this.developerInfo.id) {
          this.$message.error("您的新用户名已被抢注,请换一个")
          this.developerInfo.username = ''
          return null;
        }
        //通过检验了,提交更新
        //记得时间要改
        const {data: res2} = await this.$axios.put('apis/developer/updateDeveloperInfo', {
          user: {
            id: this.developerInfo.id,
            username: this.developerInfo.username,
            password: this.developerInfo.password,
            type: this.developerInfo.type,
            create_time: this.developerInfo.create_time / 1000,

          },
          developer: {
            id: this.developerInfo.id,
            deposit: this.developerInfo.deposit,
            name: this.developerInfo.name,
            phone: this.developerInfo.phone,
            description: this.developerInfo.description
          }
        });
      },
    },
    created() {
      this.developerHomeLoad()
    }
  }
</script>

<style scoped>

</style>
