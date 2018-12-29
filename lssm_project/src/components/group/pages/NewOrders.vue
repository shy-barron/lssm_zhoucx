<template>
  <div class="page-currrent-orders">
    <layout>
      <!-- 头部项目标题 -->
      <header-title :title="'新接销售订单'" slot="my-header"></header-title>
      <!-- 头部指标列表 -->
      <order-index-list  :proName="'新接'" slot="content-left-top"></order-index-list>
      <!-- 左下柱线图 -->
      <order-bar-line :typeLine="'current'" slot="content-left-bottom-left"></order-bar-line>
      <!-- 左下线图 -->
      <order-line slot="content-left-bottom-right"></order-line>
      <!-- 右上表格列表 -->
      <order-table-list :dataList='list1' :dataType="'top'" :tableList="tableList" :title="'新接订单TOP10'" slot="content-right-top"></order-table-list>
      <!-- 右下表格列表 -->
      <bottom-table-list :dataList="list2" :dataType="'bottom'" :tableList="bodyList" :title="'新接订单全球分布'" slot="content-right-bottom"></bottom-table-list>
    </layout>
  </div>
</template>

<script>
import Layout from '../components/Layout'
import OrderIndexList from '../components/OrderIndexList'
import OrderBarLine from '../components/OrderBarLine'
import OrderTableList from '../components/OrderTableList'
import OrderLine from '../components/OrderLine'
import HeaderTitle from '../components/HeaderTitle'
import BottomTableList from '../components/BottomTableList'
import axios from 'axios'
import { group } from '../../../assets/js/api'

export default {
  name: 'CurrentOrders',
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
      timeId: undefined,
      list1: [], // 第一表格数据
      list2: [] // 第二表格数据
      // dataSource: group.getSevenPrj
    }
  },
  methods: {
    synData (response) {
      if (response) {
        let result = response
        this.$store.commit('group/updatedLinebar', result.left)
        this.$store.commit('group/updatedOrderList', result.top)
        this.$store.commit('group/updatedLineList', result.right)
        this.list1 = result.list1
        this.list2 = result.list2
      }
    },
    getOrderList () {
      try {
        return axios.post(group.getSevenPrj).then((res) => {
          // console.log('res', res)
          if (res.data.data && res.data.msg === 'success' && res.status === 200) {
            this.synData(res.data.data)
            this.cacheData.set(group.getSevenPrj, JSON.stringify(res.data.data))
            // this.$store.commit('group/updatedLinebar', res.data.data.left)
            // this.$store.commit('group/updatedOrderList', res.data.data.top)
            // this.$store.commit('group/updatedLineList', res.data.data.right)
            // this.list1 = res.data.data.list1
            // this.list2 = res.data.data.list2
          } else {
            this.$store.commit('group/updatedOrderList', [])
          }
          if (this.roll && this.timeOut && this.roll === 'true') {
            // console.log('roll, timeOut', this.roll, this.timeOut)
            if (this.timeId) {
              clearTimeout(this.timeId)
            }
            this.timeId = setTimeout(() => {
              this.$router.push({path: 'current-order'})
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
    //   if (JSON.parse(this.cacheData.get(group.getSevenPrj))) {
    //     this.synData(JSON.parse(this.cacheData.get(group.getSevenPrj)))
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
  },
  components: {
    Layout,
    OrderIndexList,
    OrderBarLine,
    OrderTableList,
    OrderLine,
    BottomTableList,
    HeaderTitle
  }
}
</script>

<style lang="scss" scoped>
.page-currrent-orders {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
