<template>
  <div class="stat_panel">
    <section class="id_follows">
            <h3 :class="{'new_binding':isNew_binding}">粉丝数据统计</h3>
            <div class="follows">
              <div class="follows_all">
                <div class="color"></div>
                <div>
                  <p class="number">{{follows}}</p>
                  <p class="classname">所有粉丝数量</p>
                </div>
              </div>
              <div class="follows_female">
                <div class="color"></div>
                <div>
                  <p class="number">{{follows_female}}</p>
                  <p class="classname">女粉</p>
                </div>
              </div>
              <div class="follows_male">
                <div class="color"></div>
                <div>
                  <p class="number">{{follows_male}}</p>
                  <p class="classname">男粉</p>
                </div>
              </div>
            </div>
          </section>
          <!--流量贡献-->
          <section class="flow_contribution">
            <h3 :class="{'new_binding':isNew_binding}">流量贡献</h3>
            <div class="flow">
              <div><p>总流量：{{flow_vv[0]}}，粉丝：{{flow_vv[1]}}</p><p><i class="el-icon-video-play"></i>刷视频</p></div>
              <div><p>总流量：{{flow_like_cnt[0]}}，粉丝：{{flow_like_cnt[1]}}</p><p><i class="el-icon-star-off"></i>点赞</p></div>
              <div><p>总流量：{{flow_comment_cnt[0]}}，粉丝：{{flow_comment_cnt[1]}}</p><p><i class="el-icon-edit-outline"></i>评论</p></div>
              <div><p>总流量：{{flow_share_video_cnt[0]}}，粉丝：{{flow_share_video_cnt[1]}}</p><p><i class="el-icon-position"></i>转发</p></div>
            </div>
          </section>
          <!--粉丝分布-->
          <m-charts :charts_data="fansData"></m-charts>
          <!--兴趣分布-->
          <m-label :label_data="fansData.interest_distributions"></m-label>
  </div>
</template>

<script>
import mCharts from '@/components/MyCharts'
import mLabel from '@/components/MyLabel'
export default {
  name: "statPanel",
  components: {
    mCharts,
    mLabel
  },
  props: {
    fansData: {
      type: Object
    }
  },
  data() {
    return {
      follows:'00,000',
      follows_female:'00,000',
      follows_male:'00,000',
      flow_vv:[0,0],
      flow_like_cnt:[0,0],
      flow_comment_cnt:[0,0],
      flow_share_video_cnt:[0,0],
      isNew_binding: false,
    }
  },
  watch: {
    fansData(newVal){
      //粉丝数据统计
      console.log('监听的粉丝统计数据',newVal)

      //新绑定的用户次日才获取数据
      if(newVal.active_days_distributions === null && newVal.age_distributions === null){
        console.log('新绑定的用户次日才获取数据')
        this.isNew_binding = true
      }else{
        this.isNew_binding = false
      }



      this.follows = newVal.all_fans_num
      
      let male, female

      let genderData = newVal.gender_distributions
      for (let i in genderData) {
        if (genderData[i].item === '1') {
          male = genderData[i].value
        }else if(genderData[i].item === '2'){
          female = genderData[i].value
        }else{
          return
        }
      }
      this.follows_male = male || '0'
      this.follows_female = female || '0'

      //流量贡献
      let flow_vv=[],
          flow_like_cnt = [],
          flow_comment_cnt = [], 
          flow_share_video_cnt =[]

      let flowData = newVal.flow_contributions
      for (let i in flowData) {
        if (flowData[i].flow === 'vv') {
          flow_vv.push(flowData[i].all_sum)
          flow_vv.push(flowData[i].fans_sum)
        }
        if (flowData[i].flow === 'like_cnt') {
          flow_like_cnt.push(flowData[i].all_sum)
          flow_like_cnt.push(flowData[i].fans_sum)
        }
        if (flowData[i].flow === 'comment_cnt') {
          flow_comment_cnt.push(flowData[i].all_sum)
          flow_comment_cnt.push(flowData[i].fans_sum)
        }
        if (flowData[i].flow === 'share_video_cnt') {
          flow_share_video_cnt.push(flowData[i].all_sum)
          flow_share_video_cnt.push(flowData[i].fans_sum)
        }
        this.flow_vv= flow_vv
        this.flow_like_cnt=flow_like_cnt
        this.flow_comment_cnt=flow_comment_cnt
        this.flow_share_video_cnt=flow_share_video_cnt
      }
    }
  },
  methods: {
    datashow(){
      console.log('子组件的粉丝统计数据',this.fansData)
    }
  },
}
</script> 

<style lang="scss">
.id_follows h3{
    margin-top: 40px;
    font-size: 24px;
    font-weight: 600;
  }

.follows {
    display: flex;
    width: 680px;
    height: 90px;
    margin-top: 30px;
    justify-content: space-between;

    .number {
      display: block;
      width: 130px;
      font-size: 32px;
      font-weight: 600;
      color: #303030;
      margin-left: 15px;
      line-height: 80px;
      text-align: center;
    }

    .classname {
      display: block;
      width: 130px;
      margin-left: 15px;
      margin-top: -15px;
      font-size: 14px;
      color: #303030;
      text-align: center;
    }

    &_all {
      display: flex;
      background-color: rgb(236, 236, 236);
      width: 210px;
      .color {
        width: 40px;
        background-color: #FBAB1A;
      }
    }

    &_female {
      display: flex;
      background-color: rgb(236, 236, 236);
      width: 210px;
      .color {
        width: 40px;
        background-color: #e16389;
      }
    }

    &_male {
      display: flex;
      background-color: rgb(236, 236, 236);
      width: 210px;
      .color {
        width: 40px;
        background-color: #3c6cc4;
      }
    }
  }


.flow_contribution{
  margin-top: 40px;

  h3 {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 600;
  }
}

  p {
    text-align: center;
  }

  .flow {
    display: flex;
    width: 920px;
    justify-content: space-between;

    div {
      width: 210px;
      height: 90px;
    background-color: #e3e3e3;
    }

    p {
      font-size: 15px;
    }

    p:nth-child(1) {
      margin-top: 25px;
      margin-bottom: 20px;
      font-weight: 600;
    }
  }
  .new_binding::after {
    content: '*用户首次授权应用后，需要间隔1天才会产生粉丝数据';
    color: rgb(199, 13, 13);
    font-size: 12px;
    margin-left: 15px;
  }

  .m-charts {
    position: relative;
  }

  .m-label {
    position: absolute;
    top: 50px;
    left: 20px;
  }
</style>