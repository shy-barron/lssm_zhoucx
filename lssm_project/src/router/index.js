// import API from '../assets/js/api'
// import axios from 'axios'

import Vue from 'vue'
import Router from 'vue-router'
/* 旧的大屏 */
// import ChinaPage from '../components/pages/ChinaPage.vue'
// import WorldPage from '../components/pages/WorldPage.vue'
// import ProjectPage from '../components/pages/ProjectPage.vue'

/* 风场大屏 */
import WindPage from '../components/wind/WindPage.vue'

/* 新重构的大屏 */
import GroupPage from '../components/group/GroupPage.vue'
import NewOrders from '../components/group/pages/NewOrders.vue'
import CurrentOrders from '../components/group/pages/CurrentOrders.vue'
import WorldMap from '../components/group/pages/WorldMap.vue'
import ChinaMap from '../components/group/pages/ChinaMap.vue'
import Distribution from '../components/group/pages/Distribution.vue'
import ChinaPower from '../components/group/pages/ChinaPower'
import OverView from '../components/group/pages/OverView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页是新接订单
    {
      path: '/',
      component: GroupPage,
      children: [
        // 经营总览
        {
          path: '/',
          name: 'OverView',
          component: OverView
        },
        // 新接销售订单
        {
          path: 'new-order',
          name: 'NewOrders',
          component: NewOrders
        },
        // 在手销售订单
        {
          path: 'current-order',
          name: 'CurrentOrders',
          component: CurrentOrders
        },
        // 电站集团项目概览
        {
          path: 'world-map',
          name: 'worldmap',
          component: WorldMap
        },
        // 风电集团项目概览
        {
          path: 'china-map',
          name: 'ChinaMap',
          component: ChinaMap
        },
        // 风电大屏
        {
          path: 'wind',
          name: 'WindPage',
          component: WindPage
        },
        // 核电集团订单概览
        {
          path: 'china-power',
          name: 'ChinaPower',
          component: ChinaPower
        },
        // 输配电集团订单概览
        {
          path: 'distribution',
          name: 'Distribution',
          component: Distribution
        }
      ]
    }
    /* 这个router配置必须排第二 */
    // {
    //   path: '/',
    //   component: ProjectPage,
    //   children: [
    //     {
    //       path: '/china',
    //       name: 'ChinaPage',
    //       component: ChinaPage
    //     },
    //     {
    //       path: '/world',
    //       name: 'WorldPage',
    //       component: WorldPage
    //     }
    //   ]
    // },
    // {
    //   path: '/wind',
    //   name: 'WindPage',
    //   component: WindPage
    // }
  ]
})
