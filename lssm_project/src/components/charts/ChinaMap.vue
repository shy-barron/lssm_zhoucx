<template>
  <section class='map-china'>
    <div class='chart-container' :id='containerId'></div>
  </section>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import API from '../../assets/js/api'
import axios from 'axios'
let echartInstance

export default {
  name: 'ChinaMap',
  data () {
    let data = {}
    // 取数字段
    data.dataColumn = 'orderAmount'
    // 容器的id
    data.containerId = _.uniqueId('map-china')
    // 显示icon的项目数
    data.showIconCount = 10
    // 坐标偏移量
    data.coordOffset = 1
    // 最大的图标尺寸
    data.maxSymbolSize = window.lib.rem2px(0.112)
    // 最小的图标尺寸
    data.minSymbolSize = 5
    // 最大的项目金额
    data.maxProjectAmount = 1
    return data
  },
  computed: {
    // 当前项目阶段索引
    projectIndex () {
      return this.$store.state.currentProjectIndex
    }
  },
  created () {
    this.loadData()
  },
  watch: {
    // 项目阶段变化重新加载渲染
    projectIndex (newVal) {
      this.loadData()
    }
  },
  methods: {
    // 加载数据
    loadData () {
      axios.post(API.map, {
        'period': this.$store.state.currentPeriod,
        'user': this.$store.state.user,
        'country': this.$store.state.currentCountry,
        'projectStatus': this.$store.getters.getMapList[this.projectIndex].datavalue
      }).then(response => {
        let mapData = response.data.data
        this.dataColumn = 'orderAmount'
        if (mapData[0].orderAmount === null || mapData[0].orderAmount === 0) {
          this.dataColumn = 'orderQty'
        }
        this.maxProjectAmount = mapData[0][this.dataColumn]
        this.$nextTick(() => {
          let echartDom = document.getElementById(this.containerId)
          if (!echartDom) {
            return false
          }
          echartInstance = echarts.getInstanceByDom(echartDom)
          // console.log('echartInstance', echartInstance)
          if (!echartInstance) {
            echartInstance = echarts.init(echartDom)
          } else {
            // 清除上一次的数据
            echartInstance.clear()
          }
          echartInstance.setOption(this.accessMapData(mapData), true)
        })
      }).catch(error => {
        console.error(error)
      })
    },
    // 处理地图数据
    accessMapData (mapData) {
      if (mapData.length <= 0) {
        return false
      }
      let option = {
        geo: {
          map: 'china', // 地图类型
          zoom: 1.25,
          aspectScale: 0.75,
          itemStyle: {
            normal: {
              color: '#001432',
              borderColor: '#0076f4',
              borderWidth: 1
            },
            emphasis: {
              color: '#001432'
            }
          },
          label: {
            emphasis: {
              show: false
            }
          }
        },
        series: [
        ]
      }
      let effectScatterList = mapData.slice(0, this.showIconCount)
      let scatterList = mapData.slice(this.showIconCount)

      // // 非 top5
      let projectSeries = {
        name: '非top金额项目',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: []
      }
      for (let item of scatterList) {
        let offset = Math.random() < 0.5 ? -this.coordOffset : this.coordOffset
        let symbolSize = this.maxSymbolSize * item[this.dataColumn] / this.maxProjectAmount
        symbolSize = symbolSize < this.minSymbolSize ? this.minSymbolSize : symbolSize

        projectSeries.data.push({
          name: item.projectName,
          itemStyle: {
            normal: {
              color: this.$store.getters.getGroupConfig(item.grop).color,
              opacity: 1
            },
            emphasis: {
              color: this.$store.getters.getGroupConfig(item.grop).color,
              opacity: 1
            }
          },
          symbolSize: [symbolSize, symbolSize],
          symbol: this.projectIndex === 0 || this.projectIndex === 1
            ? 'image://' + this.$store.getters.getGroupConfig(item.grop).icon : 'circle',
          value: [parseFloat(item.lon) + Math.random() * offset,
            parseFloat(item.lat) + Math.random() * offset,
            item[this.dataColumn]]
        })
      }
      option.series.push(projectSeries)

      // Top 5
      let topProjectSeries = {
        name: 'top金额项目',
        type: this.projectIndex === 0 || this.projectIndex === 1 ? 'scatter' : 'effectScatter',
        coordinateSystem: 'geo',
        data: []
      }
      for (let item of effectScatterList) {
        let offset = Math.random() < 0.5 ? -this.coordOffset : this.coordOffset
        let symbolSize = this.maxSymbolSize * item[this.dataColumn] / this.maxProjectAmount
        symbolSize = symbolSize < this.minSymbolSize ? this.minSymbolSize : symbolSize

        topProjectSeries.data.push({
          name: item.projectName,
          symbolSize: [symbolSize, symbolSize],
          symbol: 'image://' + this.$store.getters.getGroupConfig(item.grop).icon,
          value: [parseFloat(item.lon) + Math.random() * offset,
            parseFloat(item.lat) + Math.random() * offset,
            item[this.dataColumn]]
        })
      }
      option.series.push(topProjectSeries)
      return option
    }
  },
  beforeDestroy () {
    // let echartInstance = echarts.getInstanceByDom(document.getElementById(this.containerId))
    if (echartInstance) {
      echartInstance.clear()
      echarts.dispose(echartInstance)
      // console.log('释放echarts实例: ', this.china)
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/scss/rem.scss';
  .map-china {
    position: relative;
    width: 100%;
    height: px2vh(1499);

    .chart-container {
      height: 100%;
      width: 100%;
    }

    .tooltip {
      position:  absolute;
      color: #fff;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
    }
  }
</style>
