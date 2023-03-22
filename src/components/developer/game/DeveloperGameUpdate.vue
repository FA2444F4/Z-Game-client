<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container>
      <!--顶部栏-->
      <!--中间-->
      <el-main>
        <el-row>
          <el-col :span="12" :offset="6">
<!--            标签-->
            <el-tag
              v-for="tag in tags">
              {{tag}}
            </el-tag>

            <el-form :model="game">
              <el-form-item label="游戏名">
                <el-input v-model="game.name" ></el-input>
              </el-form-item>
              <el-form-item label="价格">
                <el-input v-model="game.price"></el-input>
              </el-form-item>
              <div class="block" disabled="disabled">
                <span class="demonstration">游戏发布日期</span>
                <el-date-picker
                  v-model="game.create_time"
                  type="timestamp"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <el-form-item label="描述" required>
                <el-input v-model="game.description"
                          type="textarea"
                          :autosize="{ minRows: 3, maxRows: 10}"
                ></el-input>
              </el-form-item>
              <!--标题图-->
              <el-form-item label="游戏海报">
                <el-image
                  style="width: 200px; height: 200px"
                  :src="game.header_image"
                  :fit="fit"></el-image>
              </el-form-item>
              <!--截图1-->
              <el-form-item label="游戏截图1">
                <el-image
                  style="width: 200px; height: 200px"
                  :src="game.screenshot1"
                  :fit="fit"></el-image>
              </el-form-item>
              <!--截图2-->
              <el-form-item label="游戏截图2">
                <el-image
                  style="width: 200px; height: 200px"
                  :src="game.screenshot2"
                  :fit="fit"></el-image>
              </el-form-item>
              <!--截图3-->
              <el-form-item label="游戏截图3">
                <el-image
                  style="width: 200px; height: 200px"
                  :src="game.screenshot3"
                  :fit="fit"></el-image>
              </el-form-item>
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
    name: "DeveloperGameUpdate",
    data(){
      return{
        game:{
          id: 0,
          name: '',
          developer_id: 0,
          price: 0,
          create_time: 0,
          description: '',
          header_image: '',
          screenshot1: '',
          screenshot2: '',
          screenshot3: '',
          is_exist: 1,
        },
        tags:['单机','休闲'],
        fit:"contain",

      }
    },
    methods:{
      async gameInfoLoad(){
        //根据游戏id查游戏信息和游戏标签
        const {data: res} = await this.$axios.get('/apis/game/gameInfoLoad/'+this.game.id)
        // console.log(res.data)
        this.game=res.data.game;
        this.tags=res.data.tags;
        this.game.create_time*=1000;
      },
    },
    created() {
      //获取游戏id
      this.game.id=this.$route.params.id;
      //获取游戏信息
      this.gameInfoLoad();

    }
  }
</script>

<style scoped>

</style>
