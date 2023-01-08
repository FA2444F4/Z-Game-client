<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container style="height: 100%">
      <!--顶部栏-->
      <el-header>
        <el-row>
          <el-col :span="6">
            <h2>开发注册</h2>
          </el-col>
        </el-row>
      </el-header>
      <!--中间-->
      <el-main>
        <!--注册表单-->
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form :model="form" ref="developerRegisterForm">
              <el-form-item label="用户名">
                <el-input v-model="form.username" placeholder="每个用户用户名不允许重复"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="form.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="开发商名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="form.description"></el-input>
              </el-form-item>
              <el-button type="primary" @click="developerRegister">注册</el-button>
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
    name: "developerRegister",
    data(){
      return {
        form: {
          username: '',
          password: '',
          name: '',
          phone: '',
          description: ''
        }
      }
    },
    methods: {
      async developerRegister() {
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
          this.$message.error("请填写开发商名")
        }
        if(this.form.phone===''){
          flag=false;
          this.$message.error("请填写手机号")
        }
        if(this.form.description===''){
          flag=false;
          this.$message.error("请填写厂商描述")
        }
        if(flag){//表单效验成功
          //提交表单
          const {data: res} = await this.$axios.post('/apis/login/developerRegister', {
            user: {
              username: this.form.username,
              password: this.form.password,
              type: 2

            },
            developer: {
              deposit: 0,
              name: this.form.name,
              phone: this.form.phone,
              description: this.form.description
            }
          });
          //看后端code
          if(res.code===0){//如果用户名已被注册
            this.form.username=''
            this.$message.error(res.msg)
          }else {//如果注册成功
            this.$message.success("注册成功")
            this.$router.push('/developerHome')
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
