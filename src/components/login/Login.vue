<template>
  <div>
    <el-row :gutter="24" type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h1>欢迎登录系统</h1><br>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content ">
          <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content">
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content">
          <el-button type="primary" @click="login">确认登录</el-button>
          <el-button type="danger" @click="forget">忘记密码</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import {commonRequest} from "../../common/js/api/axiosApi";

  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    mounted() {

    },
    methods: {
      ...mapMutations(['setUser']),
      notifyMessage: function () {
        let username = this.$store.getters.user.username
        this.$notify({
          message: username + ',欢迎来到医药库存管理系统',
          type: 'success'
        });
      },
      login: function () {
        this.commonRequest('/login/userLogin', {
          username: this.username,
          password: this.password,
        }).then(res => {
            console.log(res.data);
            if (res.data.code === 200) {
              this.$store.commit('setToken', res.data.token)
              //先加载用户信息，初始vuex化静态仓库
              if (localStorage.getItem('Sys-Token') && localStorage.getItem('Sys-Token') !== '') {
                this.commonRequest('/user/getUserInfoByToken').then(async res => {
                  console.log(res.data)
                  if (res.data.code === 200) {
                    //设置用户信息
                    this.$store.commit('setUser', res.data.data);
                    //路由跳转
                    this.$router.push('/');
                  } else {
                    console.log(res.data)
                  }
                })

              } else {
                this.$router.push('/login');
              }
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              })
            }
          }
        ).catch(() => console.log('promise catch err'));//捕获异常
      },
      forget: function () {
        this.$message({
          message: '请联系系统管理员！',
          type: 'warning'
        })
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
