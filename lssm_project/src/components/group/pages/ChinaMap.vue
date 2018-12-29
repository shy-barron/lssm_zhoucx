<template>
<!-- 风电 -->
  <div class="china-container">
     <!-- header -->
    <div class="header-title">
      <header-title :title="'风电集团订单总览'"></header-title>
    </div>
    <!-- content -->
    <div class="content-container">
      <div class="map-list">
        <!-- left-list -->
        <div class="left-list list-grid">
          <order-table-list :dataList="list1" :title="'新接订单金额TOP10'" :param="param" :dataType="'top'" :tableList="tableList"></order-table-list>
        </div>
        <!-- middle-chinaMap -->
        <div class="middle-map">
          <china-chart :slat="'SM'"></china-chart>
        </div>
        <!-- right-list -->
        <div class="right-list list-grid">
          <order-table-list :dataList="list2" :title="'在手订单金额TOP10'" :param="param" :dataType="'bottom'" :tableList="bodyList"></order-table-list>
        </div>
      </div>
      <!-- bottom-project-instruct -->
      <div class="order-list">
        <single-order-list></single-order-list>
        <!-- <order-list></order-list> -->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '../components/HeaderTitle'
import OrderTableList from '../components/OrderTableList'
import ChinaChart from '../charts/ChinaChart'
import OrderList from '../components/OrderList'
import SingleOrderList from '../components/SingleOrderList'
import axios from 'axios'
import { group } from '../../../assets/js/api'
export default {
  name: 'ChinaMap',
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
      // dataSource: group.getPowerSattion,
      param: {
        group_name: '风电集团'
      }
    }
  },
  methods: {
    changeRoute () {
      if (this.roll && this.timeOut && this.roll === 'true') {
        // console.log('roll, timeOut', this.roll, this.timeOut)
        if (this.timeId) {
          clearTimeout(this.timeId)
        }
        this.timeId = setTimeout(() => {
          this.$router.push({path: 'wind'})
        }, this.timeOut)
      }
    },
    synData (res) {
      if (res) {
        this.$store.commit('world/updatedMapList', res.map[1].list)
        this.$store.commit('world/updatedSingleBottom', res.bottom2)
        // this.$store.commit('world/updatedBottomLeft', res.bottom1)
        // this.$store.commit('world/updatedBottomRight', res.bottom2)
        this.list1 = res.list1
        this.list2 = res.list2
      }
    },
    getData () {
      try {
        return axios.post(group.getPowerSattion, JSON.stringify(this.param), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.data.data && res.data.msg === 'success' && res.status === 200) {
            this.synData(res.data.data)
            this.cacheData.set(group.getPowerSattion, JSON.stringify(res.data.data))
            // this.$store.commit('world/updatedMapList', res.data.data.map)
            // this.$store.commit('world/updatedBottomLeft', res.data.data.bottom1)
            // this.$store.commit('world/updatedBottomRight', res.data.data.bottom2)
            // this.list1 = res.data.data.list1
            // this.list2 = res.data.data.list2
          }
          this.changeRoute()
          // console.log('风电数据', res)
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
    //   if (JSON.parse(this.cacheData.get(group.getPowerSattion))) {
    //     this.synData(JSON.parse(this.cacheData.get(group.getPowerSattion)))
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
    SingleOrderList,
    OrderList
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.china-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 px2rem(60) px2vh(74) px2rem(60);
  box-sizing: border-box;

  .header-title {
    // height: px2vh(216);
    // max-height: px2vh(216);
    height: px2vh(210);
    max-height: px2vh(210);
    padding-bottom: px2rem(20);
    box-sizing: border-box;
  }

  .content-container {
    width: 100%;
    height: px2vh(1733);
    box-sizing: border-box;

    .map-list {
      height: px2vh(1446);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .list-grid {
        width: px2rem(735);
        height: px2vh(1022);
      }

      .middle-map {
        height: 100%;
        // width: px2rem(1990);
        flex-grow: 1;
        box-sizing: border-box;
      }
    }

    .order-list {
      height: px2vh(273);
      width: 100%;
    }
  }
}
</style>
