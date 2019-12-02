<template>
  <div class="m_header">
    <h2 class="m_left" @click='toHome'>羚羊</h2>
    <div class="m_center" v-if="douyin_idList">
      <el-dropdown @command="handleCommand" trigger="click" placement="bottom">
        <span class="el-dropdown-link" style="position: relative">
          <div class="user_head">
              <img :src="currentAvatar" class="avatar" alt="">
          </div>
          抖音号：{{currentUser}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in douyin_idList" :key="item.index" :command="item">{{item.nickname}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="m_right">
      <div class="user_info">  
          <span class="el-dropdown-link">
            <div class="user_name">
              <el-dropdown placement="bottom">
                <p>欢迎：{{user_name}}<i class="el-icon-arrow-down el-icon--right"></i></p>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="quick">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </span>
      </div>
      <!-- <div class="user_change">
        <div>当前抖音账号:XXX</div>
        <div class="acount_toggle">切换抖音账号</div>
      </div> -->
    </div>

  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
    douyin_idList: {
      type: Array
    },
    current_user: {
      type: Object
    },
    user_name: {
      type: String
    }
  },
  data () {
    return {
      currentUser:'',
      currentAvatar: ""
    }
  },
  methods: {
    handleCommand(command) {
      this.$emit('switch_item',command)
    },
    toHome(){
      this.$router.push('/')
    },
    quick() {
      this.$confirm('确认提出登录？', '提示')
          .then(_ => {
            this.$emit('quick')
          })
    }
  },
  watch: {
    current_user: function(newVal,oldVal){
        this.currentUser = newVal.nickname
        this.currentAvatar = newVal.avatar
    }

  },
  created() {
    this.username = localStorage.getItem('setUsername')
  },
  // created() {
  //   this.curentId = this.douyin_idList[0].nickname
  //   this.curentAvatar = this.douyin_idList[0].Avatar
  //   console.log('this.curentId:',this.douyin_idList)
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.m_header {
  height: 50px;
  width: 100%;
  background: rgb(255, 208, 75);
  margin-bottom: 10px;
  color: #383838;
  position: relative;
}
.m_left {
  float: left;
  line-height: 50px;
  margin-left: 30px;
  font-size: 25px;
  font-weight: bold;
}

.m_left:hover{
  cursor: pointer;
}

.m_center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .user_head {
   display: inline-block;
   height: 40px;
   width: 40px;
   border-radius: 20px;
   overflow: hidden;
   margin-top: 3px;
   border: rgb(255, 253, 221) solid 2px;
   box-sizing: border-box;
   position: absolute;;
   top: -14px;
   left: -50px;
 
   img {
     width: 100%;
     height: 100%;
 
   }
 }


}


.m_right {
  float: right;
  display: flex;

  .user_info {
    display: flex;
    margin-right: 10px;

    .user_name {
      margin: 10px;
      line-height: 30px;
      font-size: 15px;
    }
  }

 

  .user_change {
      width: 120px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      font-size: 12px;
      align-items: flex-start;
      padding-right: 25px;

      .acount_toggle {
        color: rgb(18, 134, 243);
        font-size: 12px;
        margin-top: 5px;
      }
      .acount_toggle:hover {
      text-decoration: underline;
    }
    }
}
</style>
