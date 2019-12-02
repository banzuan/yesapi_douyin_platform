<template>
  <div class="myfans" v-loading="loading">
    <div class="title"><span>{{current_user.nickname}}</span>粉丝列表</div>
    <div class="myfans_container" v-if="fanslist">
      <m-usercard v-for="item in fanslist" :key=item.open_id :userId="item">
      </m-usercard> 
    </div>
    <div class="block">
    <el-button @click="loadmore" v-if="cursor>=0">加载更多</el-button>
    <div v-else-if="fanslist.length>20">没有更多可加载了</div>
    <div v-else></div>
    </div>
  </div>
</template>

<script>
import mUsercard from '@/components/MyUsercard'
import { getFanslist } from '@/api'
import { getToken } from '../../../../plugins/auth'
export default {
  components: {
    mUsercard
  },
  props:{
    current_user:{
      type: Object
    }   
  },
  data(){
    return{
      fanslist:[],
      cursor:0,
      allpage: '',
      loading: true

    }
  },
  created() {
    if(this.current_user.open_id){
      this.getList()
    }
  },
  methods: {
    loadmore() {
      this.getList()
    },
    getList() {
      if(this.cursor == -1) {
        return
      }
      let token = getToken()
      let open_id = this.current_user.open_id
      let data = new FormData()
      data.append('jwt_token',token)
      data.append('open_id',open_id)
      data.append('cursor',this.cursor)
      getFanslist(data).then((res)=>{
        this.fanslist = this.fanslist.concat(res.data.data.list)
        this.cursor = res.data.data.cursor
        this.loading = false
      })
    }
  },
   watch: {
    current_user(newValue) {
        this.cursor = 0
        this.loading = true
        this.fanslist = []
        this.getList()
    }
  }
}
</script>

<style lang="scss">
.myfans {
  padding-top: 20px;
  padding-left: 50px;
  .title {
    margin-bottom: 10px;
    color: #5c5c5c;
    font-size: 20px;
    span {
      color:rgb(24, 24, 24);
      margin-right: 10px;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .myfans_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    min-height: 700px;
    align-content: flex-start;
  }
  .block{
    .el-button {
      width: 140px;
      height: 40px;
      font-weight: 600;
    }
    margin-top: 50px;
    margin-bottom: 80px;
    text-align: center;
      color: #7a7a7a
  }
}
  
</style>