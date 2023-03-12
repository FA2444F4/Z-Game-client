<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container style="height: 100%">
      <!--顶部栏-->
      <el-header>
        <el-row>
          <el-col :span="6">
            <h2>玩家注册</h2>
          </el-col>
        </el-row>
      </el-header>
      <!--中间-->
      <el-main>
        <!--注册表单-->
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form :model="form" ref="playerRegisterForm">
              <el-form-item label="用户名" required>
                <el-input v-model="form.username" placeholder="每个用户用户名不允许重复"></el-input>
              </el-form-item>
              <el-form-item label="密码" required>
                <el-input type="password" v-model="form.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" required>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="昵称" required>
                <el-input v-model="form.nick_name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <template>
                  <el-select v-model="value" placeholder="请选择性别">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="手机号" required>
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <div class="block" disabled="disabled">
                <span class="demonstration">账户创建日期</span>
                <el-date-picker
                  v-model="form.create_time"
                  type="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <el-button type="primary" @click="playerRegister">注册</el-button>
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
    name: "playerRegister",
    data() {
      return {
        form: {
          username: '',
          password: '',
          nick_name: '',
          create_time:0,
          name: '',
          sex: 1,
          phone: ''
        },
        options: [
          {
            value: 1,
            label: '男'
          }, {
            value: 0,
            label: '女'
          }
        ],
        value: 1
      }
    },
    methods: {
      async playerRegister() {
        let flag=true
        //效验表单
        if(this.form.username===''){
          flag=false;
          this.$message.error("请填写用户名")
        }
        if(this.form.password===''){
          flag=false;
          this.$message.error("请填写密码")
        }
        if(this.form.name===''){
          flag=false;
          this.$message.error("请填写真实姓名")
        }
        if(this.form.nick_name===''){
          flag=false;
          this.$message.error("请填写昵称")
        }
        if(this.form.phone===''){
          flag=false;
          this.$message.error("请填写手机号")
        }
        if(flag){//表单效验成功
          //提交表单
          const {data: res} = await this.$axios.post('/apis/login/playerRegister', {
            user: {
              username: this.form.username,
              password: this.form.password,
              create_time: this.form.create_time/1000,
              type: 1

            },
            player: {
              status: 0,
              deposit: 0,
              nick_name: this.form.nick_name,
              name: this.form.name,
              sex: this.value,
              phone: this.form.phone
            }
          });
          //看后端code
          if(res.code===0){//如果注册失败
            this.form.username=''
            this.$message.error(res.msg)
          }else {//如果注册成功
            this.$message.success("注册成功")
            this.$router.push('/playerHome')
          }


        }
      }
    },
    created() {
      this.form.create_time=(new Date()).valueOf();
      // console.log(this.form.create_time)
    }
  }
</script>

<style scoped>

</style>
