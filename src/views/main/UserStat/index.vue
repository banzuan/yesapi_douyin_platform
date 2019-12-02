<template>
  <div>
    <div class="flexbox">
        <div class="user_stat">
          <!--抖音账号列表-->
          <div class="douyin_idList">
            <div class="douyin_item" :class="item.open_id==current_item.open_id?'active':'switch'" v-for="item in douyin_user_list" :key="item.open_id">
              <div class="head">
                <img :src="item.avatar" alt="">
              </div>
              <div class="name" :title="item.nickname">{{item.nickname}}</div>
              <a href="#" @click="switchItem(item)">
                {{item.open_id==current_item.open_id?'当前账号':'点击进入账号'}}
              </a>
             
            </div>
            <a :href="addBind_url" target="_self" class="add_id">
              <div><i class="el-icon-plus"></i></div>
              添加抖音号</a>
          </div>
          <!--抖音账号数据面板-->
          <m-stat :fansData="fansData"></m-stat>
        </div>
    </div>
  </div>
</template>

<script>
import mStat from './StatPanel'
import {initConnect, addBind, getStat, getDouyinList, getFansData} from '@/api'
import { getToken, removeToken } from '../../../../plugins/auth'

export default {
  name: 'userStat',
  components: {
    mStat
  },
  props:{
    current_user:{
      type: Object
    }   
  },
  data() {
    return {
      addBind_url: '',
      douyin_user_list: [],
      fansData:{},
      token:'',
      current_item:{}
    }
  },
  methods: {
    _binding() {
      //判断是否需要新增绑定
      let code = this.$store.state.code
      if(!code){
        return
      }

      let data = new FormData()
      data.append('code', code)
      data.append('jwt_token', this.token)
      addBind(data).then((res)=>{
        if(res.data.err_code != 0){
          return this.$message({
            message: res.data.err_msg,
            type: 'info',
            duration: 1800
          })
        }

        this.$message({
          message: '添加账号绑定成功',
          type: 'info',
          duration: 1800
        })
        console.log('账号信息：', res)
      })
    },
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
    /*备用*/
    showUserInfo(id) {
      if(this.current_user == id){
        return
      }
      this.current_user = id
      let data = new FormData()
      data.append('jwt_token',this.token)
      data.append('open_id',id.open_id)

      //设置随机数更新
      let rd = Math.random()>0.5?1:0
      data.append('force_update',rd)

      // 更新用户信息
      getStat(data).then(res=>{
        console.log('是否强制更新', rd)
      })
    },
    getPageData(current_user){
      let data = new FormData()
          data.append('jwt_token',this.token)
          data.append('open_id',current_user.open_id)
          getFansData(data).then(res => {
            this.fansData = res.data.data.fans_data
          })
        this.current_item = current_user
        this.$forceUpdate()
    },
    switchItem(item) {
      if(item == this.current_item){
        return
      }
      this.$emit('switchItem',item)
      this.current_item = item
    }
  },
  created() {
    let token = getToken()
    this.token = token
    this._initUserList(()=>{
      this.current_item = this.douyin_user_list[0]
    })

    if(!token) {
      return this.$alert('账号未登录', '提示', {
          confirmButtonText: '确定',
      }).then(()=>{
        this.$router.push('./')
      })
    }
    
    if(this.current_user.open_id){
      this.getPageData(this.current_user)
    }

    this._binding()

    //初始化url抖音账号接口
    let data_bindUrl = new FormData()
    data_bindUrl.append('jwt_token',this.token)
    initConnect(data_bindUrl).then((res)=>{
      // console.log('准备好的绑定扫码接口：',res.data.url)
      this.addBind_url = res.data.url
    })
  },
  watch: {
    current_user(newValue) {
      this.getPageData(newValue)
        
    },
  }
}
</script>

<style lang="scss">
.flexbox {
  display: flex;
}
.user_stat {
  background: #f7f7f7;
  flex: 1 1;
  position: relative;
}

.user_stat{
  padding-top: 20px;
  padding-left: 50px;

  .douyin_idList{
      display: flex;
      flex-flow: row;

    .douyin_item {
       width: 165px;
       height: 100%;

       .head {
         width: 120px;
         height: 120px;
         border: 8px solid #ececec;
         box-sizing: border-box;
         border-radius: 60px;
         background-color: rgb(236, 236, 236);
         overflow:hidden;
         margin-bottom: 10px;

         img{
           width: 100%;
           height: 100%;
         }
       }

       .name {
         width: 120px;
         overflow:hidden;
         text-overflow:ellipsis;
         white-space:nowrap;
         font-size: 15px;
         text-align: center;
         margin-bottom: 5px;
       }
     }
  }

  .add_id {
    width: 120px;
    height: 120px;
    background-color: #9d9d9d;
    text-align: center;
    color: rgba(44, 44, 44, 0.925);
    font-weight: 700;
    font-size: 15px;

    i {
      width: 100%;
      height:100%;
      line-height: 100px;
      font-size: 70px;
      color: rgba(250, 250, 250, 0.925);
    }
  }

  .add_id:hover {
    text-decoration: underline;
  }

  .add_id:active {
    background: #5e5e5e;
  }

  .switch a {
    display: block;
    width: 120px;
    text-align: center;
    color:#8a8a8a;
    font-size: 14px;
    }
  .switch a:hover {
    text-decoration: underline;
  }
  .active a{
    display: block;
    width: 120px;
    text-align: center;
    color:#8a8a8a;
    font-size: 14px;
    font-weight: 600;
  }

  .douyin_item.active .head {
    border-color: #FFC659;

  }

}
  
</style>