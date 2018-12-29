const store = {
  namespaced: true,
  state: {
    seaLandData: [{
      'seaLand': 'sea',
      'wfCount': 15,
      'cpWfCount': 5
    }, {
      'seaLand': 'land',
      'wfCount': 30,
      'cpWfCount': 10
    }]
  },
  mutations: {
    setSeaLandData (state, seaLandData) {
      state.seaLandData = seaLandData
    }
  }
}

export default store
