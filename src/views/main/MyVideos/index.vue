<template>
  <div class="my_videos">
    <!-- <div class="vd_cmt">抽屉-评论</div> -->
    <div class="title"><span>{{current_user.nickname}}</span>我的视频</div>
    <div class="list_container" v-loading="loading">
      <div v-if="videosList">
      <div class="vd_item" v-for="item in videosList" :key=item.item_id>
        <div class="vd_cover">
          <img :src="item.cover" alt="">
        </div>
        <div class="vd_content">
          <div class="vd_title">
            <div class="headline">{{item.title}}</div>
            <span class="vd_isTop" v-if="item.isTop">置顶</span>
            <span class="vd_Reviewed" v-if="item.is_reviewed">已通过审核</span>
            <span class="vd_notReviewed" v-else>未通过审核</span>
            <span class="vd_time">创建时间：{{getTime(item.create_time)}}</span>
          </div>
          <div class="vd_count">
            <div>
              <p class="countNum">{{item.statistics.play_count}}</p>
              <p>播放量</p>
              </div>
            <div>
              <p class="countNum">{{item.statistics.digg_count}}</p>
              <p>点赞量</p>
            </div>
            <div>
              <p class="countNum">{{item.statistics.comment_count}}</p>
              <p>评论量</p>
            </div>
            <div>
              <p class="countNum">{{item.statistics.forward_count}}</p>
              <p>转发量</p>
            </div>
            <div>
              <p class="countNum">{{item.statistics.share_count}}</p>
              <p>分享量</p>
            </div>
            <div>
              <p class="countNum">{{item.statistics.download_count}}</p>
              <p>下载量</p>
            </div>
          </div>
          <div class="vd_btns">
            <a :href="item.share_url" target="blank" style="margin-right:10px;"><el-button type="primary">播放</el-button></a>
            <el-button type="primary" plain @click="drawerOut(item)">评论管理</el-button>
          </div>
        </div>
      </div>
      </div>
      <div v-if="!videosList&&!loading">还没有视频作品呢</div>
      

      <div class="block">
       <el-button @click="loadmore" v-if="hasMore">加载更多</el-button>
       <div  v-else-if="videosList.length>5">没有更多可加载了</div>
       <div v-else></div>
      </div>

    </div>

    

    <el-drawer
      :title="current_item.title"
      :visible.sync="drawer"
      direction="rtl">
      <span></span>
    </el-drawer>
    
    
  </div>
</template>

<script>
import { getVideoData, getVideoList } from '@/api'
import { getToken } from '../../../../plugins/auth'

export default {
  props: {
    current_user: {
      type: Object
    }
  },
  data() {
    return {
      cursor: 0,
      hasMore: true,
      videosList: [],
      drawer: false,
      current_item: {},
      loading: true
    }
  },
  methods: {
    get_videosList() {
      let token = getToken()
      let data = new FormData()
      data.append('jwt_token',token)
      data.append('open_id',this.current_user.open_id)
      data.append('cursor', this.cursor)
      getVideoList(data).then(res=>{
        this.cursor = res.data.data.cursor
        this.hasMore = res.data.data.has_more
        this.videosList = res.data.data.list || []
        this.loading = false
        console.log("视频列表", res.data.data.list)
      })
    },
    get_videosData(item) {
      console.log("/get videos data")
      // let token = getToken()
      // let data = new FormData()
      // data.append('jwt_token',token)
      // data.append('open_id',this.current_user.open_id)
      // data.append('itemIds', item.item_id)
    },
    //时间戳格式化
    getTime(time) {
      var date = new Date(time*1000 + 8 * 3600 * 1000);
      return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');
    },
    drawerOut(item) {
      if (this.drawer) {
        return
      }
      this.drawer = true
      this.current_item = item
      
      //转为base64的json字符串
      let itemIds = JSON.stringify(window.btoa(item.item_id))
      
      let token = getToken()
      let data = new FormData()
      data.append('jwt_token',token)
      data.append('open_id',this.current_user.open_id)
      data.append('itemIds',itemIds)
      getVideoData(data).then(res=>{
        console.log(res)
      })
    },
    loadmore() {
      if(hasMore) {
        this.get_videosList()
      }
    }
  },
  watch: {
    current_user() {
      this.loading = true
      this.cursor = 0
      this.get_videosList()
      this.get_videosData()
    }
  },
  created() {
    if(this.current_user.open_id){
      this.get_videosList()
    }
  }
  
}
</script>

<style lang="scss">
.my_videos {
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
  .list_container {
    min-height: 750px;
    margin: 30px 0 60px 30px; 
    border-radius: 10px;
    overflow: hidden;

    .vd_item:hover {
      background-color: #fff;
      box-shadow:#e0e0e0 2px 2px 7px 2px;
      transition: 0.5s; 
      border-radius: 15px;
      }

    .vd_item {
      margin-top: 20px;
      margin-left: 5px;
      min-width: 800px;
      max-width:1200px;
      height: 250px;
      display: flex;
      flex-flow: row;
      border-radius: 15px;
      background-color: #fff;

      .vd_cover {
        margin: 25px;
        height: 200px;
        width: 150px;
        min-width: 150px;
        overflow: hidden;
        img{
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .vd_content {
        width: 100%;
        margin: 30px 30px 30px 0px;

        .vd_title {
          
          .headline {
            display: inline-block;
            max-width: 500px;
            font-size: 19px;
            font-weight: 600;
            color: #2b2b2b;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .vd_isTop {
            margin-left: 10px;
            padding: 3px;
            border-radius: 4px;
            display: inline-block;
            background-color: #eeeeee;
            color: rgb(236, 132, 35);
            font-size: 14px;
            font-weight: 500;
          }
          .vd_Reviewed {
            margin-left: 10px;
            padding: 3px;
            border-radius: 4px;
            display: inline-block;
            background-color: #eeeeee;
            color: rgb(86, 155, 196);
            font-size: 14px;
            font-weight: 500;
          }
          .vd_notReviewed {
            margin-left: 10px;
            padding: 3px;
            border-radius: 4px;
            display: inline-block;
            background-color: #eeeeee;
            color: rgb(175, 175, 175);
            font-size: 14px;
            font-weight: 500;
          }
          .vd_time {
            float: right;
            padding-top: 6px;
            font-size: 14px;
            color: #616161;
            font-weight: 500;
          }
        }
        .vd_count {
          margin-top: 15px;
          margin-bottom: 15px;
          height: 110px;
          display: flex;
          justify-content: space-around;
          div {
            width: 110px;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-flow: column;
            p{
              margin: 8px 0;
              color: #353535;
            }
            .countNum{
              font-size: 23px;
              font-weight: 600;
            }

          }
        }
        .vd_btns {
          .el-button {
            width: 120px;
            height: 35px;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 20px;
          }
        }
      }
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
}

  
</style>