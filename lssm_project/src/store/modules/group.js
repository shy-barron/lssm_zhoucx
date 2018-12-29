const group = {
  namespaced: true,
  state: {
    orderList: [], // 头部指标列表数据
    pieList: [], // 饼图数据
    lineList: [], // 新接右侧折线数据
    linebar: [], // 在手右侧柱行
    listTop: [], // 右侧上方列表数据
    listBottom: [], // 右侧下方列表数据
    roll: 'false', // 控制页面切屏
    timeOut: 10000 // 页面切屏时间
  },
  mutations: {
    updatedRoll (state, sec) { // 更新页面切屏
      state.roll = sec
    },
    updatedTimeOut (state, time) { // 更新页面切屏时间
      state.timeOut = time
    },
    updatedOrderList (state, list) {
      state.orderList = list
    },
    updatedPieList (state, list) {
      state.pieList = list
    },
    updatedLineList (state, list) {
      state.lineList = list
    },
    updatedLinebar (state, list) {
      state.linebar = list
    },
    updatedListTop (state, list) {
      state.listTop = list
    },
    updatedListBottom (state, list) {
      state.listBottom = list
    }
  },
  actions: {}
}

export default group
