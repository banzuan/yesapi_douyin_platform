<template>
    <div class="home">
     <header class="h_header">
       <h1>羚羊</h1>
       <h2>专注抖音运营，见证网红诞生</h2>
       <div class="header_r" v-if="!token">
         <router-link :to="{path: '/'}">首页</router-link>
         <router-link :to="{path: '/login'}">登录</router-link>
         <router-link :to="{path: '/signup'}" class="header_btn">免费注册</router-link>
       </div>
       <div class="header_r" v-if="token">
         <router-link class="greet" :to="{path: '/userstat'}">欢迎：{{username}}</router-link>
       </div>
     </header>
     <div class="home_main">
          <!--banner_start-->
           <el-carousel style="width: 100%" indicator-position="outside">
             <el-carousel-item v-for="item in 4" :key="item">
               <!-- <h3>{{ item }}</h3> -->
               <div class="slogon">
                 <h3 style="font-size: 28px">专注抖音运营，见证网红诞生</h3>
               </div>
             </el-carousel-item>
           </el-carousel>
          <!--banner_end-->
             <div class="cards">
               <div class="card">
                 <h3>助力抖音运营</h3>
                 <div>助你弯道超车</div>
               </div>
               <div class="card">
                 <h3>大数据统计与分析</h3>
                 <div>让你更懂短视频</div>
               </div>
             </div>
             <div class="home_btn">
                <el-button type="primary" round size="big" @click="toMain">立即体验</el-button>
             </div>
           </div>
      <footer>©2019 羚羊 - Top自媒体运营平台 Top.YesApi.Top 广州果创网络科技有限公司 All Rights Reserved.</footer>
     </div>
</template>
<script>
import { getToken } from '../../plugins/auth'
export default {
  data () {
    return {
      isCollapse: false,
      uo: true,
      token: '',
      username: ''
    }
  },
  methods: {
    // 退出功能
    tologin () {
      // 跳转到登陆
      this.$router.push({ path:'login'})
    },
    toMain () {
      this.$router.push({ path:'userstat'})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created() {
    this.token = getToken()
    this.username = localStorage.getItem('username')
  },
}
</script>
<style lang="scss" scoped>
.h_header {
  height: 50px;
  width: 100%;
  background: rgb(255, 208, 75);
  color: #383838;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  padding-top: 13px;
  box-sizing: border-box;

  
  .header_r {
    position: absolute;
    right: 30px;
    top: 16px;
    width: 160px;
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    .header_btn {
      display: inline-block;
      background: #99a9bf;
      border-radius: 10px;
      padding:10px;
      color: white;
      margin-top: -10px;
    }

    .greet {
      width: 100%;
      text-align: end;
    }
  }

  h1 {
    font-size: 25px;
    font-weight: 600;
    margin: 0 30px; 
  }

  h2 {
    font-size: 16px;
    font-weight: 400;
  }
}

.home_main {
  width: 100%;

  .slogon {
    text-align: center;
    font-size: 38px;
  }

  .cards {
    display: flex;
    justify-content: center;

    .card {
      width: 500px;
      height: 350px;
      background: #475669;
      margin: 10px;
      display: flex;
      justify-content: center;
      flex-flow: column;
      align-items: center;
      font-size: 20px;
      color: white;

      h3 {
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 10px;
      }
    }
  }

}



.home_btn {
  margin: 0 auto;
  width: 250px;
  height: 60px;
  margin-top: 30px;
  .el-button {
    width: 250px;
    height: 50px;
    font-size: 18px;
    border-radius: 40px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

footer {
  margin-top: 85px;
  text-align: center;
  color: #6d6d6d;
  font-size: 15px;
}

</style>
