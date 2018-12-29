/**
 * @author chenqy9
 * @description mockjs 模拟开发接口
 * 接口返回数据格式说明:
 * code: 请求状态编码，0 - 失败，1 - 成功
 * msg:请求信息，成功返回success，失败返回具体错误信息
 * data:具体的接口数据
 */
import Mock from 'mockjs'
import {API, wind, group} from './api'

// 设置超时
Mock.setup({
  timeout: '200-400'
})

Mock.mock(API.mapping, 'post', options => {
  return {
    'result': 'S',
    'msg': null,
    'data': [{
      'code': 'top01',
      'value': '线索项目',
      'datavalue': '线索阶段'
    }, {
      'code': 'top02',
      'value': '投标项目',
      'datavalue': '投标阶段'
    }, {
      'code': 'top03',
      'value': '新接订单',
      'datavalue': '新增阶段'
    }, {
      'code': 'top04',
      'value': '在手订单',
      'datavalue': '在手阶段'
    }, {
      'code': 'map01',
      'value': '线索阶段项目分布',
      'datavalue': '线索阶段'
    }, {
      'code': 'map02',
      'value': '投标阶段项目分布',
      'datavalue': '投标阶段'
    }, {
      'code': 'map03',
      'value': '新接订单项目分布',
      'datavalue': '新增阶段'
    }, {
      'code': 'map04',
      'value': '在手订单项目分布',
      'datavalue': '在手阶段'
    }, {
      'code': 'bot01',
      'value': '电站',
      'datavalue': '电站集团'
    }, {
      'code': 'bot02',
      'value': '风电',
      'datavalue': '风电集团'
    }, {
      'code': 'bot03',
      'value': '核电',
      'datavalue': '核电集团'
    }, {
      'code': 'bot04',
      'value': '输配电',
      'datavalue': '输配电集团'
    }, {
      'code': 'bot05',
      'value': '股份直属',
      'datavalue': '股份直属'
    }]
  }
})

/**
 * @description 获取全国风场统计信息
 * 相关数据库字段说明
 * wfCount: 653, // 全国风场数量
 * cpWfCount: 353, // 工程期风场数量
 * gpWfCount: 300, // 质保期风场数量
 * capacityCount4Add: 400, // 新增装机容量
 * powerTotal: 10000, // 累计装机容量
 * co2ReductionTotal: 800 // 累计CO2减排量
 */
Mock.mock(wind.getAnalysisByNation, 'post', options => {
  return {
    code: 1,
    msg: 'success',
    data: [
      {
        key: '全国风场数',
        value: 653,
        unit: '个'
      }, {
        key: '工程期风场数',
        value: 353,
        unit: '个'
      }, {
        key: '质保期风场数',
        value: 300,
        unit: '个'
      }, {
        key: '新增装机容量',
        value: 400,
        unit: 'MW'
      }, {
        key: '累计装机容量',
        value: 10000,
        unit: 'MW'
      }, {
        key: 'CO2减排量',
        value: 800,
        unit: 'kg'
      }
    ]
  }
})

/**
 * @description 获取海陆风场统计信息
 * 相关数据库字段说明
 * wfCount: 300 // 风场总数
 * cpWfCount: 100 // 工程期风场数量(在建)
 * ! 这里顺序order by 'sea, land'
 */
Mock.mock(wind.getAnalysisBySealand, 'post', options => {
  return {
    code: 1,
    msg: 'success',
    data: [{
      'seaLand': 'sea',
      'wfCount': 1000,
      'cpWfCount': 2
    }, {
      'seaLand': 'land',
      'wfCount': 100,
      'cpWfCount': 1
    }]
  }
})

/**
 * @description 获取风场分区统计信息
 * 相关数据库字段说明
 * areaName:华中地区 // 区域名称
 * turbineCount: 300 // 装机总数
 * capacityCount: 1000 // 装机容量
 * capacityCount4Add: 200 // 新增装机总量
 * powerTotal: 10000 // 历史发电量
 * ! 表头信息和表格数据一一对应
 */
Mock.mock(wind.getAnalysisByArea, 'post', options => {
  return {
    code: 1,
    msg: 'success',
    data: {
      // 单位信息
      'unitList': ['台数(个)', '容量(MW)', '发电量(KW)'],
      // 表头信息
      'columnList': ['区域', '装机总数', '装机总量', '新增装机总量', '历史发电量'],
      // 表格数据
      'dataList': [
        ['华中地区', 675, 1281, 200, 7650],
        ['华南地区', 675, 1281, 200, 7650],
        ['华北地区', 675, 1281, 200, 7650],
        ['华西地区', 675, 1281, 200, 7650],
        ['华东地区', 675, 1281, 200, 7650]
      ]
    }
  }
})

/**
 * @description 获取分区包含的城市
 * 相关数据库字段说明
 * areaName:华中地区 // 区域名称
 * cityName: 广州市 // 城市名称
 */
Mock.mock(wind.getAreaCities, 'post', options => {
//   return {"code":"1","msg":"success","data":[{"areaName":"华东区","areaColor":"rgba(37,205,80,0.5)","cities":["崇明县","南汇区","奉贤区","浦东新区","金山区","青浦区","松江区","嘉定区","宝山区","闵行区","杨浦区","普陀区","徐汇区","长宁区","闸北区","虹口区","黄浦区","卢湾区","静安区","盐城市","徐州市","南通市","淮安市","苏州市","宿迁市","连云港市","扬州市","南京市","泰州市","无锡市","常州市","镇江市","六安市","安庆市","滁州市","宣城市","阜阳市","宿州市","黄山市","巢湖市","亳州市","池州市","合肥市","蚌埠市","芜湖市","淮北市","淮南市","马鞍山市","铜陵市","南阳市","信阳市","洛阳市","驻马店市","周口市","商丘市","三门峡市","新乡市","平顶山市","郑州市","安阳市","开封市","焦作市","许昌市","濮阳市","漯河市","鹤壁市","恩施土家族苗族自治州","十堰市","宜昌市","襄樊市","黄冈市","荆州市","荆门市","咸宁市","随州市","孝感市","武汉市","黄石市","神农架林区","天门市","仙桃市","潜江市","鄂州市","枣庄市","丽水市","杭州市","温州市","宁波市","舟山市","台州市","金华市","衢州市","绍兴市","嘉兴市","湖州市"]},{"areaName":"西北区","areaColor":"rgba(47,166,235,0.5)","cities":["克拉玛依市","酒泉市","张掖市","甘南藏族自治州","武威市","陇南市","庆阳市","白银市","定西市","天水市","兰州市","平凉市","临夏回族自治州","金昌市","嘉峪关市","吴忠市","中卫市","固原市","银川市","石嘴山市","海西蒙古族藏族自治州","玉树藏族自治州","果洛藏族自治州","海南藏族自治州","海北藏族自治州","黄南藏族自治州","海东地区","西宁市","巴音郭楞蒙古自治州","和田地区","哈密地区","阿克苏地区","阿勒泰地区","喀什地区","塔城地区","昌吉回族自治州","克孜勒苏柯尔克孜自治州","吐鲁番地区","伊犁哈萨克自治州","博尔塔拉蒙古自治州","乌鲁木齐市","克拉玛依市","阿拉尔市","图木舒克市","五家渠市","石河子市"]},{"areaName":"西南区","areaColor":"rgba(255,200,67,0.5)","cities":["百色市","河池市","桂林市","南宁市","柳州市","崇左市","来宾市","玉林市","梧州市","贺州市","钦州市","贵港市","防城港市","北海市","遵义市","黔东南苗族侗族自治州","毕节地区","黔南布依族苗族自治州","铜仁地区","黔西南布依族苗族自治州","六盘水市","安顺市","贵阳市","赣州市","吉安市","上饶市","九江市","抚州市","宜春市","南昌市","景德镇","萍乡市","鹰潭市","新余市","普洱市","红河哈尼族彝族自治州","文山壮族苗族自治州","曲靖市","楚雄彝族自治州","大理白族自治州","临沧市","迪庆藏族自治州","昭通市","昆明市","丽江市","西双版纳傣族自治州","保山市","玉溪市","怒江傈僳族自治州","德宏傣族景颇族自治州"]},{"areaName":"华北区","areaColor":"rgba(231,105,182,0.5)","cities":["承德市","张家口市","保定市","唐山市","沧州市","石家庄市","邢台市","邯郸市","秦皇岛市","衡水市","廊坊市","阿拉善盟","锡林郭勒盟","鄂尔多斯市","巴彦淖尔市","乌兰察布市","包头市","呼和浩特市","乌海市","烟台市","临沂市","潍坊市","青岛市","菏泽市","济宁市","德州市","滨州市","聊城市","东营市","济南市","泰安市","威海市","日照市","淄博市","莱芜市","忻州市","吕梁市","临汾市","晋中市","运城市","大同市","长治市","朔州市","晋城市","太原市","阳泉市","榆林市","延安市","汉中市","安康市","商洛市","宝鸡市","渭南市","咸阳市","西安市","铜川市"]},{"areaName":"东北区","areaColor":"rgba(57,85,227,0.5)","cities":["黑河市","大兴安岭地区","哈尔滨市","齐齐哈尔市","牡丹江市","绥化市","伊春市","佳木斯市","鸡西市","双鸭山市","大庆市","鹤岗市","七台河市","延边朝鲜族自治州","吉林市","白城市","松原市","长春市","白山市","通化市","四平市","辽源市","大连市","朝阳市","丹东市","铁岭市","沈阳市","抚顺市","葫芦岛","阜新市","锦州市","鞍山市","本溪市","营口市","辽阳市","盘锦市","呼伦贝尔市","赤峰市","通辽市","兴安盟"]}]}
  return {
    code: 1,
    msg: 'success',
    data: [
      {
        areaName: '华中地区',
        // areaColor: '#0b285b',
        areaColor: 'green',
        // 分区包含的城市名
        cities: [
          '郑州市',
          '武汉市',
          '长沙市',
          '开封市',
          '黄石市',
          '株洲市',
          '洛阳市',
          '十堰市',
          '湘潭市',
          '平顶山市',
          '宜昌市',
          '衡阳市',
          '安阳市',
          '襄阳市',
          '邵阳市',
          '鹤壁市',
          '鄂州市',
          '岳阳市',
          '新乡市',
          '荆门市',
          '常德市',
          '焦作市',
          '孝感市',
          '张家界市',
          '濮阳市',
          '荆州市',
          '益阳市',
          '许昌市',
          '黄冈市',
          '郴州市',
          '漯河市',
          '咸宁市',
          '永州市',
          '三门峡市',
          '随州市',
          '怀化市',
          '商丘市'
        ]
      },
      {
        areaName: '华东地区',
        // areaColor: '#0f3680',
        areaColor: 'red',
        cities: [
          '黄浦区',
          '南京市',
          '杭州市',
          '合肥市',
          '福州市',
          '南昌市',
          '济南市',
          '徐汇区',
          '无锡市',
          '宁波市',
          '芜湖市',
          '厦门市',
          '九江市',
          '青岛市',
          '新北市',
          '长宁区',
          '徐州市',
          '温州市',
          '蚌埠市',
          '莆田市',
          '萍乡市',
          '淄博市',
          '桃园市',
          '静安区',
          '常州市',
          '嘉兴市',
          '淮南市',
          '三明市',
          '景德镇市',
          '枣庄市',
          '台中市',
          '普陀区',
          '苏州市',
          '湖州市',
          '马鞍山市',
          '泉州市',
          '新余市',
          '东营市',
          '台南市',
          '闸北区',
          '南通市',
          '绍兴市',
          '浦东新区',
          '青浦区',
          '池州市',
          '聊城市',
          '屏东县',
          '奉贤区',
          '宣城市',
          '滨州市',
          '宜兰县',
          '崇明区'
        ]
      },
      {
        areaName: '华北地区',
        areaColor: 'yellow',
        cities: [
          '北京市',
          '天津市',
          '太原市',
          '大同市',
          '阳泉市',
          '长治市',
          '晋城市',
          '朔州市',
          '晋中市',
          '运城市',
          '忻州市',
          '临汾市',
          '吕梁市',
          '石家庄',
          '唐山',
          '秦皇岛',
          '邯郸',
          '邢台',
          '保定',
          '张家口',
          '承德',
          '沧州',
          '廊坊',
          '衡水',
          '呼和浩特市',
          '包头市',
          '乌海市',
          '赤峰市',
          '通辽市',
          '鄂尔多斯市',
          '呼伦贝尔市',
          '巴彦淖尔市',
          '乌兰察布市',
          '兴安盟',
          '锡林郭勒盟',
          '阿拉善盟'
        ]
      },
      {
        areaName: '西北地区',
        areaColor: 'rgba(47,166,235,0.5',
        cities: [
          '西安市',
          '铜川市',
          '宝鸡市',
          '咸阳市',
          '渭南市',
          '汉中市',
          '安康市',
          '商洛市',
          '延安市',
          '榆林市',
          '兰州市',
          '嘉峪关市',
          '金昌市',
          '白银市',
          '天水市',
          '酒泉市',
          '张掖市',
          '武威市',
          '定西市',
          '陇南市',
          '平凉市',
          '庆阳市',
          '西宁市',
          '海东市',
          '银川市',
          '石嘴山市',
          '吴忠市',
          '固原市',
          '中卫市',
          '阿克苏地区',
          '喀什地区',
          '塔城地区',
          '乌鲁木齐市',
          '阿瓦提县',
          '克拉玛依市',
          '吐鲁番市',
          '哈密市',
          '阿拉尔市',
          '图木舒克市',
          '五家渠市',
          '石河子市'
        ]
      },
      {
        areaName: '东北地区',
        areaColor: 'white',
        cities: [
          '长春市',
          '吉林市',
          '四平市',
          '辽源市',
          '通化市',
          '白山市',
          '松原市',
          '白城市',
          '沈阳市',
          '大连市',
          '鞍山市',
          '抚顺市',
          '本溪市',
          '丹东市',
          '锦州市',
          '营口市',
          '阜新市辖',
          '大连市',
          '大连市',
          '辽阳市',
          '盘锦市',
          '铁岭市',
          '朝阳市',
          '通辽市',
          '呼伦贝尔市',
          '秦皇岛市',
          '承德市',
          '秦皇岛市'
        ]
      }
    ]
  }
})

/**
 * @description 获取分区风场经纬度
 * 相关数据库字段说明
 * areaName:华中地区 // 区域名称
 * stage:cp // 风场所处阶段
 * sealand:land // 海陆分区
 * longitude:104.07642 // 经度
 * dimension:38.6518 // 纬度
 */
Mock.mock(wind.getAreaWf, 'post', options => {
  return {
    code: 1,
    msg: 'success',
    // 分区列表
    data: [
      {
        areaName: '华北地区',
        showName: '华北运维中心', // 显示名称
        longitude: 104.07642,
        dimension: 38.6518,
        color: '#a79afc', // 区域及延伸线颜色
        // 区域包换的风场经纬度列表
        wfs: [
          {
            code: '风场编码',
            wfName: '风场全称',
            wfnameShort: '风场简称',
            stage: 'cp', // 风场所处阶段, cp:工程期 gp:质保 op:质保外
            sealand: 'area', // 海陆分区
            longitude: 123.62493,
            dimension: 34.74725
          }
        ]
      }
      // 后面是华东、西北等区域
    ]
  }
}
)

/**
 * @description 获取海上分区的区域
 * 相关数据库字段说明
 * seaName:华中地区 // 区域名称
 * sealand:sea // 海陆分区
 * seaColor: "#fff" // 分区边界颜色
 * longitude:104.07642 // 经度
 * dimension:38.6518 // 纬度
 */
Mock.mock(wind.getSeaWf, 'post', options => {
  return {
    code: 1,
    msg: 'success',
    // 分区列表
    data: [
      {
        seaName: '海上福建区域',
        sealand: 'seaF', // 海上分区
        color: '#90E0E3', // 区域及延伸线颜色
        coordinates: [
          {
            longitude: 120.48, // 连线起点经度
            latitude: 26.22 // 连线终点维度
          },
          {
            longitude: 121.48, // 连线起点经度
            latitude: 25.22 // 连线终点维度
          },
          {
            longitude: 111.04, // 连线起点经度
            latitude: 21.22 // 连线终点维度
          },
          {
            longitude: 111.07, // 连线起点经度
            latitude: 20.35 // 连线终点维度
          }
        ]
        // 区域包换的风场经纬度列表(默认为一)
      },
      {
        seaName: '海上江苏区域',
        sealand: 'seaF', // 海上分区
        color: '#8907FB', // 区域及延伸线颜色
        coordinates: [
          {
            longitude: 123.77, // 连线起点经度
            latitude: 38.63 // 连线终点维度
          },
          {
            longitude: 120.77, // 连线起点经度
            latitude: 35.63 // 连线终点维度
          },
          {
            longitude: 121.79, // 连线起点经度
            latitude: 24.93 // 连线终点维度
          },
          {
            longitude: 120.77, // 连线起点经度
            latitude: 26.63 // 连线终点维度
          }
        ]
        // 区域包换的风场经纬度列表(默认为一)
      }
    ]
  }
}
)

/**
 * @author zhoucx
 * @description mockjs 模拟新接开发接口
 * 接口返回数据格式说明:
 * code: 请求状态编码，0 - 失败，1 - 成功
 * msg:请求信息，成功返回success，失败返回具体错误信息
 * data:具体的接口数据
 * 订单列表模拟数据
 * TOP:顶部用
 * {stage:全球 count:个数 amount:金额 c_unit:数量单位  a_unit:亿元  cate:同比}
 * LEFT:左边用
 * {group:集团 amount:金 cate:占比}
 * RIGHT:右边用
 * {qtr:季度, amount:金额, abroad:海外金额, rate:占比}
 * LIST1:
    Prj:项目
    amount:金额
  LIST2:
    Prj:国家
    amount:金额
 */
Mock.mock(group.getSevenPrj, 'post', option => {
  return {
    code: 1,
    msg: 'success',
    data: {
      top: [
        {
          stage: '全球',
          count: 11069,
          amount: 70.42,
          rate: 0.39,
          c_unit: '个',
          a_unit: '亿元',
          b_unit: '%'
        },
        {
          stage: '海外',
          count: 2045,
          amount: 12.03,
          rate: 0.34,
          c_unit: '个',
          a_unit: '亿元',
          b_unit: '%'
        }
      ],
      left: [
        {
          stage: '电站集团',
          amount: 912,
          rate: -0.60,
          a_unit: '亿元',
          color: '#43a1f8'
        },
        {
          stage: '风电集团',
          amount: 889,
          rate: -0.73,
          a_unit: '亿元',
          color: '#54ae32'
        },
        {
          stage: '核电集团',
          amount: 442,
          rate: -0.22,
          a_unit: '亿元',
          color: '#efbc40'
        },
        {
          stage: '输电集团',
          amount: 3320.22,
          rate: 0.18,
          a_unit: '亿元',
          color: '#efcc40'
        }
      ],
      right: [
        {
          legend: '全球',
          color: '#24c603',
          grad_first: 'rgba(36, 198, 3, .6)',
          grad_end: 'rgba(36, 198, 3, 0)',
          a_unit: '亿元',
          roll_interval: 3000,
          data: [
            {
              qtr_wid: '2017.Q1',
              amount: 912,
              rate: 0.60
            },
            {
              qtr_wid: '2017.Q2',
              amount: 912,
              rate: 0.60
            },
            {
              qtr_wid: '2017.Q3',
              amount: 912,
              rate: 0.60
            },
            {
              qtr_wid: '2017.Q4',
              amount: 912,
              rate: 0.60
            }
          ]
        },
        {
          legend: '海外',
          color: '#0aa3fe',
          grad_first: 'rgba(10, 163, 254, .6)',
          grad_end: 'rgba(10, 163, 254, 0)',
          a_unit: '亿元',
          data: [
            {
              qtr_wid: '2017.Q2',
              amount: 512,
              rate: 0.60
            },
            {
              qtr_wid: '2017.Q2',
              amount: 512,
              rate: 0.60
            },
            {
              qtr_wid: '2017.Q2',
              amount: 512,
              rate: 0.60
            },
            {
              qtr_wid: '2017.Q2',
              amount: 512,
              rate: 0.60
            }
          ]
        }
      ],
      list1: [
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        },
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        },
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        },
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        },
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        }
      ],
      list2: [
        {
          name: '中国',
          amount: 138
        },
        {
          name: '伊朗',
          amount: 180
        },
        {
          name: '泰国',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        },
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        },
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        },
        {
          name: '客户应收账款-广东应收账款二期兽兽 ',
          amount: 129
        },
        {
          name: '广西阳西二期',
          amount: 110
        }
      ]
    }
  }
})

Mock.mock(group.getCurrentPri, 'post', option => {
  return {
    code: 1,
    msg: 'success',
    data: {
      top: [
        {
          stage: '全球',
          count: 11069,
          amount: 70.42,
          rate: 0.39,
          c_unit: '个',
          a_unit: '亿元',
          b_unit: '%'
        },
        {
          stage: '海外',
          count: 2045,
          amount: 12.03,
          rate: 0,
          c_unit: '个',
          a_unit: '亿元',
          b_unit: '%'
        }
      ],
      left: [
        {
          stage: '电站集团',
          amount: 4567,
          rate: 60,
          a_unit: '亿元',
          color: '#43a1f8'
        },
        {
          stage: '风电集团',
          amount: 357,
          rate: 73,
          a_unit: '亿元',
          color: '#54ae32'
        },
        {
          stage: '核电集团',
          amount: 349,
          rate: 22,
          a_unit: '亿元',
          color: '#efbc40'
        },
        {
          stage: '输电集团',
          amount: 79,
          rate: 0.18,
          a_unit: '亿元',
          color: '#efcc40'
        }
      ],
      right: [
        {
          qtr_wid: '2017.Q1',
          amount: 912,
          rate: 0.60,
          a_unit: '亿元',
          color: '#43a1f8'
        },
        {
          qtr_wid: '2017.Q2',
          amount: 889,
          rate: 0.73,
          a_unit: '亿元',
          color: '#43a1f8'
        },
        {
          qtr_wid: '2017.Q3',
          amount: 442,
          rate: 0.22,
          a_unit: '亿元',
          color: '#43a1f8'
        },
        {
          qtr_wid: '2017.Q4',
          amount: 332,
          rate: 0.18,
          a_unit: '亿元',
          color: '#43a1f8'
        }
      ],
      list1: [
        {
          name: '客户应收账款',
          amount: 137.9
        },
        {
          name: '广西阳西二期',
          amount: 137.9
        }
      ],
      list2: [
        {
          name: '客户应收账款',
          amount: 137.9
        },
        {
          name: '广西阳西二期',
          amount: 137.9
        }
      ]
    }
  }
})

/**
 * @author zhoucx
 * @description mockjs 模拟电站数据开发接口
 * 接口返回数据格式说明:
 * code: 请求状态编码，0 - 失败，1 - 成功
 * msg:请求信息，成功返回success，失败返回具体错误信息
 * data:具体的接口数据
 * 订单列表模拟数据
 * BOTTOM1:底部1用 STAGE:项目类别 COUNT:个数 RATE:金额 C_UNIT:单位 COLOR:颜色
 * BOTTOM2:底部2用 STAGE:订单类别 COUNT:个数 AMOUNT:金额 C_UNIT:数量单位 A_UNIT:金额单位 COLOR:颜色
 * LIST1:
    NAME:项目名称 AMOUNT:金额
  LIST2:
    COUNTRY:国家 COUNT:个数
 * LISTCOLOR: 列表表头颜色 STAGE:状态 COLOR:颜色
 * MAP:地图用
    time:切屏时间
    flag:切屏状态
    comment:备注
    STAGE:项目状态
    long:经度,
    lat:维度
    color:颜色
 */
Mock.mock(group.getPowerSattion, 'post', option => {
  return {
    code: 1,
    msg: 'success',
    data: {
      bottom1: [
        {
          stage: '线索项目',
          count: 273,
          rate: 0.05,
          c_unit: '个',
          color: '#00a3ff'
        },
        {
          stage: '投标项目',
          count: 169,
          rate: 0.04,
          c_unit: '个',
          color: '#5ed327'
        }
      ],
      bottom2: [
        {
          stage: '新接订单',
          count: 7859,
          amount: 4567.2,
          a_unit: '亿元',
          c_unit: '个',
          color: '#fbe231'
        },
        {
          stage: '在手订单',
          count: 7859,
          amount: 4567.2,
          a_unit: '亿元',
          c_unit: '个',
          color: '#d75f01'
        }
      ],
      list1: [
        {
          name: '新机-昊阳',
          amount: 3.2
        },
        {
          name: '中化泉州',
          amount: 3.2
        },
        {
          name: '国电聊城电厂抽聊城电城电厂',
          amount: 3.6
        }
      ],
      list2: [
        {
          name: '中国',
          amount: 3.2
        },
        {
          name: '印度尼西亚',
          amount: 3.2
        }
      ],
      rang: [
        {
          'min': 0,
          'color': '#0a2445',
          'max': 0,
          'text': '空白区域'
        },
        {
          'min': 0,
          'color': '#1951d2',
          'max': 1,
          'text': '0-1亿元'
        },
        {
          'min': 1,
          'color': '#1dcbc9',
          'max': 10,
          'text': '1-10亿元'
        },
        {
          'min': 10,
          'color': '#578af8',
          'max': 50,
          'text': '10-50亿元'
        },
        {
          'min': 50,
          'color': '#53b435',
          'max': 100,
          'text': '50-100亿元'
        },
        {
          'min': 100,
          'color': '#fccb5e',
          'max': 500,
          'text': '100-500亿元'
        },
        {
          'min': 500,
          'color': '#f2824d',
          'max': 10000,
          'text': '>500亿元'
        }
      ],
      countryList: [{
        'amount': 4998.949,
        'COUNTRY': '中国'
      }, {
        'amount': 131.144,
        'COUNTRY': '印度'
      }, {
        'amount': 112.362,
        'COUNTRY': '越南'
      }, {
        'amount': 89.471,
        'COUNTRY': '伊朗'
      }, {
        'amount': 59.016,
        'COUNTRY': '印度尼西亚'
      }, {
        'amount': 57.888,
        'COUNTRY': '赞比亚'
      }, {
        'amount': 36.415,
        'COUNTRY': '伊拉克'
      }, {
        'amount': 1.723,
        'COUNTRY': '意大利'
      }],
      map: [
        {
          time: 5000,
          flag: '1',
          comment: '数据来源于上海电气SAP系统',
          list: [
            {
              stage: '线索项',
              color: '#00a3ff',
              long: 102.188043,
              lat: 38.520089
            },
            {
              stage: '投标项目',
              color: '#5ed327',
              long: 101.718637,
              lat: 26.582347
            }
          ]
        },
        {
          time: 3000,
          flag: '2',
          comment: '数据来源于上海电气SMPG系统',
          list: [
            {
              stage: '新接订单',
              color: '#fbe231',
              long: 102.188043,
              lat: 38.520089
            },
            {
              stage: '投标项目',
              color: '#d75f01',
              long: 101.718637,
              lat: 26.582347
            }
          ]
        }
      ]
    }
  }
})

/**
 * @author zhoucx
 * @description mockjs 模拟核电和输配电数据开发接口
 * 接口返回数据格式说明:
 * code: 请求状态编码，0 - 失败，1 - 成功
 * msg:请求信息，成功返回success，失败返回具体错误信息
 * data:具体的接口数据
 * 订单列表模拟数据
 * BOTTOM1:底部2用 STAGE:订单类别 COUNT:个数 AMOUNT:金额 C_UNIT:数量单位 A_UNIT:金额单位 COLOR:颜色
 * LIST1:
    NAME:项目名称 AMOUNT:金额
  LIST2:
    COUNTRY:国家 COUNT:个数
 * LISTCOLOR: 列表表头颜色 STAGE:状态 COLOR:颜色
 * MAP:地图用
    STAGE:项目状态
    long:经度,
    lat:维度
    color:颜色
 */
Mock.mock(group.getNuclTranStation, 'post', option => {
  return {
    code: 1,
    msg: 'success',
    data: {
      bottom1: [
        {
          stage: '新接订单',
          count: 7859,
          amount: 4567.2,
          a_unit: '亿元',
          c_unit: '个',
          color: '#fbe231'
        },
        {
          stage: '在手订单',
          count: 7859,
          amount: 4567.2,
          a_unit: '亿元',
          c_unit: '个',
          color: '#d75f01'
        }
      ],
      list1: [
        {
          name: '新机-昊阳',
          amount: 3.2
        },
        {
          name: '中化泉州',
          amount: 3.2
        }
      ],
      list2: [
        {
          name: '中国',
          amount: 3.2
        },
        {
          name: '印度尼西亚',
          amount: 3.2
        }
      ],
      // list_color: [
      //   {
      //     stage: '新接订单金额TOP10',
      //     color: '#00a3ff'
      //   },
      //   {
      //     stage: '投标项目全球分布',
      //     color: '#d75f01'
      //   }
      // ],
      map: [
        {
          stage: '新接订单',
          color: '#fbe231',
          long: 102.188043,
          lat: 38.520089
        },
        {
          stage: '投标项目',
          color: '#d75f01',
          long: 101.718637,
          lat: 26.582347
        }
      ]
    }
  }
})

Mock.mock(group.getByChangeTimePrj, 'post', option => {
  return {
    code: 1,
    msg: 'success',
    data: {
      changTime: {
        stage: '大屏',
        time: 10000
      }
    }
  }
})

/**
 * @author zhoucx
 * @description mockjs 模拟经营概览数据开发接口
 * 接口返回数据格式说明:
 * code: 请求状态编码，0 - 失败，1 - 成功
 * msg:请求信息，成功返回success，失败返回具体错误信息
 * data:具体的接口数据
 * 订单列表模拟数据
 * color: 字体颜色和标识
 * title: 内容主题
 * sale: 销售额
 * slx: 单位
 * list: 图表数据
 */
Mock.mock(group.getOverView, 'post', option => {
  return {
    code: 1,
    msg: 'success',
    data: {
      income: {
        color: '#17A4FF',
        title: '营业收入',
        slx: '亿元',
        flag: 1,
        list: [{
          stage: '电站集团',
          amount: 161.01046084
        },
        {
          stage: '风电集团',
          amount: 14.09418644
        },
        {
          stage: '核电集团',
          amount: 14.2147203
        },
        {
          stage: '输配电集团',
          amount: 63.56604938
        },
        {
          stage: '机电股份',
          amount: 111.56597298
        },
        {
          stage: '金融集团',
          amount: 2.07714242
        },
        {
          stage: '环保集团',
          amount: 6.89119792
        },
        {
          stage: '自动化集团',
          amount: 17.57394108
        },
        {
          stage: '三棱电梯',
          amount: 103.98913246
        }]
      },
      profit: {
        color: '#17A4FF',
        title: '净利润',
        slx: '亿元',
        flag: 2,
        list: [{
          stage: '电站集团',
          amount: 100
        },
        {
          stage: '风电集团',
          amount: 50
        },
        {
          stage: '核电集团',
          amount: 20
        },
        {
          stage: '输配电集团',
          amount: 10
        },
        {
          stage: '机电股份',
          amount: 6
        },
        {
          stage: '金融集团',
          amount: 4
        },
        {
          stage: '环保集团',
          amount: 2
        },
        {
          stage: '自动化集团',
          amount: 5
        },
        {
          stage: '三棱电梯',
          amount: 10
        }]
      },
      ar: {
        color: '#17A4FF',
        title: '应收',
        slx: '亿元',
        flag: 3,
        list: [{
          stage: '电站集团',
          amount: 334.99144128
        },
        {
          stage: '风电集团',
          amount: 138.70457192
        },
        {
          stage: '核电集团',
          amount: 17.04308878
        },
        {
          stage: '输配电集团',
          amount: 44.59584982
        },
        {
          stage: '机电股份',
          amount: 51.55581062
        },
        {
          stage: '金融集团',
          amount: 4.59511398
        },
        {
          stage: '环保集团',
          amount: 9.12909812
        },
        {
          stage: '自动化集团',
          amount: 10.54980504
        },
        {
          stage: '三棱电梯',
          amount: 49.34995304
        }]
      },
      inventory: {
        color: '#17A4FF',
        title: '存货',
        slx: '亿元',
        flag: 4,
        list: [{
          stage: '电站集团',
          amount: 435.37590034
        },
        {
          stage: '风电集团',
          amount: 42.99112568
        },
        {
          stage: '核电集团',
          amount: 69.92284754
        },
        {
          stage: '输配电集团',
          amount: 58.71625778
        },
        {
          stage: '机电股份',
          amount: 182.17816498
        },
        {
          stage: '金融集团',
          amount: 4.43455126
        },
        {
          stage: '环保集团',
          amount: 12.61908294
        },
        {
          stage: '自动化集团',
          amount: 17.00452818
        },
        {
          stage: '三棱电梯',
          amount: 171.90212102
        }]
      },
      sum: [{
        flag: 1,
        type: '营业收入',
        amount: 435.37590034
      },
      {
        flag: 2,
        type: '净利润',
        amount: 11
      },
      {
        flag: 3,
        type: '应收',
        amount: 1322.07455954
      },
      {
        flag: 4,
        type: '存货',
        amount: 1883.57427814
      }]
    }
  }
  /* return {
    code: 1,
    msg: 'success',
    data: [
      {
        color: '#17A4FF',
        title: '营业收入',
        sale: 353.47,
        slx: '亿元',
        flag: 1,
        list: [
          {
            stage: '电站集团',
            amount: 133.32
          },
          {
            stage: '风电集团',
            amount: 66.32
          },
          {
            stage: '核电集团',
            amount: 24.32
          },
          {
            stage: '输配电集团',
            amount: 58.32
          },
          {
            stage: '机电股份',
            amount: 37.32
          },
          {
            stage: '金融集团',
            amount: 53.32
          },
          {
            stage: '环保集团',
            amount: 83.32
          },
          {
            stage: '自动化集团',
            amount: 32.32
          },
          {
            stage: '三棱电梯',
            amount: 79.32
          }
        ]
      },
      {
        color: '#07D742',
        title: '净利润',
        sale: 10.34,
        slx: '亿元',
        flag: 2,
        list: [
          {
            stage: '电站集团',
            amount: 133.32
          },
          {
            stage: '风电集团',
            amount: 66.32
          },
          {
            stage: '核电集团',
            amount: 24.32
          },
          {
            stage: '输配电集团',
            amount: 58.32
          },
          {
            stage: '机电股份',
            amount: 37.32
          },
          {
            stage: '金融集团',
            amount: 53.32
          },
          {
            stage: '环保集团',
            amount: 83.32
          },
          {
            stage: '自动化集团',
            amount: 32.32
          },
          {
            stage: '三棱电梯',
            amount: 79.32
          }
        ]
      },
      {
        color: '#FEB62C',
        title: '应收',
        sale: 130.23,
        slx: '亿元',
        flag: 3,
        list: [
          {
            stage: '电站集团',
            amount: 133.32
          },
          {
            stage: '风电集团',
            amount: 66.32
          },
          {
            stage: '核电集团',
            amount: 24.32
          },
          {
            stage: '输配电集团',
            amount: 58.32
          },
          {
            stage: '机电股份',
            amount: 37.32
          },
          {
            stage: '金融集团',
            amount: 53.32
          },
          {
            stage: '环保集团',
            amount: 83.32
          },
          {
            stage: '自动化集团',
            amount: 32.32
          },
          {
            stage: '三棱电梯',
            amount: 79.32
          }
        ]
      },
      {
        color: '#9B88E9',
        title: '存货',
        sale: 10.88,
        slx: '亿元',
        flag: 4,
        list: [
          {
            stage: '电站集团',
            amount: 133.32
          },
          {
            stage: '风电集团',
            amount: 66.32
          },
          {
            stage: '核电集团',
            amount: 24.32
          },
          {
            stage: '输配电集团',
            amount: 58.32
          },
          {
            stage: '机电股份',
            amount: 37.32
          },
          {
            stage: '金融集团',
            amount: 53.32
          },
          {
            stage: '环保集团',
            amount: 83.32
          },
          {
            stage: '自动化集团',
            amount: 32.32
          },
          {
            stage: '三棱电梯',
            amount: 79.32
          }
        ]
      }
    ]
  } */
})
