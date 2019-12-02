<template>
  <div class="main_charts">
      <div class="headline">
          <h3 class='title'>地区分布</h3>
          <h3 class='title'>年龄分布</h3>
      </div>
    <div class="charts">
      <div id="chart_geography"></div>
      <div id="chart_age"></div>
      <div class="activity">
        <h3 class="title">活跃天数分布</h3>
        <div id="chart_activity"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ecahrts from 'echarts'
import { type } from 'os'

export default {
  props: {
    charts_data: {
      type: Object     
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    initOption_geo() {
      let data = this.charts_data.geographical_distributions || [
                {value:35, item:'aaa'},
                {value:30, item:'bbb'},
                {value:24, item:'ccc'},
                {value:15, item:'ddd'},
                {value:18, item:'eee'}
            ]
      let city = []
      for (let i in data) {
         city.push(data[i].item)
      }
      const chartData = JSON.parse(JSON.stringify(data).replace(/item/g,"name"))
      let option = {
         tooltip : {
             trigger: 'item',
             formatter: "{a} <br/>{b} : {c}人 ({d}%)"
         },
         legend: {
             orient: 'vertical',
             left: 'left',
             data: city
         },
         series : [
             {
                 name: '地区分布',
                 type: 'pie',
                 radius : '55%',
                 center: ['50%', '60%'],
                 data:[
                     ...chartData
                 ],
                 itemStyle: {
                     emphasis: {
                         shadowBlur: 10,
                         shadowOffsetX: 0,
                         shadowColor: 'rgba(0, 0, 0, 0.5)'
                     }
                 }
              }
        ]
     }
     return option

    },
    initOption_age() {
       let data = this.charts_data.age_distributions || [
                {value:0, item:'aaa'},
                {value:0, item:'bbb'},
                {value:0, item:'ccc'},
                {value:0, item:'ddd'},
                {value:0, item:'eee'}
            ]
      let chartsData = []
      for(let i=0; i<5; i++){
        chartsData.push(data[i].value)
      }
      let option = {
                   tooltip : {
                       trigger: 'item',
                       formatter: "{a} <br/>{b}岁 : {c}人"
                   },
                   xAxis: {
                       type: 'category',
                       data: ['<=23', '24-29', '30-35', '36-41', '>=42']
                   },
                   yAxis: {
                       type: 'value'
                   },
                   series: [{
                       name: '年龄分布',
                       data: chartsData,
                       type: 'bar',
                       itemStyle:{
                           normal:{
                               color: function(params) {
                              // build a color map as your need.
                                  var colorList = [
                                    '#B5C334','#FCCE10','#E87C25','#27727B',
                                     '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                     '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                  ];
                                  return colorList[params.dataIndex]
                           }
                       }
                       }
                   }]
                  }
      return option
    },
    initOption_activity() {
      let data = this.charts_data.active_days_distributions || [
                {value:0, item:'aaa'},
                {value:0, item:'bbb'},
                {value:0, item:'ccc'},
                {value:0, item:'ddd'}
            ]
      let chartsData = []
      for(let i=0; i<4; i++){
        chartsData.push(data[i].value)
      }
      let option = {
                   tooltip : {
                                  trigger: 'item',
                                  formatter: "{a} <br/>{b}天 : {c}人"
                              },
                   xAxis: {
                       type: 'category',
                       data: ['0-4', '5-12', '13-20', '21-31']
                   },
                   yAxis: {
                       type: 'value'
                   },
                   series: [{
                       name: '活跃天数分布',
                       data: chartsData,
                       type: 'bar',
                       itemStyle:{
                           normal:{
                               color: function(params) {
                              // build a color map as your need.
                                  var colorList = [
                                     '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                  ];
                                  return colorList[params.dataIndex]
                           }
                       }
                       }
                   }]
                  }
      return option
    }
  },
  watch: {
    charts_data(newValue) {
      //更新地区分布图
      let mychart_geo = ecahrts.init(document.getElementById('chart_geography'));
      mychart_geo.setOption(this.initOption_geo())

      //更新年龄分布图
      let mychart_age = ecahrts.init(document.getElementById('chart_age'));
       mychart_age.setOption(this.initOption_age())

      //更新活跃天数分布图
      let mychart_activity = ecahrts.init(document.getElementById('chart_activity'));
       mychart_activity.setOption(this.initOption_activity())
      
    }
  },
  mounted() {
    //基于准备好的dom，初始化echarts实例
    let mychart_geo = ecahrts.init(document.getElementById('chart_geography'));
     mychart_geo.setOption(this.initOption_geo());

    //基于准备好的dom，初始化echarts实例
    let mychart_age = ecahrts.init(document.getElementById('chart_age'));
     mychart_age.setOption(this.initOption_age())

    //基于准备好的dom，初始化echarts实例
    let mychart_activity = ecahrts.init(document.getElementById('chart_activity'));
     mychart_activity.setOption(this.initOption_activity())
  }
}
</script>

<style lang="scss" scoped>
.main_charts {
  margin-top: 40px;
  width: 100%;

  .headline {
    display: flex;
    justify-content: space-between;
    width: 670px;
  }

  .title {
    font-size: 20px;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .charts{
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
 
    #chart_geography {
      width: 530px;
      height: 270px;
    }
    #chart_age {
      width: 500px;
      height: 270px;
    }

    #chart_activity {
      width: 500px;
      height: 350px;
    }

    .activity {
      margin-top: 50px;
    }



  }

 
}
  
</style>

