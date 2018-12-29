<template>
  <section class="page-china">
    <section class="panel-middel">
      <section class="panel-left">
        <scroll-table-province v-if="showLeftProvinceTable"></scroll-table-province>
        <scroll-table-left v-else></scroll-table-left>
      </section>
      <section class="panel-china">
        <china-map></china-map>
      </section>
      <section class="panel-right">
        <scroll-table-right v-if="showRightTable"></scroll-table-right>
      </section>
    </section>
    <section class="panel-bottom">
      <text-list-view :text-list="textList"></text-list-view>
    </section>
  </section>
</template>

<script>
import axios from 'axios'
import API from '../../assets/js/api'
import ScrollTableProvince from '../charts/SrcollTableProvince'
import ScrollTableRight from '../charts/ScrollTableRight'
import ScrollTableLeft from '../charts/ScrollTableLeft'
import ChinaMap from '../charts/ChinaMap'
import TextListView from '../charts/TextListView'

export default {
  name: 'ChinaPage',
  data () {
    return {
      textList: []
    }
  },
  computed: {
    // 当前项目阶段索引
    currentProjectIndex () {
      return this.$store.state.currentProjectIndex
    },
    showRightTable () {
      return this.$store.state.currentProjectIndex === 3
    },
    showLeftProvinceTable () {
      return this.$store.state.currentProjectIndex === 0 || this.$store.state.currentProjectIndex === 1
    }
  },
  created () {
    this.$store.commit('updateCountry', '中国')
    this.loadBottomData()
  },
  watch: {
    currentProjectIndex () {
      this.loadBottomData()
    }
  },
  methods: {
    loadBottomData () {
      axios.post(API.bottom, {
        user: this.$store.state.user,
        period: this.$store.state.currentPeriod,
        projectStatus: this.$store.getters.getMapList[this.currentProjectIndex].datavalue,
        country: this.$store.state.currentCountry
      }).then(response => {
        const result = response.data.data
        this.textList = []
        for (let item of result) {
          let itemCode = this.$store.getters.getBottomList.filter(map => {
            return map.datavalue === item.grop
          })
          this.textList.push({
            group: itemCode[0].value,
            icon: this.$store.getters.getGroupConfig(item.grop).icon,
            quantity: item.orderQty,
            amount: item.orderAmount
          })
        }
      }).catch(error => {
        console.error(error)
      })
    }
  },
  components: {
    ScrollTableProvince,
    ScrollTableRight,
    ScrollTableLeft,
    ChinaMap,
    TextListView
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
.page-china {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  flex: auto;

  .panel-middel {
    position: relative;
    display: flex;
    flex: auto;
    justify-content: space-between;

    .panel-left {
      position: relative;
      width: px2rem(710);
      height: 100%;

      // .panel-timer {
      //   position: absolute;
      //   top: 1vh;
      //   left: 0;
      //   width: px2rem(582);
      //   height: px2vh(160);
      // }
    }

    .panel-china {
      position: absolute;
      left: 50%;
      top: 2vh;
      width: px2rem(3000);
      margin-left: px2rem(-2900 / 2);
      height: 100%;

      .panel-slider {
        position: fixed;
        z-index: 99;
        left: 50%;
        top: px2vh(160);
        margin-left: px2rem(-1320 / 2);
        width: px2rem(1320);
        height: px2vh(180);
      }
    }

    .panel-right {
      width: px2rem(725);
      height: 100%;
    }
  }

  .panel-bottom {
    display: flex;
    justify-content: center;
    height: px2vh(153);
  }
}
</style>
