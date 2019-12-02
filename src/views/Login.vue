<template>
    <div class="login">
        <div class="container">
            <el-form ref="loginForm" :model="form" :rules="rules">
                <!-- <img src="../assets/tx_wxid_46r57gd3le2m22.jpg" class="avatar" alt=""> -->
                <div class="title">登陆 - 羚羊</div>
            <el-form-item prop="username">
                账号：<el-input v-model="form.username" placeholder='用户名' prefix-icon="el-icon-user"></el-input>
            </el-form-item>
             <el-form-item prop="password">
                密码：<el-input type='password' v-model="form.password" placeholder='密码' prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click='loginValide(form)'>登陆</el-button>
                <router-link class="switch" :to="{path:'/signup'}" >还没账号？免费注册&gt;&gt;</router-link>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
import { login } from '@/api'
import { setToken } from '../../plugins/auth'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginValide(form){
      let data = new FormData()
      data.append('username',form.username)
      data.append('password',form.password)

      //点击登录 
      // this.$router.push({ path:'home'})
      login(data).then((res) => {
        console.log(res)
        if(res.ret !== 200) {
          this.$alert('服务器请求失败', '登陆失败', {
            confirmButtonText: '确定',
            showClose: false
          })
        } else if (res.ret == 200 && res.data.err_code !== 0){
          this.$alert(res.data.err_msg, '登陆失败', {
            confirmButtonText: '确定',
            showClose: false
          })
        } else {
          this.$message({
            message: '登陆成功，为您跳转页面',
            type: 'warning',
            duration: 1000
            })
            //保存username
            localStorage.setItem('username', form.username)

            //保存jwt_token
            let token = res.data.jwt_token
            setToken(token)

            setTimeout(() => {
              this.reset();
              this.$router.push('./userstat')
            }, 1000);
        }
      })
    },
    reset() {
      this.form = {
        username: '',
        password: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background:  #d3dce6;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    box-shadow: rgb(153, 153, 153) 10px 10px 10px 0px;
    border-radius: 5px;

    .title {
      position: relative;
      left: 0;
      top: -50px;
      color: rgb(41, 41, 41);
      margin-top: 0px;
      font-size: 38px;
      font-weight: 500;
      box-sizing: border-box;
      text-shadow: 5px 5px 5px #919191;
      // overflow: hidden;
    }

    // .avatar {
    //   position: relative;
    //   left: 50%;
    //   width: 120px;
    //   height: 120px;
    //   margin-left: -60px;
    //   margin-top: -60px;
    //   box-sizing: border-box;
    //   border-radius: 50%;
    //   border: 5px solid #fff;
    //   box-shadow: 0 1px 5px #ccc;
    //   // overflow: hidden;
    // }
    .login-btn {
      width: 60%;
      margin-right: 8px;
    }
    .switch {
      color:#19a8fb;
    }
    .switch:hover {
      text-decoration: underline;
    }
  }
}
</style>
