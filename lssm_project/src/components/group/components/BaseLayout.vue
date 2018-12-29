<template>
  <div class="base-layout">
     <!-- header -->
    <div class="header-title">
      <slot name="my-header"></slot>
    </div>
    <!-- content -->
    <div class="content-container">
      <div class="map-list">
        <!-- left-list -->
        <div class="left-list list-grid">
          <slot name="order-table-list-left"></slot>
          <!-- <order-table-list></order-table-list> -->
        </div>
        <!-- middle-chinaMap -->
        <div class="middle-map">
          <slot name="china-chart"></slot>
          <!-- <china-chart></china-chart> -->
        </div>
        <!-- right-list -->
        <div class="right-list list-grid">
          <slot name="order-table-list-right"></slot>
          <!-- <order-table-list></order-table-list> -->
        </div>
      </div>
      <!-- bottom-project-instruct -->
      <div class="order-list">
        <slot name="order-list-bottom"></slot>
        <!-- <order-list></order-list> -->
      </div>
    </div>
  </div>
</template>

<script>
// import HeaderTitle from '../components/HeaderTitle'
// import OrderTableList from '../components/OrderTableList'
// import ChinaChart from '../charts/ChinaChart'
// import OrderList from '../components/OrderList'
// import axios from 'axios'
// import { group } from '../../../assets/js/api'
export default {
  name: 'base-layout'
  // methods: {
  //   getData () {
  //     try {
  //       return axios.post(group.getPowerSattion).then((res) => {
  //         if (res.data.data && res.data.msg === 'success' && res.status === 200) {
  //           this.$store.commit('world/updatedMapList', res.data.data.map)
  //           this.$store.commit('world/updatedBottomLeft', res.data.data.bottom1)
  //           this.$store.commit('world/updatedBottomRight', res.data.data.bottom2)
  //         }
  //         console.log('风电数据', res)
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // },
  // created () {
  //   this.getData()
  // },
  // components: {
  //   HeaderTitle,
  //   OrderTableList,
  //   ChinaChart,
  //   OrderList
  // }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.base-layout {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 px2rem(62) px2vh(79) px2rem(62);
  box-sizing: border-box;

  .header-title {
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
