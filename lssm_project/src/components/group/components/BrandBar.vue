<template>
  <div class="container-brand-bar">
    <div class="header-title">
      <div class="title">
        <ul>
          <li class="title-logo" :class="{'logo1': Number(barList.flag) === 1, 'logo2': Number(barList.flag) === 2, 'logo3': Number(barList.flag) === 3, 'logo4': Number(barList.flag) === 4}"></li>
          <li class="title-head" :style="'color:' + barList.color">{{barList.title}}</li>
          <li class="title-sales">
            <span>{{barList.sale || '--'}}</span><span>{{barList.slx}}</span>
          </li>
        </ul>
      </div>
      <div class="sales">
        单位： {{barList.slx}}
      </div>
    </div>
    <div class="graid-bar">
      <div class="container-bar" :id="id"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'

export default {
  name: 'BrandBar',
  props: {
    barList: {
      type: Object,
      default: function () {
        return {
          color: '#1f79f1',
          title: '营业收入',
          sale: 0,
          slx: '亿元',
          flag: 1,
          list: []
        }
      }
    }
  },
  data () {
    return {
      id: _.uniqueId('bar'),
      echartInstance: undefined,
      option: {
        grid: {
          left: '0',
          right: '0',
          top: '13%',
          bottom: '0',
          containLabel: true
        },
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
            color: '#576b8e'
          },
          axisLabel: {
            color: '#869fc9',
            interval: 0,
            fontSize: window.lib.rem2px(0.089)
          }
        },
        yAxis: [
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
        ],
        series: [
          {
            type: 'bar',
            name: '',
            yAxisIndex: 0,
            barWidth: window.lib.rem2px(0.234),
            label: {
              show: true,
              position: 'top',
              padding: window.lib.rem2px(0.0418),
              color: '#fff',
              fontSize: window.lib.rem2px(0.1),
              formatter: '{c}'
            },
            itemStyle: {
              color: '#5ed328'
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    barList () {
      this.dealData()
    }
  },
  methods: {
    dealData () {
      if (this.barList && this.barList.list.length !== 0) {
        let xAxisData = []
        let seriesData = []
        for (let item of this.barList.list) {
          xAxisData.push(item.stage)
          seriesData.push(item.amount)
        }
        this.option.xAxis.data = xAxisData
        this.option.series[0].data = seriesData
        this.option.series[0].itemStyle.color = this.barList.color
        console.log('option', this.option)
        this.render()
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
        this.echartInstance.setOption(this.option)
      }
    }
  },
  mounted () {
    this.dealData()
    // this.render()
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

<style lang='scss' scoped>
@import '../../../assets/scss/rem.scss';
@font-face {
  font-family: ds digital;
  src: url('../../../assets/fonts/DS-DIGI.TTF');
}
.container-brand-bar {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 0 px2rem(75) px2vh(77) px2rem(75);

  .header-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: px2vh(80);
    .title {
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
         .logo1 {
           background-image: url('../../../assets/img/group/dq_logo3.png');
         }
         .logo2 {
           background-image: url('../../../assets/img/group/dq_logo2.png');
         }
         .logo3 {
           background-image: url('../../../assets/img/group/dq_logo4.png');
         }
         .logo4 {
           background-image: url('../../../assets/img/group/dq_logo1.png');
         }
         li {
           margin-right: px2rem(45);
         }

         .title-logo {
           width: px2rem(119);
           height: px2vh(105);
           background-size: 100% 100%;
           background-position: center center;
           background-repeat: no-repeat;
         }
         .title-head {
           font-size: px2rem(60);
           color: #1f79f1;
           font-weight: bold;
           padding-top: px2vh(23);
         }
        .title-sales {
          span:first-child {
            font-family: ds digital;
            font-size: px2rem(100);
          }
          span:last-child {
            font-size: px2rem(40);
          }
        }
      }
    }

    .sales {
      font-size: px2rem(36);
      padding-bottom: px2vh(16);
      color: #576b8e;
    }
  }

  .graid-bar {
    width: 100%;
    height: 78%;
    .container-bar {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
