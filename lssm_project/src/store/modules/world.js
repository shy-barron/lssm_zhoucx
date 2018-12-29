const world = {
  namespaced: true,
  state: {
    mapList: [], // 地图数据
    bottomLeft: [], // 项目数据列表
    bottomRight: [], // 订单列表
    singleBottom: [], // 输配电和核电的数据
    activeIndex: 0 // 默认激活索引
  },
  mutations: {
    updatedMapList (state, list) {
      // console.log('世界地图数据', list)
      state.mapList = list
    },
    updatedBottomLeft (state, list) {
      state.bottomLeft = list
    },
    updatedBottomRight (state, list) {
      state.bottomRight = list
    },
    updatedActiveIndex (state, index) {
      state.activeIndex = index
    },
    updatedSingleBottom (state, list) {
      state.singleBottom = list
    }
  },
  actions: {}
}

export default world
