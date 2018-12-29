<template>
<!-- 核电 -->
  <div class="distribution">
    <base-layout>
    <!-- 列表头 -->
      <header-title :title="'核电集团订单概览'" slot="my-header"></header-title>
      <!-- 左侧列表 -->
      <order-table-list :dataList="list1" :title="'新接订单金额TOP10'" :param="param" :dataType="'top'" :tableList="tableList" slot="order-table-list-left"></order-table-list>
      <!-- 中间地图 -->
      <china-chart :slat="'SM'" slot="china-chart"></china-chart>
      <!-- 右侧列表 -->
       <order-table-list :dataList="list2" :title="'在手订单金额TOP10'" :param="param" :dataType="'bottom'" :tableList="bodyList" slot="order-table-list-right"></order-table-list>
       <!-- 下册颜色标识 -->
       <single-order-list slot="order-list-bottom"></single-order-list>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from '../components/BaseLayout'
import HeaderTitle from '../components/HeaderTitle'
import OrderTableList from '../components/OrderTableList'
import ChinaChart from '../charts/ChinaChart'
import SingleOrderList from '../components/SingleOrderList'
import axios from 'axios'
import { group } from '../../../assets/js/api'
export default {
  name: 'ChinaPower',
  data () {
    return {
      tableList: {
        proName: '项目名称',
        sales: '金额(亿元)'
      },
      bodyList: {
        proName: '项目名称',
        sales: '金额(亿元)'
      },
      timeId: undefined,
      list1: [],
      list2: [],
      // dataSource: group.getNuclTranStation,
      param: {
        group_name: '核电集团'
      }
    }
  },
  methods: {
    synData (res) {
      if (res) {
        this.$store.commit('world/updatedMapList', res.map)
        this.$store.commit('world/updatedSingleBottom', res.bottom1)
        // this.$store.commit('world/updatedBottomRight', res.bottom2)
        this.list1 = res.list1
        this.list2 = res.list2
      }
    },
    changeRoute () {
      if (this.roll && this.timeOut && this.roll === 'true') {
        // console.log('roll, timeOut', this.roll, this.timeOut)
        if (this.timeId) {
          clearTimeout(this.timeId)
        }
        this.timeId = setTimeout(() => {
          this.$router.push({path: 'distribution'})
        }, this.timeOut)
      }
    },
    getData () {
      try {
        return axios.post(group.getNuclTranStation, JSON.stringify(this.param), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.data.data && res.data.msg === 'success' && res.status === 200) {
            this.synData(res.data.data)
            this.changeRoute()
            this.cacheData.set('ChinaPower', JSON.stringify(res.data.data))
            // this.$store.commit('world/updatedMapList', res.data.data.map)
            // this.$store.commit('world/updatedSingleBottom', res.data.data.bottom1)
            // this.list1 = res.data.data.list1
            // this.list2 = res.data.data.list2
            // console.log('输配电数据', res.data.data)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    roll () {
      return this.$store.state.group.roll
    },
    timeOut () {
      return this.$store.state.group.timeOut
    }
  },
  created () {
    // try {
    //   if (JSON.parse(this.cacheData.get('ChinaPower'))) {
    //     this.synData(JSON.parse(this.cacheData.get('ChinaPower')))
    //   }
    //   this.getData()
    // } catch (error) {
    //   console.log(error)
    // }
    this.getData()
  },
  beforeDestroy () {
    if (this.timeId) {
      clearTimeout(this.timeId)
    }
  },
  components: {
    HeaderTitle,
    OrderTableList,
    ChinaChart,
    BaseLayout,
    SingleOrderList
  }
}
</script>

<style lang="scss" scoped>
.distribution {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
