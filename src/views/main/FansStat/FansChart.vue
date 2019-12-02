<template>
  <div>
    <!--曲线图-->
    <div id="chart_fans"></div>
    <!--表格-->
    <div class="stat_from">
      <div class="title">统计数据</div>
      <el-table
      :data="tableData"
      border
      style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="male"
          label="男粉"
          width="180">
        </el-table-column>
        <el-table-column
          prop="female"
          label="女粉">
        </el-table-column>
        <el-table-column
          prop="allnum"
          label="全部粉丝">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { type } from 'os'

export default {
  name:'fansChart',
  props:{
    dataList:{
        type: Array
      }
  },
  data(){
    return {
      dates_list:[],
      fans_stat:[],
      tableData: []
    }
  },
  methods: {
    initOption(){
      let option = {
                title: {
                    text: '粉丝增长曲线图'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['男性粉丝','女性粉丝','未知粉丝']
                },
                toolbox: {
                    feature: {

                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.dates_list
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'未知粉丝',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data: this.fans_stat[0] || [0,0,0,0,0,0,0]
                    },
                    {
                        name:'男性粉丝',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data: this.fans_stat[1]|| [0,0,0,0,0,0,0]
                    },
                    {
                        name:'女性粉丝',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data: this.fans_stat[2]|| [0,0,0,0,0,0,0],
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }
                ]
      };
      console.log("chart配置",option)
      return option
    },
    getChartData(){
      let dates_list = []

      let fansStat = []
      let fansStat_male = []
      let fansStat_female = []
      let fansStat_unkonwn = []

      this.dataList.forEach((obj)=>{``
        let time = obj.run_day + ''
        let yyyy = time.substr(0,4)
        let mm = time.substr(4,2)
        let dd = time.substr(6,2)
        dates_list.push(yyyy+"-"+mm+"-"+dd)
        fansStat_male.push(obj.man)
        fansStat_female.push(obj.woman)
        fansStat_unkonwn.push(obj.all_fans_num-obj.man-obj.woman)
      })

      fansStat.push(fansStat_unkonwn,fansStat_female,fansStat_male)
      console.log("日期坐标", dates_list)
      console.log("粉丝统计情况", fansStat)
      this.dates_list = dates_list
      this.fans_stat = fansStat

      let form_data = []
      for (let i = 0; i < dates_list.length; i++) {
        let item = {}
        item.date = dates_list[i]
        item.male = fansStat_male[i]
        item.female = fansStat_female[i]
        item.allnum = this.dataList[i].all_fans_num
        form_data.push(item)
      }
      console.log("统计表格数据", form_data)
      form_data.reverse()
      this.tableData = form_data
    }
  },
  mounted() {
    let chart_fans = echarts.init(document.getElementById('chart_fans'));
     chart_fans.setOption(this.initOption())
  },
  watch:{
    dataList(){
      this.getChartData()

      let chart_fans = echarts.init(document.getElementById('chart_fans'));
      chart_fans.setOption(this.initOption())
    }
  }

  
  
}
</script>
<style lang="scss">
  #chart_fans {
    width: 1200px;
    height: 500px;
    margin-top: 40px;
  }
  .stat_from {
      width: 800px;
      margin: 30px 30px 60px 0;
      .title {
       font-weight: 600;
       color: #2d2d2d;
      }
    }
</style>