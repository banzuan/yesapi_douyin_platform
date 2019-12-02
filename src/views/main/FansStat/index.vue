<template>
  <div class="fansStat">
    <div class="title"><span>{{current_user.nickname}}</span>粉丝统计</div>
    <el-date-picker
      v-model="value1"
      type="daterange"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <div class="submit">
    <el-button plain @click="showChart">刷新数据</el-button>
    </div>
    <fans-chart :dataList="list"></fans-chart>
  </div>
</template>

<script>
import { getFansDetailByDay } from '@/api'
import fansChart from './FansChart.vue'
import { getToken } from '../../../../plugins/auth'

export default {
  components: {
    fansChart
  },
  props:{
    current_user:{
      type: Object
    }   
  },
  data() {
    return {
      value1: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      page: '1',
      page_size: '20',
      token: '',
      list: []
    };
  },
  methods: {
    showChart() {
      this.getFansData()
    },
    getFansData() {
      let start_day = this.value1[0].replace(/-*/g,"")
      let end_day = this.value1[1].replace(/-*/g,"")
      let data = new FormData()
      data.append('jwt_token', this.token)
      data.append('open_id', this.current_user.open_id)
      data.append('page', this.page)
      data.append('page_size', this.page_size)
      data.append('start_day', start_day)
      data.append('end_day', end_day)
      
      getFansDetailByDay(data).then(res=>{
        console.log('粉丝数据',res.data.list)
        this.list = res.data.list
      })
    },
    initTime() {
      let date1 = new Date()
      let date2 = new Date(date1.getTime() - 144*60*60*1000)
      let today = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
      let week_ago = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
      let timePeriod = []
      timePeriod.push(week_ago,today)
      console.log('value1',timePeriod)
      this.value1 = timePeriod
    }
  },
  watch: {
    current_user(newValue) {
        this.getFansData()
    }
  },
  created() {
    this.token = getToken()
    this.initTime()
    if(this.current_user.open_id){
      this.getFansData()
    }
  }

}
</script>

<style lang="scss">
  .fansStat {
    padding-top: 20px;
    padding-left: 50px;

    .title {
    margin-bottom: 30px;
    color: #202020;
    font-size: 20px;
    span {
      color:rgb(24, 24, 24);
      margin-right: 10px;
      font-size: 24px;
      font-weight: 600;
      }
    }

    .submit{
      display: inline-block;
      margin-left: 20px;
      
      .el-button{
         height: 40px;
         width: 140px;
      }
    }

    .el-table--border {
      border: #cecece solid 1px;
    }
    .el-table {
      color: #202020;
      margin-left: 50px;
    }
    
    
  }
</style>