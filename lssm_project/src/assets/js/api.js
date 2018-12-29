import { getUrlParam } from '../js/weapon'

const ENV = getUrlParam('env')
let host = 'http://10.18.35.72:9999/ceo_dq' // 内部环境
// let host_group = 'http://localhost:8080/ceo_backend' // 重构大屏内部环境

switch (ENV) {
  // 开发环境
  case 'dev':
    host = 'http://10.18.35.72:9999/ceo'
    break
  // UAT 环境
  case 'uat':
    host = 'http://10.0.250.84:9999/ceo_dq'
    break
  // 预生产环境
  case 'pre':
    host = 'http://uatoia.shanghai-electric.com/ceo_dq'
    break
  // 生产环境
  case 'pro':
    host = 'http://oia.shanghai-electric.com/ceo_dq'
    break
  // 生产环境
  default:
    host = 'http://uatoia.shanghai-electric.com/ceo_dq'
    break
}

const API = {
  'left': host + '/dmrPsPrj360/queryLeft',
  'right': host + '/dmrPsPrj360/queryRight',
  'province': host + '/dmrPsPrj360/queryLeftProvince',
  'country': host + '/dmrPsPrj360/queryLeftCountry',
  'head': host + '/dmrPsPrj360/queryHead',
  'bottom': host + '/dmrPsPrj360/queryBottom',
  'map': host + '/dmrPsPrj360/query',
  'mapping': host + '/dmrPsApi/query'
}

// 风场相关接口
const wind = {
  'getAnalysisByNation': host + '/wind/getAnalysisByNation', // 获取全国风场统计信息
  'getAnalysisBySealand': host + '/wind/getAnalysisBySealand', // 分类信息获取 - 海陆分区
  'getAnalysisByArea': host + '/wind/getAnalysisByArea', // 获取区域风场统计信息
  'getAreaCities': host + '/wind/getAreaCities', // 获取分区包含的城市
  'getAreaWf': host + '/wind/getAreaWf', // 获取分区风场经纬度
  'getSeaWf': host + '/wind/getSeaWf' // 获取海上风场信息
}

const group = {
  'getSevenPrj': host + '/sec/getByNewOrderPrj', // 获取新接订单信息接口
  'getCurrentPri': host + '/sec/getByOnHandOrderPrj', // 获取在手订单信息接口
  'getPowerSattion': host + '/sec/getByPowerStationPrj', // 获取世界地图电站和风电电数据
  'getNuclTranStation': host + '/sec/getByNuclTranStationPrj', // 输配电和核电接口
  'getByChangeTimePrj': host + '/sec/getByChangeTimePrj', // 大屏切换时间
  'getOverView': host + '/sec/getByBusViewPrj' // 获取总览大屏数据源
}

export default API

export {API, wind, group}
