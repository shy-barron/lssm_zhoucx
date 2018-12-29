<template>
  <div class="order-line">
    <div class="title-header">
      海外新接订单占比
    </div>
    <div class="line-container" :id="id"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
export default {
  name: 'OrderLine',
  data () {
    return {
      id: _.uniqueId('line'),
      echartInstance: undefined,
      timeId: null, // 定时器
      ManyTime: 0, // 定时时间
      worldList: {},
      areaList: {},
      flag: false,
      readuce: [], // 求和数据
      option: {
        // color: ['#24c603', '#0aa3fe'],
        legend: {
          itemGap: 20,
          data: ['全球订单', '海外订单'],
          top: window.lib.rem2px(0.189),
          // itemWidth: 20,
          // itemHeight: 20,
          textStyle: {
            color: '#869fc9',
            fontSize: window.lib.rem2px(0.11)
          }
        },
        grid: {
          top: '25%',
          left: '3%',
          right: '3%',
          containLabel: true
        },
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
            fontSize: window.lib.rem2px(0.11)
          }
        },
        yAxis: [
          // {
          //   type: 'value',
          //   splitLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLine: {
          //     show: false
          //   },
          //   axisLabel: {
          //     show: false
          //   }
          // }
        ],
        series: [
          {
            type: 'line',
            name: '全球订单',
            symbolSize: 12,
            symbol: 'circle',
            yAxisIndex: 0,
            label: {
              show: true,
              position: 'top',
              padding: window.lib.rem2px(0.0418),
              color: '#fff',
              fontSize: window.lib.rem2px(0.11),
              formatter: '{c}亿元'
            },
            itemStyle: {
              // color: '#24c603'
            },
            lineStyle: {
              // color: '#24c603',
              width: window.lib.rem2px(0.0139)
            },
            areaStyle: {
              // normal: {
              //   color: {
              //     type: 'linear',
              //     x: 0,
              //     y: 0,
              //     x2: 0,
              //     y2: 1,
              //     colorStops: [{
              //       offset: 0, color: 'rgba(36, 198, 3, .6)' // 0% 处的颜色
              //     }, {
              //       offset: 1, color: 'rgba(36, 198, 3, 0)' // 100% 处的颜色
              //     }],
              //     globalCoord: false // 缺省为 false
              //   }
              // }
            },
            data: []
          },
          {
            type: 'line',
            name: '海外订单',
            symbolSize: 12,
            symbol: 'circle',
            yAxisIndex: 0,
            label: {
              show: true,
              position: 'top',
              padding: window.lib.rem2px(0.0418),
              color: '#fff',
              fontSize: window.lib.rem2px(0.11)
              // formatter: '{c}亿元'
            },
            itemStyle: {
              // color: '#0aa3fe'
            },
            lineStyle: {
              // color: '#0aa3fe',
              width: window.lib.rem2px(0.0139)
            },
            areaStyle: {
              // normal: {
              //   color: {
              //     type: 'linear',
              //     x: 0,
              //     y: 0,
              //     x2: 0,
              //     y2: 1,
              //     colorStops: [{
              //       offset: 0, color: 'rgba(10, 163, 254, .6)' // 0% 处的颜色
              //     }, {
              //       offset: 1, color: 'rgba(10, 163, 254, 0)' // 100% 处的颜色
              //     }],
              //     globalCoord: false // 缺省为 false
              //   }
              // }
            },
            data: []
          }
        ]
      }
    }
  },
  computed: {
    lineList () {
      return this.$store.state.group.lineList
    }
  },
  watch: {
    lineList () {
      this.getData()
    }
  },
  methods: {
    average (arr) {
      if (arr && arr.length !== 0) {
        let total = 0
        for (let m = 0; m < arr.length; m++) {
          total += parseInt(arr[m])
        }
        return total
      }
      // arr.reduce((acc, val) => acc + val, 0)
    },
    getData () {
      // console.log('折线数据', this.lineList)
      if (this.lineList.length !== 0) {
        this.flag = true
        for (var i in this.lineList) {
          if (this.lineList[i].legend === '全球') {
            this.ManyTime = this.lineList[i].roll_interval || 3000
            this.worldList = this.lineList[i]
          } else {
            this.areaList = this.lineList[i]
          }
        }
        let xAxisData = []
        let seriesData = []
        for (var s in this.worldList.data) {
          xAxisData.push(this.worldList.data[s].qtr_wid)
          seriesData.push(Number(this.worldList.data[s].amount).toFixed(2))
        }
        // 全球数据处理
        this.readuce = seriesData
        this.option.xAxis.data = xAxisData
        this.option.series[0].data = seriesData
        this.option.series[0].itemStyle.color = this.worldList.color
        this.option.series[0].lineStyle.color = this.worldList.color
        this.option.series[0].areaStyle = {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: this.worldList.grad_first // 0% 处的颜色
              }, {
                offset: 1, color: this.worldList.grad_end // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }
        // 处理定时器外第一次海外的数据
        this.option.series[1].itemStyle.color = this.areaList.color
        this.option.series[1].lineStyle.color = this.areaList.color
        this.option.series[1].areaStyle = {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: this.areaList.grad_first // 0% 处的颜色
              }, {
                offset: 1, color: this.areaList.grad_end // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }
        let areaData = []
        for (var o in this.areaList.data) {
          areaData.push(Number(this.areaList.data[o].amount).toFixed(2))
        }
        this.option.yAxis = [
          {
            type: 'value',
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
        // console.log('option', areaData)
        // this.readuce = this.average(areaData)
        this.option.series[1].data = areaData
        this.option.series[1].label.formatter = '{c}亿元'
        this.render()
        // 处理定时器切换数据
        if (this.timeId) {
          clearInterval(this.timeId)
        }
        let k = 0
        this.timeId = setInterval(() => {
          if (k === 0) {
            areaData = []
            for (var j in this.areaList.data) {
              areaData.push(this.areaList.data[j].rate * 100)
            }
            // this.option.yAxis = [
            //   {
            //     type: 'value',
            //     splitLine: {
            //       show: false
            //     },
            //     axisTick: {
            //       show: false
            //     },
            //     axisLine: {
            //       show: false
            //     },
            //     axisLabel: {
            //       show: false
            //     }
            //   },
            //   {
            //     type: 'value',
            //     splitLine: {
            //       show: false
            //     },
            //     axisTick: {
            //       show: false
            //     },
            //     axisLine: {
            //       show: false
            //     },
            //     axisLabel: {
            //       show: false
            //     }
            //   }
            // ]
            // this.option.series[1].yAxisIndex = 1
            // this.option.series[1].data = areaData
            this.option.series[1].label.formatter = (params) => {
              return Number(areaData[params.dataIndex]).toFixed(1) + '%'
            }
            this.render()
            ++k
          } else {
            areaData = []
            for (var n in this.areaList.data) {
              areaData.push(Number(this.areaList.data[n].amount).toFixed(2))
            }
            this.option.series[1].data = areaData
            this.option.series[1].label.formatter = '{c}亿元'
            this.render()
            k = 0
          }
        }, this.ManyTime)
        // this.option.series[1].data = areaData
        // console.log('option', this.option)
        // this.render()
      }
    },
    render () {
      if (!this.echartInstance) {
        let echartDom = document.getElementById(this.id)
        if (!echartDom) {
          return false
        } else {
          this.echartInstance = echarts.init(echartDom)
        }
      }
      this.echartInstance.setOption(this.option)
    }
  },
  mounted () {
    if (this.lineList) {
      this.getData()
    }
  },
  beforeDestroy () {
    if (this.timeId) {
      clearInterval(this.timeId)
    }
  },
  destroyed () {
    if (this.echartInstance) {
      // 清空数据
      this.echartInstance.clear()
      // 销毁实例
      this.echartInstance.dispose(this.echartInstance)
      this.option = undefined
      this.echartInstance = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.order-line {
  width: 100%;
  height: 100%;
  background: url('../../../assets/img/group/bg_order_bar_line.png') center center/ 100% 100% no-repeat;

  .title-header {
    height: px2vh(120);
    width: 100%;
    text-align: center;
    line-height: px2vh(120);
    font-size: px2rem(46);
    // color: #0076BA;
  }

  .line-container {
    width: 100%;
    height: 90%;
  }
}
</style>
