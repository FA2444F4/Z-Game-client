<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container>
      <!--顶部栏-->
      <!--中间-->
      <el-main>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form :model="game">
              <el-form-item label="游戏名">
                <el-input v-model="game.name"></el-input>
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
                <el-input v-model="game.description"></el-input>
              </el-form-item>
              <!--穿梭框选标签-->
              <el-transfer v-model="selectTag" :data="tagListForFront" :titles=titles></el-transfer>
              <!--标题图-->
              <el-form-item label="游戏海报">
                <el-upload
                  class="upload-demo"
                  list-type="picture"
                  action=""
                  accept=".jpg,.png"
                  :limit="1"
                  :on-change="getFile0"
                  :on-remove="handleUploadRemove0"
                  :auto-upload="false"
                  multiple>
                  <el-button size="small" type="primary"
                             v-if="this.game.header_image===null||this.game.header_image===''">选择图片上传
                  </el-button>
                </el-upload>
              </el-form-item>
              <!--截图1-->
              <el-form-item label="游戏截图1">
                <el-upload
                  class="upload-demo"
                  list-type="picture"
                  action=""
                  accept=".jpg,.png"
                  :limit="1"
                  :on-change="getFile1"
                  :on-remove="handleUploadRemove1"
                  :auto-upload="false"
                  multiple>
                  <el-button size="small" type="primary"
                             v-if="this.game.screenshot1===null||this.game.screenshot1===''">选择图片上传
                  </el-button>
                </el-upload>
              </el-form-item>
              <!--截图2-->
              <el-form-item label="游戏截图2">
                <el-upload
                  class="upload-demo"
                  list-type="picture"
                  action=""
                  accept=".jpg,.png"
                  :limit="1"
                  :on-change="getFile2"
                  :on-remove="handleUploadRemove2"
                  :auto-upload="false"
                  multiple>
                  <el-button size="small" type="primary"
                             v-if="this.game.screenshot2===null||this.game.screenshot2===''">选择图片上传
                  </el-button>
                </el-upload>
              </el-form-item>
              <!--截图3-->
              <el-form-item label="游戏截图3">
                <el-upload
                  class="upload-demo"
                  list-type="picture"
                  action=""
                  accept=".jpg,.png"
                  :limit="1"
                  :on-change="getFile3"
                  :on-remove="handleUploadRemove3"
                  :auto-upload="false"
                  multiple>
                  <el-button size="small" type="primary"
                             v-if="this.game.screenshot3===null||this.game.screenshot3===''">选择图片上传
                  </el-button>
                </el-upload>
              </el-form-item>

              <el-button type="primary" @click="addGame">发布</el-button>
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
    name: "GameAdd",
    data() {
      return {
        game: {
          id: 0,
          developer_id: 0,//加载不展示
          name: '',//填写
          price: 0,//填写
          create_time: 0,//填写
          description: '',//填写
          header_image: '',//填写
          screenshot1: '',//填写
          screenshot2: '',//填写
          screenshot3: '',//填写
          is_exist: 1,
        },
        selectTag: [],//已选的标签的id
        tagList: [
          {
            id:'',
            name: '',
            description: ''
          }
        ],//后端传给前端的完整数据
        tagListForFront: [
          {
            key:'',
            label:'',
            disabled:'',
          }
        ],//转换格式后的完整列表数据
        titles:['可选标签','已选标签'],
      }
    },
    methods: {
      generateData() {
        const data = [];
        for (let i = 0; i < this.tagList.length; i++) {
          data.push({
            key: this.tagList[i].id,
            label: this.tagList[i].name,
            disabled: false,
          });
        }
        return data;
      },
      async addGamePageLoad() {
        const {data: res} = await this.$axios.get('/apis/game/addGamePageLoad')
        // console.log(res.data)
        //更新数据
        this.game.developer_id = res.data.user.id;
        // console.log(res.data.user)
        this.tagList = res.data.tagList;
        // console.log(this.game.developer_id)
        // console.log(this.tagList)
        //初始化tagListForFront
        this.tagListForFront=this.generateData();
      },
      async addGame() {//添加游戏

        //this.selectTag是已选id的数组
        //检验表单
        if(this.game.name===''){
          this.$message.error("游戏名还没填写")
          return ;
        }
        if(this.game.price<0){
          this.$message.error("请填写正确价格")
          return ;
        }
        if(this.game.price===''||this.game.price===null||this.game.price===undefined){
          this.$message.error("价格还没填写")
          return ;
        }
        if(this.game.description===''){
          this.$message.error("描述还没填写")
          return ;
        }
        if(this.game.header_image===''){
          this.$message.error("游戏海报还没上传")
          return ;
        }
        if(this.game.screenshot1===''){
          this.$message.error("游戏截图1还没上传")
          return ;
        }
        if(this.game.screenshot2===''){
          this.$message.error("游戏截图2还没上传")
          return ;
        }
        if(this.game.screenshot3===''){
          this.$message.error("游戏截图3还没上传")
          return ;
        }
        if(this.selectTag.length===0){
          this.$message.error("至少要选一个标签")
          return ;
        }

        //发送请求
        const {data: res} = await this.$axios.post('apis/game/addGame', {
          game:{
            developer_id:this.game.developer_id,
            name:this.game.name,
            price:this.game.price,
            create_time:this.game.create_time/1000,
            description:this.game.description,
            header_image:this.game.header_image,
            screenshot1:this.game.screenshot1,
            screenshot2:this.game.screenshot2,
            screenshot3:this.game.screenshot3,
          },
          selectTag:this.selectTag,
        });
        //表示添加成功
        this.$message.success("游戏发布成功")
        //跳转到游戏列表
        this.$router.push('/gameList')


      },
      // 获取图片转base64
      getBase64(file) {
        return new Promise(function (resolve, reject) {
          const reader = new FileReader()
          let imgResult = ''
          reader.readAsDataURL(file)
          reader.onload = function () {
            imgResult = reader.result
          }
          reader.onerror = function (error) {
            reject(error)
          }
          reader.onloadend = function () {
            resolve(imgResult)
          }
        })
      },
      //海报
      getFile0(file, fileList) {
        this.getBase64(file.raw).then(res => {
          this.game.header_image = res;
          /*const params = res.split(',')
          console.log(params, 'params')
          if (params.length > 0) {
            this.game.header_image = params[1]
          }*/
        })
      },
      handleUploadRemove0(file, fileList) {
        this.game.header_image = '';
      },
      //截图1
      getFile1(file, fileList) {
        this.getBase64(file.raw).then(res => {
          this.game.screenshot1 = res;
        })
      },
      handleUploadRemove1(file, fileList) {
        this.game.screenshot1 = '';
      },
      //截图2
      getFile2(file, fileList) {
        this.getBase64(file.raw).then(res => {
          this.game.screenshot2 = res;
        })
      },
      handleUploadRemove2(file, fileList) {
        this.game.screenshot2 = '';
      },
      //截图3
      getFile3(file, fileList) {
        this.getBase64(file.raw).then(res => {
          this.game.screenshot3 = res;
        })
      },
      handleUploadRemove3(file, fileList) {
        this.game.screenshot3 = '';
      },


    },
    created() {
      this.game.create_time = (new Date()).valueOf();
      this.addGamePageLoad();
    }
  }
</script>

<style scoped>
  .upload-demo {

  }


</style>
