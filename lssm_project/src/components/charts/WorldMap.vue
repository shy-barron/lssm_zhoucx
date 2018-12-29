<template>
  <section class='map-china'>
    <div class='chart-container' :id='containerId'></div>
  </section>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
import 'echarts/map/js/world.js'
import API from '../../assets/js/api'
import axios from 'axios'
let echartInstance

export default {
  name: 'WorldMap',
  data () {
    let data = {}
    data.dataColumn = 'orderAmount'
    data.containerId = _.uniqueId('map-world')
    data.showIconCount = 10
    data.coordOffset = 1
    data.maxSymbolSize = window.lib.rem2px(0.112)
    data.minSymbolSize = 5
    data.maxProjectAmount = 1
    return data
  },
  computed: {
    projectIndex () {
      return this.$store.state.currentProjectIndex
    }
  },
  created () {
    // console.log('world map created', echarts.getInstanceByDom(document.getElementById(this.containerId)))
    this.loadData()
  },
  watch: {
    projectIndex () {
      // this.resetData()
      this.loadData()
    }
  },
  methods: {
    loadData () {
      // console.log('projectIndex', this.projectIndex)
      axios.post(API.map, {
        'period': '20170101',
        'user': 'demo1',
        'projectStatus': this.$store.getters.getMapList[this.projectIndex].datavalue,
        'country': this.$store.state.currentCountry
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
    accessMapData (mapData) {
      if (mapData.length <= 0) {
        return false
      }
      let option = {
        geo: {
          map: 'world', // 地图类型
          zoom: 1.18,
          aspectScale: 0.75,
          itemStyle: {
            normal: {
              color: '#011332',
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
          {
            type: 'map',
            geoIndex: 0,
            data: [{
              name: 'China',
              itemStyle: {
                normal: {
                  color: '#0b3877'
                },
                emphasis: {
                  color: '#0b3877'
                }
              }
            }]
          }
        ]
      }
      let effectScatterList = mapData.slice(0, this.showIconCount)
      let scatterList = mapData.slice(this.showIconCount)

      // 非 top5
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
.map-china {
  position: relative;
  width: 100%;
  height: 100%;

  .chart-container {
    height: 100%;
    width: 100%;
  }
}
</style>
