<template>
  <div>
    <el-card class="box-card">
      <!--<p>{{this.userWallet.user_id}}</p>-->
      <h3>账户余额: {{this.userWallet.balance}}</h3>
    </el-card>

    <el-card style="width: 60%">
      <div class="block" disabled="disabled">
        <span class="demonstration">钱包创建日期</span>
        <el-date-picker
          v-model="this.userWallet.create_time"
          type="timestamp"
          style="width: 50%"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="block" disabled="disabled">
        <span class="demonstration">钱包更新日期</span>
        <el-date-picker
          v-model="this.userWallet.update_time"
          type="timestamp"
          style="width: 50%"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <p>钱包状态: </p>
      <el-radio-group v-model="this.userWallet.wallet_status" disabled="disabled">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="0">禁用</el-radio>
      </el-radio-group>
    </el-card>
    <el-card>
      <el-button type="primary" @click="subBalance(100)">提现100元</el-button>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "DeveloperWalletInfo",
  data(){
    return{
      userWallet:{
        user_id:999999,
        balance:0.0,
        create_time:1673009300,
        update_time:1673009300,
        wallet_status:1,
      }
    }
  },
  created() {
    this.developerWalletLoad();
  },
  methods:{
    async developerWalletLoad(){//加载开发商钱包信息
      const {data: res} = await this.$axios.get('/apis/developer/getDeveloperWallet');
      this.userWallet=res.data;

    },
    async subBalance(x){
      if(this.userWallet.balance>=x){
        const {data: res} = await this.$axios.put('/apis/developer/subBalance/'+x);
        this.userWallet.balance-=x;
        this.$message.success("提现成功")
      }else {
        this.$message.error("余额不足以提现");
      }

    }
  },
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
