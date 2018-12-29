<template>
  <div class="table-quantity">
    <div class="table-header">
      <p>全国风场场海陆数量对比</p>
      <ul>
        <li v-for="(item, index) in itemList" :key="index">
          <span :style="'background:' + item.color "></span>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="echart">
      <div class="echart-container" :id='echartId'></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
import axios from 'axios'
import {wind} from '../../assets/js/api'

let echartInstance

export default {
  name: 'QuantityTable',
  data () {
    return {
      itemList: [
        {
          color: '#1AECFE',
          name: '已建'
        },
        {
          color: '#4982FF',
          name: '在建'
        }
      ],
      // chartData: [{
      //   'seaLand': 'land',
      //   'wfCount': 0,
      //   'cpWfCount': 0
      // },
      // {
      //   'seaLand': 'sea',
      //   'wfCount': 0,
      //   'cpWfCount': 0
      // }],
      echartId: _.uniqueId('chart-bar')
    }
  },
  computed: {
    chartData () {
      return this.$store.state.wind.seaLandData
    }
  },
  watch: {
    chartData () {
      this.render()
    }
  },
  created () {
    // 获取接口数据
    axios.post(wind.getAnalysisBySealand).then(response => {
      const result = response.data
      console.log('全国海陆风场信息', result)
      if (parseInt(result.code) === 1) {
        this.$store.commit('wind/setSeaLandData', result.data)
        // this.chartData = result.data
      }
    }).catch(error => {
      console.error(error)
    })
  },
  mounted () {
    this.render()
  },
  methods: {
    render () {
      if (!echartInstance) {
        let echartDom = document.getElementById(this.echartId)
        if (!echartDom) {
          return false
        } else {
          echartInstance = echarts.init(echartDom)
        }
      }
      echartInstance.setOption(this.getOption(), true)
    },
    getOption () {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['陆上', '海上'],
          show: false
        },
        grid: {
          left: '3%',
          right: '5%',
          // bottom: '3%',
          top: '3%',
          containLabel: true
        },
        animation: true,
        animationDuration: function (idx) {
          // 越往后的数据延迟越大
          return idx * 500
        },
        animationDelay: function (idx) {
          // 越往后的数据延迟越大
          return idx * 500
        },
        animationDurationUpdate: function (idx) {
          // 越往后的数据延迟越大
          return idx * 100
        },
        animationDelayUpdate: function (idx) {
          // 越往后的数据延迟越大
          return idx * 100
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#616c82'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(50,157,248,0.5)'
            }
          },
          axisLabel: {
            show: true,
            formatter: '{value}',
            interval: 0,
            margin: 10,
            textStyle: {
              color: '#b8bac1'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              show: true,
              color: '#616c82'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#b8bac1'
            }
          },
          axisTick: {
            show: false
          },
          data: ['海上', '陆上']
        },
        series: [
          {
            name: '已建',
            type: 'bar',
            stack: '总量',
            barWidth: window.lib.vh2px(2.13),
            label: {
              normal: {
                color: '#fff',
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle: {
              color: '#1AECFE'
            },
            // barWidth: window.lib.rem2px(0.2),
            data: [
              this.chartData[0].wfCount - this.chartData[0].cpWfCount,
              this.chartData[1].wfCount - this.chartData[1].cpWfCount
            ]
          },
          {
            name: '在建',
            type: 'bar',
            stack: '总量',
            barWidth: window.lib.vh2px(3.13),
            label: {
              normal: {
                color: '#fff',
                show: true,
                position: 'right'
              }
            },
            itemStyle: {
              color: '#4982FF'
            },
            data: [
              this.chartData[0].cpWfCount,
              this.chartData[1].cpWfCount
            ]
          }
        ]
      }
      return option
    }
  },
  // 销毁回收资源
  beforeDestroy () {
    if (echartInstance) {
      // 清空数据
      echartInstance.clear()
      // 销毁实例
      echartInstance.dispose(echartInstance)
      echartInstance = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
.table-quantity {
  width: 100%;
  height: 100%;

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: px2rem(40);
    padding:px2vh(30) px2rem(30);
    color: #fff;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(30);
      li {
        padding-left: px2rem(84);
        span:first-child {
          display: inline-block;
          width: px2rem(27);
          height: px2rem(27);
          margin-right: px2rem(24);
        }
      }
    }
  }

  .echart {
     width: 100%;
     height: 100%;
    .echart-container {
       width: 100%;
       height: 100%;
    }
  }
}
</style>
