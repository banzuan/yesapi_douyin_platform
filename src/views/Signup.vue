<template>
    <div class="register">
        <div class="container">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <div class="title">注册 - 羚羊</div>
            <el-form-item  prop="username">
                用户名：<el-input v-model.trim="form.username" placeholder='用户名'></el-input>
            </el-form-item>
             <el-form-item  prop="password">
                密码：<el-input type='password' v-model.trim="form.password" placeholder='密码'></el-input>
            </el-form-item>
            <el-form-item prop="pwdComfirm">
                确认密码：<el-input type='password' v-model.trim="form.pwdComfirm" placeholder='确认密码'></el-input>
            </el-form-item>
            <el-form-item prop="phoneNum">
                手机号： <el-input v-model.trim="form.phoneNum" placeholder='手机号码'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="signup-btn" @click="submitForm(form)">免费注册</el-button>
                <router-link class="switch" :to="{path:'/login'}">我有账号？直接登陆&gt;&gt;</router-link>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
import { signUp } from '@/api'
import axios from 'axios'

export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (this.form.repassword) {
        this.$refs.form.validateField('repassword')
      }
      callback()
    }
    const repasswordValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致哦'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        pwdComfirm: '',
        phoneNum: ''
      },
      rules: {
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入6位数或以上的字母与数字组合密码', trigger: 'blur' },
          { pattern: /^\S+$/, message: '密码不能含有空格', trigger: 'blur' },
          { pattern: /(?=.*[0-9])(?=.*[a-zA-Z])/, message: '密码必须包含字母和数字', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码应为6-12位的字母与数字组合', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        pwdComfirm: [
          { required: true, validator: repasswordValidator, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
     submitForm(form) {
       this.$refs.ruleForm.validate((valid) => {
         if (valid) {
           //表单符合规则的处理
           let data = new FormData()
           data.append('username',form.username)
           data.append('password',form.password)
    
           signUp(data).then(res => {
             console.log(res.data)
             if (res.data.err_code == 1) {
               this.$alert('账号已存在', '提示', {
                confirmButtonText: '确定',
                showClose: false
               })
             } else{
               this.$message({
               message: '注册成功，请前往登陆',
               type: 'warning',
               duration: 1000
               })
   
               setTimeout(() => {
                 this.reset();
                 this.$router.push('./login')
               }, 1000);
             }    
           })
           
         }else {
           this.$alert('请正确输入注册信息并确保完整', '提示', {
            confirmButtonText: '确定',
            showClose: false
           })
           return false;
         }
       })     
     },
     reset() {
      this.form = {
        username: '',
        password: '',
        pwdComfirm: '',
        phoneNum: ''
      }
    }
    }
 }
</script>
<style lang="scss" scoped>
.register {
  position: fixed;
  width: 100%;
  height: 100%;
  background:  #d3dce6;

  // .necessary {
  //   position: relative;
  // }

  // .necessary::before {
  //   content: '*';
  //   color:red;
  //   font-size: 16px;
  //   position: absolute;
  //   left: -15px;
  // }

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
      font-weight: 500px;
      box-sizing: border-box;
      text-shadow: 5px 5px 5px #919191;
      // overflow: hidden;
    }
    .signup-btn {
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
