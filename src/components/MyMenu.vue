<template>
  <div class="my_menu">
    <el-row class="tac">
    <el-col>
    <el-menu
      :default-active="activeTab"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      >
      <el-menu-item index="0">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
          <template slot="title">
            <span>视频</span>
          </template>
          <el-menu-item index="1-1">我的视频</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>粉丝和关注</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">粉丝</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-2">关注</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">粉丝统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4" v-if="false">
          <template slot="title">
            <span>素材</span>
          </template>
          <el-menu-item index="4-1">素材库</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="4">
          <template slot="title">活动策划</template>
          <el-menu-item index="4-1">活动列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="5">
        <span slot="title">热门活动</span>
      </el-menu-item> -->
    </el-menu>
  </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'MyMenu',
  data(){
    return {
      activeTab:'0'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
        let index = keyPath[keyPath.length-1]
        console.log( 'index',index);
        switch (index) {
          case '2-1':
            this.$router.push('/myfans')
            this.activeTab = '2-1'
            break;
          case '2-2':
            this.$router.push('/myfocus')
            this.activeTab = '2-2'
            break;
          case '0':
            this.$router.push('/userstat')
            this.activeTab = '0'
            break;
          case '3-1':
            this.$router.push('/fans_stat')
            this.activeTab = '3-1'
            break;
          case '1-1':
            this.$router.push('/myvideos')
            this.activeTab = '1-1'
            break;
        
          default:
            console.log('no match')
            break;
        }


    }
  },
  created(){
    // this.activeTab = this.$route.query
    console.log("query",this.$route.fullPath)
    let key = this.$route.fullPath
    switch (key) {
      case '/myfocus':
        this.activeTab = '1-2'
        break;
      case '/myfans':
        this.activeTab = '1-1'
        break;
      case '/fans_stat':
        this.activeTab = '2-1'
        break;
      default:
        this.activeTab = '0'
        break;
    }
  }

}
</script>

<style lang="scss">
  .my_menu {
    width: 201px;
    min-height: 600px;
    border-right: solid 1px #e6e6e6;
  }

  .el-menu-item.is-active {
    border-right: solid 3px rgb(255, 132, 16);
    background: rgb(255, 242, 216);
    font-weight: 600;
  }

  .el-submenu__title span {
    font-size: 15px;
    font-weight: 600;
  }

  .el-menu-item {
    color: rgb(151, 151, 151);
  }
</style>