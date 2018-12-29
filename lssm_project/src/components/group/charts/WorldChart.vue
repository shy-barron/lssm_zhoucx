<template>
  <div class="map-container">
    <!-- 世界地图容器 -->
    <div class="world-content" :id="id"></div>
    <div v-if="false" class="title-project">
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
import echarts from 'echarts'
import 'echarts/map/js/world.js'
import _ from 'lodash'
// import func from './vue-temp/vue-editor-bridge';
let nameMap = {
  'Afghanistan': '阿富汗',
  'Singapore': '新加坡',
  'Angola': '安哥拉',
  'Albania': '阿尔巴尼亚',
  'United Arab Emirates': '阿联酋',
  'Argentina': '阿根廷',
  'Armenia': '亚美尼亚',
  'French Southern and Antarctic Lands': '法属南半球和南极领地',
  'Australia': '澳大利亚',
  'Austria': '奥地利',
  'Azerbaijan': '阿塞拜疆',
  'Burundi': '布隆迪',
  'Belgium': '比利时',
  'Benin': '贝宁',
  'Guatemala': '瓜地马拉',
  'Mauritius': '毛里求斯',
  'Burkina Faso': '布基纳法索',
  'Bangladesh': '孟加拉国',
  'Bulgaria': '保加利亚',
  'The Bahamas': '巴哈马',
  'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
  'Belarus': '白俄罗斯',
  'Belize': '伯利兹',
  'Bermuda': '百慕大',
  'Bolivia': '玻利维亚',
  'Brazil': '巴西',
  'Brunei': '文莱',
  'Bhutan': '不丹',
  'Botswana': '博茨瓦纳',
  'Central African Republic': '中非共和国',
  'Canada': '加拿大',
  'Switzerland': '瑞士',
  'Chile': '智利',
  'China': '中国',
  'Trinidad and Tobago': '特立尼达和多巴哥',
  'Ivory Coast': '象牙海岸',
  'Cameroon': '喀麦隆',
  'Democratic Republic of the Congo': '刚果民主共和国',
  'Republic of the Congo': '刚果共和国',
  'Colombia': '哥伦比亚',
  'Costa Rica': '哥斯达黎加',
  'Cuba': '古巴',
  'Northern Cyprus': '北塞浦路斯',
  'Cyprus': '塞浦路斯',
  'Czech Republic': '捷克共和国',
  'Germany': '德国',
  'Djibouti': '吉布提',
  'Denmark': '丹麦',
  'Dominican Republic': '多明尼加共和国',
  'Algeria': '阿尔及利亚',
  'Ecuador': '厄瓜多尔',
  'Egypt': '埃及',
  'Eritrea': '厄立特里亚',
  'Spain': '西班牙',
  'Estonia': '爱沙尼亚',
  'Ethiopia': '埃塞俄比亚',
  'Finland': '芬兰',
  'Fiji': '斐',
  'Falkland Islands': '福克兰群岛',
  'France': '法国',
  'Gabon': '加蓬',
  'United Kingdom': '英国',
  'Georgia': '格鲁吉亚',
  'Ghana': '加纳',
  'Guinea': '几内亚',
  'Gambia': '冈比亚',
  'Guinea Bissau': '几内亚比绍',
  'Equatorial Guinea': '赤道几内亚',
  'Greece': '希腊',
  'Greenland': '格陵兰',
  // 'Guatemala': '危地马拉',
  'French Guiana': '法属圭亚那',
  'Guyana': '圭亚那',
  'Honduras': '洪都拉斯',
  'Croatia': '克罗地亚',
  'Haiti': '海地',
  'Hungary': '匈牙利',
  'Indonesia': '印尼',
  'India': '印度',
  'Ireland': '爱尔兰',
  'Iran': '伊朗',
  'Iraq': '伊拉克',
  'Iceland': '冰岛',
  'Israel': '以色列',
  'Italy': '意大利',
  'Jamaica': '牙买加',
  'Jordan': '约旦',
  'Japan': '日本',
  'Kazakhstan': '哈萨克斯坦',
  'Kenya': '肯尼亚',
  'Kyrgyzstan': '吉尔吉斯斯坦',
  'Cambodia': '柬埔寨',
  'South Korea': '韩国',
  'Kosovo': '科索沃',
  'Kuwait': '科威特',
  'Laos': '老挝',
  'Lebanon': '黎巴嫩',
  'Liberia': '利比里亚',
  'Libya': '利比亚',
  'Sri Lanka': '斯里兰卡',
  'Lesotho': '莱索托',
  'Lithuania': '立陶宛',
  'Luxembourg': '卢森堡',
  'Latvia': '拉脱维亚',
  'Morocco': '摩洛哥',
  'Moldova': '摩尔多瓦',
  'Madagascar': '马达加斯加',
  'Mexico': '墨西哥',
  'Macedonia': '马其顿',
  'Mali': '马里',
  'Myanmar': '缅甸',
  'Montenegro': '黑山',
  'Mongolia': '蒙古',
  'Mozambique': '莫桑比克',
  'Mauritania': '毛里塔尼亚',
  'Malawi': '马拉维',
  'Malaysia': '马来西亚',
  'Namibia': '纳米比亚',
  'New Caledonia': '新喀里多尼亚',
  'Niger': '尼日尔',
  'Nigeria': '尼日利亚',
  'Nicaragua': '尼加拉瓜',
  'Netherlands': '荷兰',
  'Norway': '挪威',
  'Nepal': '尼泊尔',
  'New Zealand': '新西兰',
  'Oman': '阿曼',
  'Pakistan': '巴基斯坦',
  'Panama': '巴拿马',
  'Peru': '秘鲁',
  'Philippines': '菲律宾',
  'Papua New Guinea': '巴布亚新几内亚',
  'Poland': '波兰',
  'Puerto Rico': '波多黎各',
  'North Korea': '北朝鲜',
  'Portugal': '葡萄牙',
  'Paraguay': '巴拉圭',
  'Qatar': '卡塔尔',
  'Romania': '罗马尼亚',
  'Russia': '俄罗斯',
  'Rwanda': '卢旺达',
  'Western Sahara': '西撒哈拉',
  'Saudi Arabia': '沙特阿拉伯',
  'Sudan': '苏丹',
  'South Sudan': '南苏丹',
  'Senegal': '塞内加尔',
  'Solomon Islands': '所罗门群岛',
  'Sierra Leone': '塞拉利昂',
  'El Salvador': '萨尔瓦多',
  'Somaliland': '索马里兰',
  'Somalia': '索马里',
  'Republic of Serbia': '塞尔维亚',
  'Suriname': '苏里南',
  'Slovakia': '斯洛伐克',
  'Slovenia': '斯洛文尼亚',
  'Sweden': '瑞典',
  'Swaziland': '斯威士兰',
  'Syria': '叙利亚',
  'Chad': '乍得',
  'Togo': '多哥',
  'Thailand': '泰国',
  'Tajikistan': '塔吉克斯坦',
  'Turkmenistan': '土库曼斯坦',
  'East Timor': '东帝汶',
  // 'Trinidad and Tobago': '特里尼达和多巴哥',
  'Tunisia': '突尼斯',
  'Turkey': '土耳其',
  'United Republic of Tanzania': '坦桑尼亚',
  'Uganda': '乌干达',
  'Ukraine': '乌克兰',
  'Uruguay': '乌拉圭',
  'United States of America': '美国',
  'Uzbekistan': '乌兹别克斯坦',
  'Venezuela': '委内瑞拉',
  'Vietnam': '越南',
  'Vanuatu': '瓦努阿图',
  'West Bank': '西岸',
  'Yemen': '也门',
  'South Africa': '南非',
  'Zambia': '赞比亚',
  'Zimbabwe': '津巴布韦'
}

export default {
  name: 'WorldChart',
  data () {
    return {
      id: _.uniqueId('world-map'),
      echartInstance: undefined, // option容器
      instruct: '数据来源于上海电气SAP系统', // 注释内容
      projectList: [], // 项目颜色标识
      timeOut: 10000, // 地图跳转时间，
      timeId: undefined, // 定时器
      pagetimeId: undefined, // 切屏定时器柄
      proList: [], // 项目数据
      saleList: [], // 订单数据
      baseOption: { // 热力图部分基本参数
        geo: {
          show: true,
          type: 'map',
          map: 'world',
          roam: true,
          nameMap: nameMap,
          selectedMode: 'single',
          // zoom: 1.4,
          zoom: 1.2,
          center: [70.97, 14.71],
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#0a2445',
              borderColor: 'rgba(0, 116, 253, 0.8)'
            },
            emphasis: {
              areaColor: 'rgba(11, 55, 119, 0.8)'
            }
          }
          // regions: [{
          //   name: 'China',
          //   itemStyle: {
          //     areaColor: 'rgba(11, 55, 119, 0.8)',
          //     color: 'rgba(11, 55, 119, 0.8)'
          //   }
          // }]
        },
        // grid: {
        //   left: '1%',
        //   right: '22%',
        //   bottom: '3%'
        // },
        visualMap: {
          type: 'piecewise', // 分段型。
          splitNumber: 6,
          inverse: true,
          pieces: [{
            max: 1,
            label: '空白区域',
            color: '#0a2445'
          }, {
            min: 0,
            max: 1,
            label: '1-10亿元',
            color: '#1951d2'
          }, {
            min: 1,
            max: 10,
            label: '10-20亿元',
            color: '#1dcbc9'
          }, {
            min: 10,
            max: 50,
            label: '20-50亿元',
            color: '#578af8'
          }, {
            min: 50,
            max: 100,
            label: '50-100亿元',
            color: '#53b435'
          }, {
            min: 100,
            max: 500,
            label: '100-500亿元',
            color: '#fccb5e'
          }, {
            min: 500,
            // max: 1000,
            label: '>500亿元',
            color: '#f2824d'
          }],
          left: 'left',
          bottom: window.lib.rem2px(0.167),
          // itemSymbol: 'circle',
          itemGap: window.lib.rem2px(0.083),
          inRange: {
            symbol: 'circle',
            symbolSize: window.lib.rem2px(0.035)
          },
          textStyle: {
            color: '#869fc9',
            fontSize: window.lib.rem2px(0.0757)
          }
          // min: 0,
          // max: 60000,
          // text:['High','Low'],
          // realtime: true,
          // calculable: true,
          // color: ['red','orange','lightgreen']
        },
        series: [
          {
            type: 'map',
            map: 'world',
            geoIndex: 0,
            roam: true,
            selectedMode: 'single',
            itemStyle: {
              emphasis: {
                label: {
                  show: false
                }
              }
            },
            nameMap: nameMap,
            data: [
              {
                name: 'Vanuatu',
                value: 75
              },
              {
                name: 'Vatican City',
                value: 29
              },
              {
                name: 'Venezuela',
                value: 9691
              },
              {
                name: 'Vietnam',
                value: 25084
              },
              {
                name: 'Western Sahara',
                value: 103
              },
              {
                name: 'Yemen',
                value: 383
              },
              {
                name: 'Zambia',
                value: 386
              }
            ]
          }
        ]
      },
      option: { // 点图部分基本参数
        geo: {
          show: true,
          type: 'map',
          map: 'world',
          roam: true,
          selectedMode: 'single',
          zoom: 1.7,
          // zoom: 0.6,
          center: [72.97, 14.71],
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(1, 19, 51, 0.8)',
              borderColor: 'rgba(0, 116, 253, 0.8)'
            },
            emphasis: {
              areaColor: 'rgba(11, 55, 119, 0.8)'
            }
          },
          regions: [{
            name: 'China',
            itemStyle: {
              areaColor: 'rgba(11, 55, 119, 0.8)',
              color: 'rgba(11, 55, 119, 0.8)'
            }
          }]
        },
        grid: {
          left: '1%',
          right: '16%',
          bottom: '3%'
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
        //   return 2000
        // },
        // animationDelay: function (idx) {
        //   // 越往后的数据延迟越大
        //   return 10
        // },
        series: [
          // {
          //   type: 'map',
          //   mapType: 'world',
          //   geoIndex: 0,
          //   roam: true,
          //   selectedMode: 'single'
          //   // nameMap: nameMap,
          // },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            // symbolSize: window.lib.rem2px(0.07),
            symbolSize: window.lib.rem2px(0.035),
            data: [
              // {
              //   value: [103.06, 59.24],
              //   itemStyle: {
              //     color: '#5ed327'
              //   }
              // },
              // {
              //   value: [123.06, 63.24],
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
  props: {
    hotMapList: {
      type: Array,
      default: function () {
        return [{
          'min': 0,
          'color': '#0a2445',
          'max': 0,
          'text': '空白区域'
        }]
      }
    },
    seriesData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    mapList () {
      return this.$store.state.world.mapList
    },
    roll () {
      return this.$store.state.group.roll
    },
    pagetimeOut () {
      return this.$store.state.group.timeOut
    }
  },
  methods: {
    // 路由切屏
    changeRoute () {
      if (this.roll && this.timeOut && this.roll === 'true') {
        // console.log('roll, timeOut', this.roll, this.timeOut)
        if (this.pagetimeId) {
          clearTimeout(this.pagetimeId)
        }
        this.pagetimeId = setTimeout(() => {
          this.$router.push({path: 'china-map'})
        }, this.pagetimeOut)
      }
    },
    // 处理电站热力图部分数据
    dealHotData () {
      if (this.hotMapList && this.seriesData) {
        let visualMapData = []
        let mapSeriesData = []
        for (let visual of this.hotMapList) {
          visualMapData.push({
            min: Number(visual.min),
            max: Number(visual.max),
            label: visual.text,
            color: visual.color
          })
        }
        for (let mapseries of this.seriesData) {
          mapSeriesData.push({
            name: mapseries.COUNTRY,
            value: Number(mapseries.amount)
          })
        }
        console.log('baseoption', visualMapData, mapSeriesData)
        this.baseOption.visualMap.pieces = visualMapData
        this.baseOption.series[0].data = mapSeriesData
        this.render()
      }
    },
    // 修改后的数据处理
    dealSingleData () {
      this.projectList = []
      console.log('mapList', this.mapList)
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
        this.changeRoute()
      }
    },
    // 修改前的数据处理
    dealData () {
      // console.log('mapList', this.mapList)
      if (this.mapList.length !== 0) {
        this.projectList = []
        for (let s in this.mapList) {
          this.projectList.push(this.arrayUnipue(this.mapList[s].list, ['stage', 'color']))
          if (this.mapList[s].flag && parseInt(this.mapList[s].flag) === 1) {
            this.timeOut = this.mapList[s].time || 5000
            this.proList = this.mapList[s]
          } else {
            this.saleList = this.mapList[s]
          }
        }
        let scatterList = []
        for (let k in this.proList.list) {
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
        this.$store.commit('world/updatedActiveIndex', 0)
        this.render()
        this.changeRoute()
        // console.log('this.time', new Date())
        if (this.timeId) {
          clearInterval(this.timeId)
        }
        let m = 0
        this.timeId = setInterval(() => {
          // console.log('timeOut', this.timeOut)
          scatterList = []
          if (m === 0) {
            for (let t in this.saleList.list) {
              scatterList.push({
                value: [this.saleList.list[t].long, this.saleList.list[t].lat],
                itemStyle: {
                  color: this.saleList.list[t].color
                }
              })
            }
            this.instruct = this.saleList.comment
            this.option.series[0].data = scatterList
            this.$store.commit('world/updatedActiveIndex', 1)
            this.render()
            // console.log('this.time', new Date())
            ++m
          } else {
            for (let k in this.proList.list) {
              scatterList.push({
                value: [this.proList.list[k].long, this.proList.list[k].lat],
                itemStyle: {
                  color: this.proList.list[k].color
                }
              })
            }
            this.instruct = this.proList.comment
            this.option.series[0].data = scatterList
            this.$store.commit('world/updatedActiveIndex', 0)
            this.render()
            // console.log('this.time', new Date())
            m = 0
          }
        }, this.timeOut)
      }
    },
    // 合并数据相同类
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
      if (array) {
        for (var i = 0, j = array.length; i < j; i++) {
          var k = this.obj2key(array[i], keys)
          if (!(k in hash)) {
            hash[k] = true
            arr.push(array[i])
          }
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
      this.echartInstance.setOption(this.baseOption)
      this.changeRoute()
    }
  },
  watch: {
    seriesData () {
      this.dealHotData()
    }
  },
  mounted () {
    if (this.seriesData.length !== 0 && this.hotMapList.length !== 0) {
      this.dealHotData()
    }
    // this.render()
  },
  beforeDestroy () {
    this.$store.commit('world/updatedActiveIndex', 3)
    this.$store.commit('world/updatedMapList', [])
    if (this.echartInstance) {
      // 清空数据
      this.echartInstance.clear()
      // 销毁实例
      this.echartInstance.dispose(this.echartInstance)
      // this.option = undefined
      this.echartInstance = undefined
    }
    if (this.timeId) {
      clearInterval(this.timeId)
    }
    if (this.pagetimeId) {
      clearInterval(this.pagetimeId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.map-container {
  position: relative;
  width: 100%;
  height: 100%;

  .world-content {
    width: 100%;
    height: 100%;
  }
  .title-project {
    position: absolute;
    bottom: px2vh(42);
    left: 0;
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
    right: 0;
    bottom: px2vh(-340);
    font-size: px2rem(40);
    // color: #89a2cb;
    // font-size: px2rem(36);
    font-size: 0.08929rem;
    color: #586d8f
  }
}
</style>
