import Vue from 'vue'
import Vuex from 'vuex'
import Config from '../assets/js/config'
import wind from './modules/wind'
import group from './modules/group'
import world from './modules/world'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentPageIndex: 0,
    currentProjectIndex: 0,
    currentCountry: '中国',
    currentPeriod: '20170101',
    user: 'demo1',
    mapList: []
  },
  getters: {
    getMapList: state => {
      return state.mapList.filter(item => {
        return item.code.indexOf('map') > -1
      })
    },
    getProjectStatus: state => {
      let mapList = state.mapList.filter(item => {
        return item.code.indexOf('map') > -1
      })
      if (mapList.length === 0) {
        return ''
      }
      return mapList[state.currentProjectIndex].datavalue
    },
    getTopList: state => {
      return state.mapList.filter(item => {
        return item.code.indexOf('top') > -1
      })
    },
    getBottomList: state => {
      return state.mapList.filter(item => {
        return item.code.indexOf('bot') > -1
      })
    },
    getGroupConfig: (state) => (group) => {
      let groupList = state.mapList.filter(item => {
        return item.datavalue === group
      })
      return Config.group[groupList[0].code]
    }
  },
  mutations: {
    updatePageIndex (state, index) {
      state.currentPageIndex = index
    },
    updateProjectIndex (state, index) {
      state.currentProjectIndex = index
    },
    updateCountry (state, country) {
      state.currentCountry = country
    },
    updateMapList (state, mapList) {
      state.mapList = mapList || []
    }
  },
  modules: {
    wind,
    group,
    world
  }
})

export default store
