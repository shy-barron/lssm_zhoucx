<template>
  <div class="order-bar-line">
    <div class="title-header">
     {{title}}
    </div>
    <h3 style="text-align: center;" v-if="false">暂无数据</h3>
    <div class="line-container" :id="id"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
// import { group } from '../../../assets/js/api'
let echartInstance
export default {
  name: 'OrderBarLine',
  props: {
    title: {
      type: String,
      default: '产业集团新接订单分布'
    },
    typeLine: {
      type: String,
      default: 'new'
    }
  },
  data () {
    return {
      id: _.uniqueId('line'),
      flag: false,
      option: {
        legend: {
          data: [],
          top: window.lib.rem2px(0.167),
          itemWidth: window.lib.rem2px(0.1),
          itemHeight: window.lib.rem2px(0.1),
          itemGap: window.lib.rem2px(0.15),
          textStyle: {
            color: '#869fc9',
            fontSize: window.lib.rem2px(0.11)
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          top: '20%',
          containLabel: true
        },
        animation: true,
        animationDuration: function (idx) {
          // 越往后的数据延迟越大
          return 3000
        },
        animationDelay: function (idx) {
          // 越往后的数据延迟越大
          return 10
        },
        // animationDurationUpdate: function (idx) {
        //   // 越往后的数据延迟越大
        //   return idx * 100
        // },
        // animationDelayUpdate: function (idx) {
        //   // 越往后的数据延迟越大
        //   return idx * 100
        // },
        xAxis: {
          type: 'category',
          show: true,
          data: [],
          axisPointer: {
            type: 'shadow'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            color: '#869fc9'
          },
          axisLabel: {
            color: '#869fc9',
            fontSize: window.lib.rem2px(0.1)
          }
        },
        yAxis: [
        ],
        series: [
          {
            type: 'bar',
            name: '',
            yAxisIndex: 0,
            barWidth: window.lib.rem2px(0.334),
            label: {
              show: true,
              position: 'top',
              padding: window.lib.rem2px(0.0418),
              color: '#fff',
              fontSize: window.lib.rem2px(0.1),
              formatter: '{c}亿元'
            },
            itemStyle: {
              // color: '#5ed328'
            },
            data: []
          },
          {
            type: 'line',
            name: '集团',
            symbol: 'circle',
            yAxisIndex: 0,
            label: {
              show: true,
              position: 'top',
              padding: window.lib.rem2px(0.0418),
              // color: '#fff',
              color: '#73FDEA',
              fontSize: window.lib.rem2px(0.1),
              formatter: '{c}%'
            },
            symbolSize: 12,
            itemStyle: {
              // color: '#5ed328'
            },
            lineStyle: {
              // color: '#73FDEA',
              width: window.lib.rem2px(0.0139)
            },
            data: [
            ]
          }
        ]
      }
    }
  },
  computed: {
    linebar () {
      // console.log('linebar', this.$store.state.group.linebar)
      return this.$store.state.group.linebar
    }
  },
  watch: {
    linebar () {
      // handler () {
      //   this.getData()
      // }
      // deep: true
      // console.log('watch linebar', this.linebar)
      this.getData()
    }
  },
  methods: {
    getData () {
      try {
        if (this.linebar.length !== 0) {
          let xAxisData = []
          let yAxisData = []
          let seriesData = []
          let lineData = []
          this.flag = true
          if (this.typeLine === 'new') {
            for (let i = 0; i < this.linebar.length; i++) {
              xAxisData.push(this.linebar[i].qtr_wid)
              seriesData.push(
                {value: Number(this.linebar[i].amount).toFixed(2),
                  itemStyle: {
                    normal: {
                      color: this.linebar[i].color
                    }
                  }}
              )
              lineData.push(Number(this.linebar[i].rate * 100).toFixed(0))
            }
            yAxisData = [
              {
                type: 'value',
                // axisLabel: {
                //   show: false,
                //   formatter: '{value}%'
                // },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                axisLabel: {
                  show: false
                }
              }
            ]
            this.option.yAxis = yAxisData
            this.option.series[0].data = seriesData
            this.option.series[1].data = lineData
            this.option.xAxis.data = xAxisData
            // this.option.series[0].yAxisIndex = 0
            this.option.series[0].itemStyle.color = this.linebar[0].color
            this.option.series[1].itemStyle.color = '#5ed328'
            // this.option.series[1].lineStyle.color = '#5ed328'
            this.option.series[1].lineStyle.color = '#73FDEA'
            this.option.series[1].name = '海外订单金额占比'
            this.option.series[0].name = '海外订单金额'
            this.option.legend.data = ['海外订单金额', '海外订单金额占比']
          } else {
            for (let k = 0; k < this.linebar.length; k++) {
              seriesData.push(
                {value: Number(this.linebar[k].amount).toFixed(2),
                  itemStyle: {
                    normal: {
                      color: this.linebar[k].color
                    }
                  }}
              )
              lineData.push(Number(this.linebar[k].rate * 100).toFixed(0))
              xAxisData.push(this.linebar[k].stage)
            }
            this.option.series[1].itemStyle.color = '#73FDEA'
            this.option.series[1].lineStyle.color = '#73FDEA'
            this.option.legend.data = ['同比增长']
            this.option.series[1].name = '同比增长'
            yAxisData = [
              {
                type: 'value',
                position: 'left',
                show: true,
                splitLine: {show: false},
                // boundaryGap: [0, 0.01],
                axisLine: {
                  lineStyle: {
                    color: '#13485d' // 坐标轴
                  }
                },
                axisLabel: {
                  fontSize: window.lib.rem2px(0.11),
                  color: '#fff' // 刻度盆上文字信息
                }
              },
              {
                type: 'value',
                position: 'right',
                splitLine: {show: false},
                show: true,
                axisLine: {
                  lineStyle: {
                    color: '#13485d' // 坐标轴
                  }
                },
                axisLabel: {
                  show: true,
                  formatter: val => val + '%',
                  fontSize: window.lib.rem2px(0.11),
                  color: '#fff' // 刻度盆上文字信息
                }
              }
            ]
            this.option.xAxis.data = xAxisData
            this.option.series[0].data = seriesData
            this.option.series[1].data = lineData
            this.option.series[1].yAxisIndex = 1
            // for (var b in yAxisData) {
            //   this.option.yAxis.push(yAxisData[b])
            // }
            this.option.yAxis = yAxisData
            // console.log('new', this.option.xAxis.data)
          }
          this.render()
        } else {
          this.flag = false
        }
      } catch (error) {
        console.error('error', error)
      }
    },
    render () {
      if (!echartInstance) {
        let echartDom = document.getElementById(this.id)
        if (!echartDom) {
          return false
        } else {
          echartInstance = echarts.init(echartDom)
        }
      }
      echartInstance.setOption(this.option)
    }
  },
  mounted () {
    // console.log('linebar', this.linebar)
    if (this.linebar.length !== 0) {
      this.getData()
    }
    // this.render()
  },
  beforeDestroy () {
    this.$store.commit('group/updatedLinebar', [])
    if (echartInstance) {
      // 清空数据
      echartInstance.clear()
      // 销毁实例
      echartInstance.dispose(echartInstance)
      this.option = undefined
      echartInstance = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.order-bar-line {
  width: 100%;
  height: 100%;
  background: url('../../../assets/img/group/bg_order_bar_line.png') center center/ 100% 100% no-repeat;

  .title-header {
    // color: #0076BA;
    height: px2vh(120);
    width: 100%;
    text-align: center;
    line-height: px2vh(120);
    font-size: px2rem(46);
  }

  .line-container {
    width: 100%;
    height: 90%;
  }
}
</style>
