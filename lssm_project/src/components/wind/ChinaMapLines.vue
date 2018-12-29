<template>
  <div class="china-map-lines">
     <div class='chart-container' :id='containerId'></div>
     <!-- 工期数据统计 -->
     <div class="chart-list">
       <ul>
         <li v-for="(item, index) in legendList[0]" :key="index">
           <i></i>
           <span>{{item}}</span>
         </li>
       </ul>
       <ul>
          <li v-for="(item, index) in legendList[1]" :key="index">
           <i></i>
           <span>{{item}}</span>
         </li>
       </ul>
     </div>
     <div class="chart-area-color">
       <ul class="chart-land">
         <li v-for="(item, index) in landColor" :key="index"  v-if="item.color !== null">
           <i :style="'backgroundColor:' + item.color"></i>
           <div>{{item.name}}</div>
         </li>
       </ul>
       <ul class="chart-area">
         <li v-for="(item, index) in seaColor" :key="index">
           <span :style="'borderColor:' + item.color"></span>
           <div>{{item.name}}</div>
         </li>
       </ul>
     </div>
  </div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
import axios from 'axios'
import { wind } from '../../assets/js/api'
import { color2Rgba } from '../../assets/js/weapon'
// 引入中国城市地图数据
import ChinaCityMap from '../../assets/json/map-china-city.json'
// 引入icon
import landIcon from '../../assets/img/project-line.png' // 陆地工程期icon
import seaIcon from '../../assets/img/project-area.png' // 海上工程期icon
// 备用分区颜色
let areaColorList = ['#0f3680', '#072a67', '#0c2550', '#051b43', '#0b285b']
// 备用泡泡颜色
let bubbleColorList = ['#5cbf43', '#2fdfd8', '#fca163', '#ab9afd', '#c239e2']

// 注册中国城市地图
echarts.registerMap('china-city', ChinaCityMap)
// echarts 实例
let echartInstance

export default {
  name: 'ChinaMapLines',
  data () {
    let data = {}
    data.landColor = [] // 地域颜色标识
    data.seaColor = [] // 海上颜色标识
    // 容器的id
    data.containerId = _.uniqueId('map-china')
    // echarts option
    data.option = {
      // geo组件，渲染基础地图
      geo: [{
        map: 'china-city', // 地图类型
        zoom: 1.25,
        aspectScale: 0.75,
        itemStyle: {
          normal: {
            // color: '#001432',
            color: 'transparent',
            // borderColor: '#0076f4',
            borderColor: '#0a4780',
            borderWidth: 1
          },
          emphasis: {
            // color: '#001432'
            color: 'transparent'
          }
        },
        label: {
          emphasis: {
            show: false
          }
        }
      }],
      animationDuration: function (idx) {
        // 越往后的数据延迟越大
        return 1000
      },
      animationDelay: function (idx) {
        // 越往后的数据延迟越大
        return 1000
      },
      // animationDurationUpdate: function (idx) {
      //   // 越往后的数据延迟越大
      //   return idx * 100
      // },
      // animationDelayUpdate: function (idx) {
      //   // 越往后的数据延迟越大
      //   return idx * 100
      // },
      // 数据系列
      series: [
        // 分区
        {
          type: 'map',
          geoIndex: 0,
          data: []
        },
        // 泡泡
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            period: 8,
            brushType: 'stroke',
            scale: 2
          },
          animationDuration: function (idx) {
            // 越往后的数据延迟越大
            return 2000
          },
          animationDelay: function (idx) {
            // 越往后的数据延迟越大
            return 10
          },
          label: {
            show: true,
            fontSize: window.lib.rem2px(0.106),
            formatter: (params) => {
              return params.name.slice(0, 2) + '\n' + params.name.slice(2)
            }
          },
          symbolSize: window.lib.rem2px(0.29),
          data: [
          ]
        },
        // 线
        {
          type: 'lines',
          coordinateSystem: 'geo',
          effect: {
            show: false,
            period: 6,
            symbolSize: 10,
            trailLength: 0.7,
            color: '#877bd8'
          },
          // symbol: 'circle',
          // symbolSize: '15',
          lineStyle: {
            width: window.lib.rem2px(0.015),
            type: 'dashed'
          },
          data: [
            // {
            //   coords: [
            //     [111.07642, 20.3518],
            //     [111.07642, 21.22]
            //   ],
            //   lineStyle: {
            //     color: '#90E0E3',
            //     curveness: 0.2
            //   }
            // },
            // {
            //   coords: [
            //     [121.48, 25.22],
            //     [111.07642, 20.3518]
            //   ],
            //   lineStyle: {
            //     color: '#90E0E3',
            //     curveness: 0.2
            //   }
            // },
            // {
            //   coords: [
            //     [120.48, 26.22],
            //     [121.48, 25.22]
            //   ],
            //   lineStyle: {
            //     color: '#90E0E3',
            //     curveness: 0.2
            //   }
            // },
            // {
            //   coords: [
            //     [120.48, 26.22],
            //     [111.07642, 21.22]
            //   ],
            //   lineStyle: {
            //     color: '#90E0E3',
            //     curveness: 0.2
            //   }
            // }
          ]
        },
        // 线的终点
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 15,
          data: []
        }
      ]
    }
    return data
  },
  computed: {
    legendList () {
      return [
        [
          '陆上' + this.$store.state.wind.seaLandData[1].wfCount + '个',
          '陆上工程期' + this.$store.state.wind.seaLandData[1].cpWfCount + '个'
        ],
        [
          '海上' + this.$store.state.wind.seaLandData[0].wfCount + '个',
          '海上工程期' + this.$store.state.wind.seaLandData[0].cpWfCount + '个'
        ]
      ]
    }
  },
  created () {
    // if (JSON.parse(this.cacheData.get(wind.getAreaCities))) {
    //   this.getAreaCities(JSON.parse(this.cacheData.get(wind.getAreaCities)))
    // } else if (JSON.parse(this.cacheData.get(wind.getSeaWf))) {
    //   this.getSeaWf(JSON.parse(this.cacheData.get(wind.getSeaWf)))
    // } else if (JSON.parse(this.cacheData.get(wind.getAreaWf))) {
    //   this.getAreaWf(JSON.parse(this.cacheData.get(wind.getAreaWf)))
    // }
    // 获取分区信息
    axios.post(wind.getAreaCities).then(response => {
      this.getAreaCities(response)
      this.cacheData.set(wind.getAreaCities, JSON.stringify(response))
      // const result = repsonse.data
      // console.log('全国分区信息', result)
      // if (parseInt(result.code) === 1) {
      //   const cityList = []
      //   // 处理分区信息
      //   for (let area of result.data) {
      //     this.landColor.push({name: area.areaName, color: area.areaColor})
      //     for (let city of area.cities) {
      //       cityList.push({
      //         name: city,
      //         itemStyle: {
      //           normal: {
      //             color: (() => {
      //               if (area.areaColor) {
      //                 return area.areaColor
      //               } else {
      //                 let color = areaColorList.shift()
      //                 areaColorList.push(color)
      //                 return color
      //               }
      //             })()
      //           }
      //         }
      //       })
      //     }
      //   }
      //   this.option.series[0].data = cityList
      //   console.log('echarts option', this.landColor)
      //   this.render()
      // }
    }).catch(error => {
      console.error(error)
    })
    // 获取海上区域
    axios.post(wind.getSeaWf).then(response => {
      this.getSeaWf(response)
      this.cacheData.set(wind.getSeaWf, JSON.stringify(response))
      // console.log('windSea', response)
      // const result = response.data
      // if (parseInt(result.code) === 1) {
      //   // 线条相关数据
      //   const seaList = []
      //   for (let sea of result.data) {
      //     this.seaColor.push({name: sea.seaName, color: sea.color})
      //     for (var i = 0; i < sea.coordinates.length; i++) {
      //       let linebar
      //       if (i === 0) {
      //         linebar = {
      //           coords: [
      //             [sea.coordinates[i].longitude, sea.coordinates[i].latitude],
      //             [sea.coordinates[i + 2].longitude, sea.coordinates[i + 2].latitude]
      //           ],
      //           lineStyle: {
      //             color: (() => {
      //               if (sea.color) {
      //                 return sea.color
      //               } else {
      //                 return 'transparent'
      //               }
      //             })(),
      //             curveness: 0.3
      //           }
      //         }
      //       } else if (i === 1) {
      //         linebar = {
      //           coords: [
      //             [sea.coordinates[i].longitude, sea.coordinates[i].latitude],
      //             [sea.coordinates[i + 2].longitude, sea.coordinates[i + 2].latitude]
      //           ],
      //           lineStyle: {
      //             color: (() => {
      //               if (sea.color) {
      //                 return sea.color
      //               } else {
      //                 return 'transparent'
      //               }
      //             })(),
      //             curveness: 0.3
      //           }
      //         }
      //       } else if (i === 2) {
      //         linebar = {
      //           coords: [
      //             [sea.coordinates[i + 1].longitude, sea.coordinates[i + 1].latitude],
      //             [sea.coordinates[i].longitude, sea.coordinates[i].latitude]
      //           ],
      //           lineStyle: {
      //             color: (() => {
      //               if (sea.color) {
      //                 return sea.color
      //               } else {
      //                 return 'transparent'
      //               }
      //             })(),
      //             curveness: 0.3
      //           }
      //         }
      //       } else if (i === 3) {
      //         linebar = {
      //           coords: [
      //             [sea.coordinates[i - 2].longitude, sea.coordinates[i - 2].latitude],
      //             [sea.coordinates[i - 3].longitude, sea.coordinates[i - 3].latitude]
      //           ],
      //           lineStyle: {
      //             color: (() => {
      //               if (sea.color) {
      //                 return sea.color
      //               } else {
      //                 return 'transparent'
      //               }
      //             })(),
      //             curveness: 0.3
      //           }
      //         }
      //       }
      //       seaList.push(linebar)
      //     }
      //   }
      //   this.option.series[2].data = seaList
      //   this.render()
      // }
    })
    // 获取分区风场信息
    axios.post(wind.getAreaWf).then(response => {
      this.getAreaWf(response)
      this.cacheData.set(wind.getAreaWf, JSON.stringify(response))
      // const result = response.data
      // console.log('分区风场信息', result)
      // if (parseInt(result.code) === 1) {
      //   // 泡泡数据
      //   const bubbleList = []
      //   // 线条数据
      //   const lineList = []
      //   // 标点数据
      //   const pointList = []
      //   // 遍历分区
      //   for (let area of result.data) {
      //     let color
      //     /* {
      //         name: '华北运维中心',
      //         value: [104.07642, 38.6518],
      //         itemStyle: {
      //           color: {
      //             type: 'radial',
      //             x: 0.5,
      //             y: 0.5,
      //             r: 0.5,
      //             colorStops: [{
      //               offset: 0, color: 'transparent' // 0% 处的颜色
      //             }, {
      //               offset: 1, color: 'rgba(112, 121, 196, 0.3)' // 100% 处的颜色
      //             }],
      //             globalCoord: false // 缺省为 false
      //           },
      //           borderColor: 'rgba(112, 121, 196, 0.7)'
      //           // shadowColor: 'rgba(255, 255, 255, 0.2)',
      //           // shadowBlur: 5
      //         },
      //         label: {
      //           color: '#6f79c4'
      //         }
      //       } */
      //     let singelBubble = {
      //       name: area.showName || area.areaName,
      //       value: [area.longitude, area.dimension],
      //       itemStyle: {
      //         color: {
      //           type: 'radial',
      //           x: 0.5,
      //           y: 0.5,
      //           r: 0.5,
      //           colorStops: [{
      //             offset: 0, color: 'transparent' // 0% 处的颜色
      //           }, {
      //             offset: 1,
      //             color: (() => {
      //               if (area.color) {
      //                 return area.color
      //               } else {
      //                 color = bubbleColorList.shift()
      //                 bubbleColorList.push(color)
      //                 return color2Rgba(color, 0.5)
      //               }
      //             })()
      //           }],
      //           globalCoord: false // 缺省为 false
      //         },
      //         borderColor: (() => {
      //           if (area.color) {
      //             return area.color
      //           } else {
      //             // let color = bubbleColorList.shift()
      //             // bubbleColorList.push(color)
      //             return color
      //           }
      //         })()
      //       },
      //       label: {
      //         color: (() => {
      //           if (area.color) {
      //             return area.color
      //           } else {
      //             // let color = bubbleColorList.shift()
      //             // bubbleColorList.push(color)
      //             return color
      //           }
      //         })()
      //       }
      //     }
      //     bubbleList.push(singelBubble)
      //     for (let wf of area.wfs) {
      //       /* {
      //         coords: [
      //           [104.07642, 38.6518],
      //           [121.48, 31.22]
      //         ],
      //         lineStyle: {
      //           color: '#877bd8',
      //           curveness: 0.2
      //         }
      //       } */
      //       let singleLine = {
      //         coords: [
      //           [area.longitude, area.dimension],
      //           [wf.longitude, wf.dimension]
      //         ],
      //         lineStyle: {
      //           color: (() => {
      //             if (area.color) {
      //               return area.color
      //             } else {
      //               // let color = bubbleColorList.shift()
      //               // bubbleColorList.push(color)
      //               return color
      //             }
      //           })(),
      //           curveness: 0.2
      //         }
      //       }
      //       lineList.push(singleLine)
      //       /* {
      //         name: 'wf',
      //         symbol: 'circle',
      //         itemStyle: {
      //           normal: {
      //             color: '#e6d17f'
      //           }
      //         }
      //       } */
      //       let singlePoint = {
      //         name: wf.wfnameShort,
      //         value: [wf.longitude, wf.dimension],
      //         symbol: (() => {
      //           // 非工程期
      //           if (wf.stage !== 'cp') {
      //             return 'circle'
      //           } else {
      //             switch (wf.sealand) {
      //               case 'land':
      //                 return `image://${landIcon}`
      //               case 'sea':
      //                 return `image://${seaIcon}`
      //               default:
      //                 return `image://${landIcon}`
      //             }
      //           }
      //         })(),
      //         itemStyle: {
      //           normal: {
      //             color: wf.sealand === 'land' ? '#e7d07f' : '#4db126'
      //           }
      //         }
      //       }
      //       pointList.push(singlePoint)
      //     }
      //   }
      //   // 取消地图部分泡泡和连线
      //   // this.option.series[1].data = bubbleList
      //   // this.option.series[2].data = lineList
      //   this.option.series[3].data = pointList
      //   console.log('测试风场图标', this.option.series[3].data)
      //   this.render()
      // }
    }).catch(error => {
      console.error(error)
    })
  },
  mounted () {
    this.render()
  },
  methods: {
    // 分区信息
    getAreaCities (res) {
      const result = res.data
      console.log('全国分区信息', result)
      if (parseInt(result.code) === 1) {
        const cityList = []
        // 处理分区信息
        for (let area of result.data) {
          this.landColor.push({name: area.areaName, color: area.areaColor})
          for (let city of area.cities) {
            if (city !== '克拉玛依市' && city !== '图木舒克市' && city !== '阿拉尔市') {
              cityList.push({
                name: city,
                itemStyle: {
                  normal: {
                    color: (() => {
                      if (area.areaColor) {
                        return area.areaColor
                      } else {
                        let color = areaColorList.shift()
                        areaColorList.push(color)
                        return color
                      }
                    })()
                  }
                }
              })
            }
          }
        }
        this.option.series[0].data = cityList
        this.render()
      }
    },
    // 海上区域
    getSeaWf (res) {
      console.log('windSea', res)
      const result = res.data
      if (parseInt(result.code) === 1) {
        // 线条相关数据
        const seaList = []
        for (let sea of result.data) {
          this.seaColor.push({name: sea.seaName, color: sea.color})
          for (var i = 0; i < sea.coordinates.length; i++) {
            let linebar
            if (i === 0) {
              linebar = {
                coords: [
                  [sea.coordinates[i].longitude, sea.coordinates[i].latitude],
                  [sea.coordinates[i + 2].longitude, sea.coordinates[i + 2].latitude]
                ],
                lineStyle: {
                  color: (() => {
                    if (sea.color) {
                      return sea.color
                    } else {
                      return 'transparent'
                    }
                  })(),
                  curveness: 0.3
                }
              }
            } else if (i === 1) {
              linebar = {
                coords: [
                  [sea.coordinates[i].longitude, sea.coordinates[i].latitude],
                  [sea.coordinates[i + 2].longitude, sea.coordinates[i + 2].latitude]
                ],
                lineStyle: {
                  color: (() => {
                    if (sea.color) {
                      return sea.color
                    } else {
                      return 'transparent'
                    }
                  })(),
                  curveness: 0.3
                }
              }
            } else if (i === 2) {
              linebar = {
                coords: [
                  [sea.coordinates[i + 1].longitude, sea.coordinates[i + 1].latitude],
                  [sea.coordinates[i].longitude, sea.coordinates[i].latitude]
                ],
                lineStyle: {
                  color: (() => {
                    if (sea.color) {
                      return sea.color
                    } else {
                      return 'transparent'
                    }
                  })(),
                  curveness: 0.3
                }
              }
            } else if (i === 3) {
              linebar = {
                coords: [
                  [sea.coordinates[i - 2].longitude, sea.coordinates[i - 2].latitude],
                  [sea.coordinates[i - 3].longitude, sea.coordinates[i - 3].latitude]
                ],
                lineStyle: {
                  color: (() => {
                    if (sea.color) {
                      return sea.color
                    } else {
                      return 'transparent'
                    }
                  })(),
                  curveness: 0.3
                }
              }
            }
            seaList.push(linebar)
          }
        }
        this.option.series[2].data = seaList
        this.render()
      }
    },
    getAreaWf (res) {
      const result = res.data
      console.log('分区风场信息', result)
      if (parseInt(result.code) === 1) {
        // 泡泡数据
        const bubbleList = []
        // 线条数据
        const lineList = []
        // 标点数据
        const pointList = []
        // 遍历分区
        for (let area of result.data) {
          let color
          /* {
              name: '华北运维中心',
              value: [104.07642, 38.6518],
              itemStyle: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0, color: 'transparent' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(112, 121, 196, 0.3)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                borderColor: 'rgba(112, 121, 196, 0.7)'
                // shadowColor: 'rgba(255, 255, 255, 0.2)',
                // shadowBlur: 5
              },
              label: {
                color: '#6f79c4'
              }
            } */
          let singelBubble = {
            name: area.showName || area.areaName,
            value: [area.longitude, area.dimension],
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                  offset: 0, color: 'transparent' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: (() => {
                    if (area.color) {
                      return area.color
                    } else {
                      color = bubbleColorList.shift()
                      bubbleColorList.push(color)
                      return color2Rgba(color, 0.5)
                    }
                  })()
                }],
                globalCoord: false // 缺省为 false
              },
              borderColor: (() => {
                if (area.color) {
                  return area.color
                } else {
                  // let color = bubbleColorList.shift()
                  // bubbleColorList.push(color)
                  return color
                }
              })()
            },
            label: {
              color: (() => {
                if (area.color) {
                  return area.color
                } else {
                  // let color = bubbleColorList.shift()
                  // bubbleColorList.push(color)
                  return color
                }
              })()
            }
          }
          bubbleList.push(singelBubble)
          for (let wf of area.wfs) {
            /* {
              coords: [
                [104.07642, 38.6518],
                [121.48, 31.22]
              ],
              lineStyle: {
                color: '#877bd8',
                curveness: 0.2
              }
            } */
            let singleLine = {
              coords: [
                [area.longitude, area.dimension],
                [wf.longitude, wf.dimension]
              ],
              lineStyle: {
                color: (() => {
                  if (area.color) {
                    return area.color
                  } else {
                    // let color = bubbleColorList.shift()
                    // bubbleColorList.push(color)
                    return color
                  }
                })(),
                curveness: 0.2
              }
            }
            lineList.push(singleLine)
            /* {
              name: 'wf',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: '#e6d17f'
                }
              }
            } */
            let singlePoint = {
              name: wf.wfnameShort,
              value: [wf.longitude, wf.dimension],
              symbol: (() => {
                // 非工程期
                if (wf.stage !== 'cp') {
                  return 'circle'
                } else {
                  switch (wf.sealand) {
                    case 'land':
                      return `image://${landIcon}`
                    case 'sea':
                      return `image://${seaIcon}`
                    default:
                      return `image://${landIcon}`
                  }
                }
              })(),
              itemStyle: {
                normal: {
                  color: wf.sealand === 'land' ? '#e7d07f' : '#4db126'
                }
              }
            }
            pointList.push(singlePoint)
          }
        }
        // 取消地图部分泡泡和连线
        // this.option.series[1].data = bubbleList
        // this.option.series[2].data = lineList
        this.option.series[3].data = pointList
        console.log('测试风场图标', this.option.series[3].data)
        this.render()
      }
    },
    // 渲染地图
    render () {
      if (!echartInstance) {
        let echartDom = document.getElementById(this.containerId)
        if (!echartDom) {
          return false
        } else {
          echartInstance = echarts.init(echartDom)
        }
      }
      echartInstance.setOption(this.option)
    }
  },
  // 销毁回收资源
  beforeDestroy () {
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
@import '../../assets/scss/rem.scss';
.china-map-lines {
  position: relative;
  width: 100%;
  height: 100%;

  .chart-container {
    height: 100%;
    width: 100%;
  }

  .chart-list {
    position: absolute;
    bottom: px2vh(42);
    right: px2rem(80);
    // display: flex;
    // justify-content: space-between;
    font-size: px2rem(40);
    ul {
      // padding: px2rem(40);
      li {
        padding: px2vh(30) 0;
      }
      i {
        display: inline-block;
        width: px2rem(40);
        height: px2rem(40);
        margin-right: px2rem(35);
      }
    }

    ul:first-child {
      li:first-child {
        i {
          background: #e7cc79;
          border-radius: 50%;
        }
      }
      li:last-child {
        i {
          // background: #5ed327;
          // border-radius: 50%;
          background: url('../../assets/img/project-line.png') center center/100% 100% no-repeat;
        }
      }
    }

  ul:last-child {
    li:first-child {
      i {
        background: #5ed327;
        border-radius: 50%;
        // background: url('../../assets/img/project-line.png') center center/100% 100% no-repeat;
      }
    }
    li:last-child {
      i {
        background: url('../../assets/img/project-area.png') center center/100% 100% no-repeat;
      }
    }
  }
  }

  .chart-area-color {
    position: absolute;
    bottom: px2vh(42);
    left: px2rem(80);
    font-size: px2rem(40);
    width: px2rem(800);

    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        width: 50%;
        padding: px2rem(20) 0;
        display: flex;

        i {
          display: inline-block;
          width: px2rem(40);
          height: px2rem(40);
          margin-right: px2rem(35);
        }

        span{
          display: inline-block;
          width: px2rem(40);
          height: px2rem(40);
          margin-right: px2rem(35);
          border-width: px2rem(4);
          border-style: dashed;
        }
      }
    }
  }
}
</style>
