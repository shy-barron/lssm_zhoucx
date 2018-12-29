<template>
  <div class="china-charts">
    <div class="chart-grid" :id="id"></div>
    <div class="title-project">
      <ul v-for="(item, index) in projectList" :key="index">
        <li v-for="(ite, s) in item" :key="s">
          <i :style="'backgroundColor:' + ite.color"></i>
          <span>{{ite.stage}}</span>
        </li>
      </ul>
    </div>
    <div class="order-instruct">注：{{instruct}}</div>
  </div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  name: 'ChinaChart',
  props: {
    slat: {
      type: String,
      default: 'DX'
    }
  },
  data () {
    return {
      id: _.uniqueId('china'),
      echartInstance: undefined, // option容器
      instruct: '数据来源于上海电气SAP系统', // 注释内容
      projectList: [], // 项目颜色标识
      timeOut: 0, // 地图跳转时间，
      timeId: undefined, // 定时器
      proList: [], // 项目数据
      saleList: [], // 订单数据
      option: {
        geo: {
          show: true,
          map: 'china',
          label: {
            emphasis: {
              show: false
            },
            normal: {
              show: false
            }
          },
          layoutCenter: ['center', 'center'],
          layoutSize: '129%',
          roam: true,
          itemStyle: {
            normal: {
              areaColor: 'rgba(1, 19, 51, 0.8)',
              borderColor: 'rgba(0, 116, 253, 0.8)'
            },
            emphasis: {
              areaColor: 'rgba(11, 55, 119, 0.8)'
            }
          },
          silent: true,
          regions: [
            {name: '南海诸岛', value: 0, itemStyle: {normal: {opacity: 0, label: {show: false}}}}
          ]
        },
        animationDuration: function (idx) {
          // 越往后的数据延迟越大
          return 2000
        },
        animationDelay: function (idx) {
          // 越往后的数据延迟越大
          return 10
        },
        // animationDurationUpdate: function (idx) {
        //   // 越往后的数据延迟越大
        //   return idx * 200
        // },
        // animationDelayUpdate: function (idx) {
        //   // 越往后的数据延迟越大
        //   return idx * 200
        // },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: window.lib.rem2px(0.07),
            data: [
              // {
              //   value: [102.188043, 38.520089],
              //   itemStyle: {
              //     color: '#5ed327'
              //   }
              // },
              // {
              //   value: [101.718637, 26.582347],
              //   itemStyle: {
              //     color: '#00a3ff'
              //   }
              // }
            ]
          }
        ]
      }
    }
  },
  methods: {
    dealSingleData () {
      this.projectList = []
      if (this.mapList.length !== 0) {
        this.projectList.push(this.arrayUnipue(this.mapList, ['stage', 'color']))
        let scatterList = []
        for (let s in this.mapList) {
          scatterList.push({
            value: [this.mapList[s].long, this.mapList[s].lat],
            itemStyle: {
              color: this.mapList[s].color
            }
          })
        }
        this.option.series[0].data = scatterList
        this.render()
      }
    },
    dealData () {
      // console.log('mapList', this.mapList)
      if (this.mapList.length !== 0) {
        this.projectList = []
        for (let s in this.mapList) {
          this.projectList.push(this.arrayUnipue(this.mapList[s].list, ['stage', 'color']))
          if (this.mapList[s].flag && parseInt(this.mapList[s].flag) === 1) {
            this.timeOut = this.mapList[s].time
            this.proList = this.mapList[s]
          } else {
            this.saleList = this.mapList[s]
          }
        }
        let scatterList = []
        for (var k in this.proList.list) {
          scatterList.push({
            value: [this.proList.list[k].long, this.proList.list[k].lat],
            itemStyle: {
              color: this.proList.list[k].color
            }
          })
        }
        // console.log('项目数据', scatterList)
        this.instruct = this.proList.comment
        this.option.series[0].data = scatterList
        this.render()
        console.log('this.time', new Date())
        this.$store.commit('world/updatedActiveIndex', 0)
        if (this.timeId) {
          clearInterval(this.timeId)
        }
        let m = 0
        this.timeId = setInterval(() => {
          scatterList = []
          if (m === 0) {
            for (var t in this.saleList.list) {
              scatterList.push({
                value: [this.saleList.list[t].long, this.saleList.list[t].lat],
                itemStyle: {
                  color: this.saleList.list[t].color
                }
              })
            }
            this.instruct = this.saleList.comment
            this.option.series[0].data = scatterList
            this.render()
            // console.log('this.time', new Date())
            this.$store.commit('world/updatedActiveIndex', 1)
            ++m
          } else {
            for (var k in this.proList.list) {
              scatterList.push({
                value: [this.proList.list[k].long, this.proList.list[k].lat],
                itemStyle: {
                  color: this.proList.list[k].color
                }
              })
            }
            m = 0
            this.instruct = this.proList.comment
            this.option.series[0].data = scatterList
            this.render()
            this.$store.commit('world/updatedActiveIndex', 0)
          }
        }, this.timeOut)
      }
    },
    obj2key (obj, keys) {
      let n = keys.length
      let key = []
      while (n--) {
        key.push(obj[keys[n]])
      }
      return key.join('|')
    },
    arrayUnipue (array, keys) {
      let hash = {}
      let arr = []
      for (var i = 0, j = array.length; i < j; i++) {
        var k = this.obj2key(array[i], keys)
        if (!(k in hash)) {
          hash[k] = true
          arr.push(array[i])
        }
      }
      return arr
      // return arr.reduce(function (item, next) {
      //   hash[next[name]] ? '' : hash[next[name]] = true && item.push(next)
      //   return item
      // }, [])
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
  computed: {
    mapList () {
      return this.$store.state.world.mapList
    }
  },
  watch: {
    mapList () {
      if (this.slat === 'SM') {
        this.dealSingleData()
      } else {
        this.dealData()
      }
    }
  },
  mounted () {
    if (this.slat === 'SM') {
      this.dealSingleData()
    } else {
      this.dealData()
    }
    // this.render()
  },
  // beforeDestroy () {
  //   if (this.timeId) {
  //     clearInterval(this.timeId)
  //   }
  // },
  beforeDestroy () {
    this.$store.commit('world/updatedActiveIndex', 3)
    this.$store.commit('world/updatedMapList', [])
    if (this.echartInstance) {
      // 清空数据
      this.echartInstance.clear()
      // 销毁实例
      this.echartInstance.dispose(this.echartInstance)
      this.option = undefined
      this.echartInstance = undefined
    }
    if (this.timeId) {
      clearInterval(this.timeId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.china-charts {
  position: relative;
  width: 100%;
  height: 100%;

  .chart-grid {
    width: 100%;
    height: 100%;
  }

  .title-project {
    position: absolute;
    bottom: px2vh(42);
    left: px2rem(85);
    display: flex;
    justify-content: space-between;
    font-size: px2rem(40);
    ul {
      // padding: px2rem(40);
      margin-right: px2rem(40);
      li {
        padding: px2vh(30) 0;
      }
      i {
        display: inline-block;
        width: px2rem(30);
        height: px2rem(30);
        border-radius: 50%;
        margin-right: px2rem(35);
        // background: blueviolet;
      }
    }
  }

  .order-instruct {
    position: absolute;
    right: px2rem(-700);
    bottom: px2vh(-340);
    font-size: px2rem(40);
    // color: #89a2cb;
    // font-size: px2rem(36);
    font-size: 0.08929rem;
    color: #586d8f;
  }
}
</style>
