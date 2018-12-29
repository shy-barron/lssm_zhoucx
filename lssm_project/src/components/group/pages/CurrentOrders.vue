<template>
  <!-- 新接订单页 -->
  <div class="page-new-orders">
    <layout>
      <!-- 头部项目标题 -->
      <header-title :title="'在手销售订单'" slot="my-header"></header-title>
      <!-- 头部指标列表 -->
      <order-index-list :proName="'在手'" slot="content-left-top"></order-index-list>
      <!-- 左下柱饼图 -->
      <order-pie slot="content-left-bottom-left"></order-pie>
      <!-- 左下线图 -->
      <order-bar-line :typeLine="'new'" :title="'海外在手订单占比'" slot="content-left-bottom-right"></order-bar-line>
      <!-- 右上表格列表 -->
      <order-table-list :dataList="list1" :title="'在手订单金额TOP10'" :dataType="'top'" :tableList="tableList" slot="content-right-top"></order-table-list>
      <!-- 右下表格列表 -->
      <bottom-table-list :dataList="list2" :dataType="'bottom'" :tableList="bodyList" :title="'在手订单全球分布'" slot="content-right-bottom"></bottom-table-list>
    </layout>
  </div>
</template>

<script>
import Layout from '../components/Layout'
import OrderIndexList from '../components/OrderIndexList'
import OrderPie from '../components/OrderPie'
import OrderTableList from '../components/OrderTableList'
import OrderBarLine from '../components/OrderBarLine'
import HeaderTitle from '../components/HeaderTitle'
import BottomTableList from '../components/BottomTableList'
import axios from 'axios'
import { group } from '../../../assets/js/api'

export default {
  name: 'NewOrders',
  data () {
    return {
      tableList: {
        proName: '项目',
        sales: '金额(亿元)'
      },
      bodyList: {
        proName: '国家',
        sales: '金额(亿元)'
      },
      list1: [],
      list2: [],
      timeId: undefined // 定时器柄
      // dataSource: group.getCurrentPri
    }
  },
  methods: {
    synData (res) {
      if (res) {
        this.$store.commit('group/updatedPieList', res.left) // 上面数据统计
        this.$store.commit('group/updatedOrderList', res.top)
        this.$store.commit('group/updatedLinebar', res.right)
        this.list1 = res.list1
        this.list2 = res.list2
      }
    },
    getOrderList () {
      try {
        return axios.post(group.getCurrentPri).then((res) => {
          if (res.data.data && res.data.msg === 'success' && res.status === 200) {
            this.synData(res.data.data)
            this.cacheData.set(group.getCurrentPri, JSON.stringify(res.data.data))
          } else {
            this.$store.commit('group/updatedOrderList', [])
          }
          if (this.roll && this.timeOut && this.roll === 'true') {
            if (this.timeId) {
              clearTimeout(this.timeId)
            }
            this.timeId = setTimeout(() => {
              this.$router.push({path: 'world-map'})
            }, this.timeOut)
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
    //   if (JSON.parse(this.cacheData.get(group.getCurrentPri))) {
    //     console.log('cacheData', JSON.parse(this.cacheData.get(group.getCurrentPri)))
    //     this.synData(JSON.parse(this.cacheData.get(group.getCurrentPri)))
    //   }
    //   this.getOrderList()
    // } catch (error) {
    //   console.log(error)
    // }
    this.getOrderList()
  },
  mounted () {
  },
  beforeDestroy () {
    if (this.timeId) {
      clearTimeout(this.timeId)
    }
    this.$store.commit('group/updatedPieList', [])
  },
  components: {
    Layout,
    OrderIndexList,
    OrderPie,
    OrderTableList,
    OrderBarLine,
    BottomTableList,
    HeaderTitle
  }
}
</script>

<style lang="scss" scoped>
.page-new-orders {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
