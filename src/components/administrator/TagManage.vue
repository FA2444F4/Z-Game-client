<template>
  <div style="height: 100%;width: 100%;position: absolute">
    <el-container style="height: 100%">
      <!--顶部栏-->
      <el-header>
        <el-row>
          <!--新增标签按钮-->
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-edit" @click="addDialogVisible = true">新增标签</el-button>
          </el-col>
          <!--搜索标签-->
          <el-col :span="16">
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="search" placeholder="在此搜索标签"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="seleteTagByNameLike">搜索</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-header>
      <!--中间-->
      <el-main>
        <!--tag列表展示及其删除修改-->
        <el-table :data="tagList">
          <el-table-column
            prop="name"
            label="标签名">
          </el-table-column>
          <el-table-column
            prop="description"
            label="标签描述">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <div>
                <!--修改-->
                <el-button type="warning" icon="el-icon-edit" circle
                           @click.prevent="makeUpdateDialogVisible(row.id,row.name,row.description)"></el-button>
                <!--删除-->
                <el-button type="danger" icon="el-icon-delete" circle
                           @click.prevent="makeDeleteDialogVisible(row.id)"></el-button>
                <!--<button class="el-button&#45;&#45;danger" @click.prevent="deleteTag(row.id)">删除</button>-->
              </div>
            </template>
          </el-table-column>
        </el-table>

      </el-main>
      <!--底部栏-->
      <!--<el-footer>
      </el-footer>-->
    </el-container>

    <!--容器外-->
    <!--添加标签的对话框-->
    <el-dialog
      title="新增标签"
      :visible.sync="addDialogVisible"
      width="70%"
      @close="addDiglogClosed()">
      <!--添加tag的表单-->
      <el-form :model="addForm">
        <!--name-->
        <el-form-item label="标签名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <!--description-->
        <el-form-item label="标签描述">
          <el-input v-model="addForm.description" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>
    <!--是否删除的确认框-->
    <el-dialog
      :visible.sync="deleteDialogVisible"
      width="30%"
      title="是否删除">
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteTag">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改的对话框-->
    <el-dialog
      :visible.sync="updateDialogVisible"
      width="50"
      title="修改标签信息"
      @close="updateDialogClosed">
      <el-form :model="updateForm">
        <!--name-->
        <el-form-item label="标签名">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <!--description-->
        <el-form-item label="标签描述">
          <el-input v-model="updateForm.description" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TagManage",
    created() {
      //刷新标签列表
      this.getAllTag()
    },
    data() {
      return {
        search: '',//搜索框正确
        addDialogVisible: false,//控制添加对话框显示和隐藏
        deleteDialogVisible: false,//控制删除的对话
        updateDialogVisible: false,//控制更改的对话
        tagList: [
          {
            name: '',
            description: ''
          }
        ],//所有标签
        addForm: {
          name: '',
          description: ''
        },
        updateForm: {
          id: '',
          name: '',
          description: ''
        },
        deleteWhich: 1,
        updateWhich: 1,
      }
    },
    methods: {
      //监听关闭dialog
      addDiglogClosed() {
        //关闭对话时清空表单
        this.addForm.name = ''
        this.addForm.description = ''
      },
      updateDialogClosed() {
        this.updateForm.name = ''
        this.updateForm.description = ''
      },
      //新增标签
      async addTag() {
        //检测表单
        if (this.addForm.name === '') {
          this.$message.error("标签名还没填写")
          return;
        }
        //发送请求
        const {data: res} = await this.$axios.post('apis/tag/addTag', {
          name: this.addForm.name,
          description: this.addForm.description
        });
        if (res.code === 0) {//报错,重复了
          this.form.name = '';
          this.$message.error(res.msg);
        } else {//新增成功
          //庆祝
          this.$message.success(res.msg);
          //刷新数据
          this.getAllTag()
          // this.$router.go(0)//刷新页面
          /*
          //测试带参数跳转
          this.$router.push({
            name: 'administratorHome',
            params:{
              dontWelcome:true
            }
          })*/
        }
        //提交完关闭对话框
        this.addDialogVisible = false
      },
      //刷新列表数据
      async getAllTag() {
        const {data: res} = await this.$axios.get('/apis/tag/getAllTag')
        this.tagList = res.data;
      },
      //搜索标签并且刷新列表数据
      async seleteTagByNameLike() {
        //如果输入为空则返回所有数据
        if (this.search === null || this.search === '') {
          this.getAllTag()
          return;
        }
        const {data: res} = await this.$axios.get('/apis/tag/seleteTagByNameLike/' + this.search);
        this.tagList = res.data;
      },
      //删除数据
      async deleteTag() {
        let id = this.deleteWhich;
        const {data: res} = await this.$axios.delete('/apis/tag/deleteTag/' + id)
        this.$message.success(res.msg)
        this.getAllTag()//刷新数据
        this.deleteDialogVisible = false
      },
      //修改数据
      async updateTag() {
        //判断标签名是否为空
        if (this.updateForm.name === null || this.updateForm.name === '') {
          this.$message.error("请填写标签名")
          return;
        }
        //判断表单标签名是否改完后有两个
        for (let i = 0; i < this.tagList.length; i++) {//遍历列表
          //如果原来的有同名的,并且两id不同
          if (this.tagList[i].name === this.updateForm.name && this.tagList[i].id !== this.updateForm.id) {
            this.$message.error("不允许有重名标签")
            this.updateForm.name = ''
            this.updateForm.description = ''
            return;
          }
        }

        //无误修改
        const {data: res} = await this.$axios.put('/apis/tag/updateTag', {///tmd,$axios写成axios了,一直报错
          id: this.updateForm.id,
          name: this.updateForm.name,
          description: this.updateForm.description
        })

        this.$message.success("修改成功")
        this.updateDialogClosed()//清空表单
        this.getAllTag()//刷新数据
        this.updateDialogVisible = false//关闭对话框


      },
      //唤醒删除确认对话框
      makeDeleteDialogVisible(id) {
        this.deleteWhich = id//修改要删除id
        this.deleteDialogVisible = true//唤醒对话框
      },
      //唤醒修改对话框
      makeUpdateDialogVisible(id, name, description) {
        this.updateForm.id = id;
        this.updateForm.name = name;
        this.updateForm.description = description;
        this.updateDialogVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
