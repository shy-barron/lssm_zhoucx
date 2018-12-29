<template>
  <div class="order-pie">
    <div class="title-header">
      产业集团在手订单分布
    </div>
    <div :id="id" class="pie-contianer">
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'

let echartInstance
export default {
  name: 'OrderPie',
  data () {
    return {
      id: _.uniqueId('pie'),
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          top: window.lib.rem2px(0.167),
          // itemGrap: window.lib.rem2px(0.416),
          textStyle: {
            color: '#869fc9',
            fontSize: window.lib.rem2px(0.11)
          },
          itemWidth: window.lib.rem2px(0.09),
          itemHeight: window.lib.rem2px(0.09),
          itemGap: window.lib.rem2px(0.15),
          data: []
        },
        animation: true,
        animationDuration: function (idx) {
          // 越往后的数据延迟越大
          return 2000
        },
        animationDelay: function (idx) {
          // 越往后的数据延迟越大
          return 10
        },
        series: [
          {
            type: 'pie',
            radius: ['35%', '55%'],
            center: ['50%', '57%'],
            avoidLabelOverlap: true,
            startAngle: 280,
            // animationDurationUpdate: function (idx) {
            //   // 越往后的数据延迟越大
            //   return idx * 400
            // },
            // animationDelayUpdate: function (idx) {
            //   // 越往后的数据延迟越大
            //   return idx * 400
            // },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: window.lib.rem2px(0.10),
                  // position: 'outside',
                  color: '#ddd',
                  formatter: function (params) {
                    return '{a|' + params.name + '}\n{b|' + params.value.toFixed(2) + '亿元 }{c|' + params.percent.toFixed(0) + '%}'
                  },
                  rich: {
                    a: {
                      fontSize: window.lib.rem2px(0.10),
                      padding: [3, 0],
                      color: '#869fc9'
                    },
                    c: {
                      color: '#fff',
                      align: 'center',
                      fontSize: window.lib.rem2px(0.10)
                    }
                  }
                }
              }
            },
            // label: {
            //   fontSize: window.lib.rem2px(0.10),
            //   color: '#fff',
            //   // color: '#869fc9',
            //   normal: {
            //     formatter: function (params) {
            //       // var total = 0 // 金额
            //       // var pecent = 0 // 占比
            //       // this.data.forEach((value, index, array) => {
            //       //   total += value.value
            //       // })
            //       // percent = ((params.value / total) * 100).toFixed(0)
            //       return '{a|' + params.name + '}\n{hr|}\n{b|' + params.value + '}{c|' + params.percent + '%}'
            //     }
            //   },
            //   rich: {
            //     a: {
            //       color: '#ddd',
            //       align: 'center',
            //       padding: [5, 0]
            //     }
            //   }
            // },
            labelLine: {
              normal: {
                length: window.lib.rem2px(0.110),
                length2: window.lib.rem2px(0.160),
                lineStyle: {
                  color: '#6d7789',
                  type: 'solid',
                  width: window.lib.rem2px(0.013)
                }
              }
            },
            color: [],
            data: []
          },
          {
            type: 'pie',
            radius: ['55%', '60%'],
            center: ['50%', '57%'],
            avoidLabelOverlap: false,
            startAngle: 280,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: false
            },
            data: [
              {
                value: 100,
                name: '数据',
                itemStyle: {
                  normal: {
                    color: '#0d2b5f'
                  }
                }
              }
            ]
          },
          {
            type: 'pie',
            radius: ['30%', '35%'],
            center: ['50%', '57%'],
            avoidLabelOverlap: false,
            startAngle: 280,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            tooltip: {
              show: false
            },
            data: [
              {
                value: 100,
                name: '数据',
                itemStyle: {
                  normal: {
                    color: '#0d2b5f'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    pieList () {
      return this.$store.state.group.pieList
    }
  },
  watch: {
    pieList () {
      this.getOption()
    }
  },
  methods: {
    getOption () {
      this.option.legend.data = []
      this.option.series[0].color = []
      this.option.series[0].data = []
      if (this.pieList.length !== 0) {
        for (let s in this.pieList) {
          this.option.legend.data.push(this.pieList[s].stage)
          this.option.series[0].color.push(this.pieList[s].color)
          this.option.series[0].data.push({name: this.pieList[s].stage, value: this.pieList[s].amount})
        }
        // this.option.series[0].label.formatter = function (params) {
        //   // let total = 0 // 总额
        //   // let unit = 0 // 百分比
        //   // console.log('饼图数据', params)
        //   // this.pieList.forEach((value, index, array) => {
        //   //   unit = ((params.value / total) * 100).toFixed(0)
        //   // return '{white|' + params.name + '}\n{hr|}\n{white|' + params.value + '}\n{white|' + params.percent + '%}'
        //   return '\n\n' + params.name + '\n' + params.value.toFixed(2) + '亿元 ' + params.percent.toFixed(0) + '%' + '\n'
        //   // })
        // }
        this.render()
      }
    },
    render () {
      // console.log('res.data.data', this.pieList)
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
    this.getOption()
  },
  // beforeDestroy () {
  //   this.option.legend.data = []
  //   this.option.series[0].color = []
  //   this.option.series[0].data = []
  // },
  destroyed () {
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
.order-pie {
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
  .pie-contianer {
    width: 100%;
    height: 90%;
  }
}
</style>
