<template>
  <div>
    <!--添加按钮-->
    <el-button type="primary" @click="dialogVisible = true">添加书籍</el-button>


    <!--表格-->
    <el-table :data="bookList">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="书名">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <div>
            <router-link :to="'/book/'+row.id">详情</router-link>&nbsp;
            <a href="#" @click.prevent="onRemove(row.id)">删除</a>  <!--<span>{{row.id}}</span>-->
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--添加书籍的对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      @close="onDiglogClosed()">
      <!--添加用户的表单-->
      <el-form :model="form" ref="myaddForm">
        <!--采集书本类型-->
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <!--采集书本名称-->
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!--采集书本描述-->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onAddNewBook">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "BookList",
    data() {
      return {
        bookList: [],
        //控制添加对话框显示和隐藏
        dialogVisible: false,
        //  采集添加书本信息
        form: {
          type: '',
          name: '',
          description: ''
        }
      }
    },
    created() {
      // this.getBookList1()
      this.getBookList2()
      // this.saveBook()
      // this.updateBook()
      // this.deleteBook()
    },
    methods: {
      //监听关闭dialog
      onDiglogClosed() {
        // console.log(this.$refs.myaddForm)
        // this.$refs.myaddForm.resetFields()

      },

      //提交表单
      async onAddNewBook() {
        const {data: res} = await this.$axios.post('/apis/books', this.form )
        /*const {data: res} = await this.$axios.post('/apis/books', {
          type:this.form.type,
          name:this.form.name,
          description:this.form.description
        })*/
        // console.log(res)

        //提交完关闭对话框
        this.dialogVisible = false

        //刷新列表数据
        this.getBookList2()

        //如果成功了
        if (res.code === 20011) {
          this.$message.success("添加成功")
        } else if (res.code === 20010) {//如果失败了
          this.$message.error("添加失败")
        }

      },

      //删除书籍
      async onRemove(id) {
        /*返回的primise如果加await就不会了*/
        const confirmResult = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(error => error)
        // console.log(confirmResult)


        if (confirmResult !== 'confirm')
          return this.$message.info('取消了删除')


        const {data: res}= await this.$axios.delete('apis/books/' + id)
        if(res.code===20021){
          this.$message.success('删除成功')
          this.getBookList2()//删除后刷新数据
        }else {
          this.$message.error('删除失败')
        }
      },

      //fetch方法跨域
      getBookList1() {
        fetch("/apis/books", {
          method: "get",

        })
          .then(result => {
            // console.log(result)
            return result.json()
          })
          .then(data => {
            console.log(data)
          })
      },

      //axios方法跨域
      getBookList2() {
        this.$axios.get("/apis/books")
          .then(res => {
            this.bookList = res.data.data
          })
      },

      //测试save--post
      saveBook() {
        this.$axios.post('/apis/books',
          {
            type: '类型',
            name: '书名',
            description: '描述'
          })
      },

      //测试update--put
      updateBook() {
        this.$axios.put('apis/books', {
          id: '34',
          type: '11',
          name: '11',
          description: '11'
        })
      },

      //测试delete delete
      deleteBook() {
        this.$axios.delete('apis/books/34')
      },


    }
  }
</script>

<style scoped>
  .el-table {
    margin-top: 15px;
  }
</style>
