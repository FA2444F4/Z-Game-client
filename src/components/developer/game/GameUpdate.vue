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
    name: "GameUpdate"
  }
</script>

<style scoped>

</style>
