<template>
  <div class="world-container">
     <!-- header -->
    <div class="header-title">
      <header-title :title="'电站集团订单总览'"></header-title>
    </div>
    <!-- content -->
    <div class="content-containerss">
      <!-- 上册世界地图部分   -->
      <div class="world-map">
        <world-chart :hotMapList="hotMapList" :seriesData="seriesData"></world-chart>
      </div>
      <!-- 下册项目介绍部分  -->
      <div class="world-project-instruct">
        <!-- <order-list></order-list> -->
        <single-order-list></single-order-list>
      </div>
      <!-- 右侧项目列表 -->
      <div class="world-project-list">
        <div class="world-top">
          <order-table-list :dataList="list1" :title="'新接订单金额订单TOP10'" :param="param" :dataType="'top'" :tableList="tableList"></order-table-list>
        </div>
        <div class="world-bottom">
          <bottom-table-list :dataList="list2" :title="'在手订单全球分布'" :param="param" :dataType="'bottom'" :tableList="bodyList"></bottom-table-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '../components/HeaderTitle'
import WorldChart from '../charts/WorldChart'
import OrderList from '../components/OrderList'
import OrderTableList from '../components/OrderTableList'
import BottomTableList from '../components/BottomTableList'
import SingleOrderList from '../components/SingleOrderList'
import axios from 'axios'
import { group } from '../../../assets/js/api'
export default {
  name: 'woldmap',
  data () {
    return {
      tableList: {
        proName: '项目名称',
        sales: '金额(亿元)'
      },
      bodyList: {
        proName: '国家',
        // sales: '数量(个)'
        sales: '金额(亿元)'
      },
      list1: [],
      list2: [],
      hotMapList: [],
      seriesData: [],
      // dataSource: group.getPowerSattion,
      param: {
        group_name: '电站集团'
      }
    }
  },
  methods: {
    synData (res) {
      if (res) {
        this.$store.commit('world/updatedMapList', res.map[1].list)
        this.$store.commit('world/updatedSingleBottom', res.bottom2)
        // this.$store.commit('world/updatedMapList', res.map)
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
            this.hotMapList = res.data.data.rang
            this.seriesData = res.data.data.countryList
            // console.log('hotmapList', res.data.data)
            this.cacheData.set('worldmap', JSON.stringify(res.data.data))
          }
          // console.log('电站数据', res)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    // try {
    //   if (JSON.parse(this.cacheData.get('worldmap'))) {
    //     this.synData(JSON.parse(this.cacheData.get('worldmap')))
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
    WorldChart,
    OrderList,
    BottomTableList,
    OrderTableList,
    SingleOrderList
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.world-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 px2rem(60) px2vh(74) px2rem(60);
  // justify-content: space-between;
  box-sizing: border-box;

  .header-title {
    height: px2vh(216);
    max-height: px2vh(216);
    box-sizing: border-box;

  }

  .content-containerss {
    position: relative;
    height: px2vh(1708);
    max-height: px2vh(1708);
    justify-content: space-between;
    align-content: space-between;

    .world-map {
      width: 100%;
      height: px2vh(1430);
      box-sizing: border-box;
    }

    .world-project-instruct {
      width: px2rem(2769);
      height: px2vh(273);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }

    .world-project-list {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: px2rem(661);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .world-top {
        // height: px2vh(846);
        height: px2vh(999);
      }

      .world-bottom {
        // height: px2vh(843);
        height: px2vh(692);
      }
    }
  }
}
</style>
