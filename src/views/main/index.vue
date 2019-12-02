<template>
  <div class="main">
    <m-header 
    :douyin_idList="douyin_user_list" 
    :current_user="current_user"
    :user_name='user_name' 
    @switch_item="switch_user" 
    @quick="logout"></m-header>
    <div class="flexbox">
        <m-menu></m-menu>
        <keep-alive>
        <router-view class="container" :current_user="current_user" @switchItem="switch_user"></router-view>
        </keep-alive>
    </div>
  </div>
</template>

<script>
import mHeader from '@/components/MyHeader'
import mMenu from '@/components/MyMenu'

import {initConnect, addBind, getStat, getDouyinList, getFansData} from '@/api'
import { getToken, removeToken } from '../../../plugins/auth'

export default {
  components: {
    mMenu,
    mHeader
  },
  data() {
    return {
      douyin_user_list: [],
      user_name: '',
      current_user: {}
    }
  },
  methods: {
    _initUserList(recall) {
      let data = new FormData()
      data.append('jwt_token', this.token)
      getDouyinList(data).then(res => {
        if(res.data.err_code === 0){
          this.douyin_user_list = res.data.douyin_user_list
          recall && recall()
        }else{
          this.$message({
            message: res.data.err_msg,
            type: 'warnning',
            duration:1800,
          })
        }
      })
    },

    //header
    switch_user(item){
      this.current_user = item
      console.log('switch',this.current_user)
    },
    logout() {
      removeToken()
      this.$router.push('/login')
    },
    
  },
  created() {
    //查询获取token
    let token = getToken()
    this.token = token

    if(!token) {
      return this.$alert('账号未登录', '提示', {
          confirmButtonText: '确定',
      }).then(()=>{
        this.$router.push('./')
      })
    }

    this.user_name = localStorage.getItem('username')
    
    this._initUserList(()=>{
      this.switch_user(this.douyin_user_list[0])
    })
  },

}
</script>

<style lang="scss">
.container {
  background-color: #f7f7f7;
  width: 100%;
}
  
</style>