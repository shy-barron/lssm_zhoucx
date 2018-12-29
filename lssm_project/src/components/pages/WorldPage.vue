<template>
  <section class="page-world">
    <section class="panel panel-middel">
      <section class="panel-china">
        <world-map></world-map>
      </section>
    </section>
    <section class="panel panel-bottom">
      <text-list-view :text-list="textList"></text-list-view>
    </section>
    <section class="panel-table">
      <scroll-table-province class="small" :theme="tableProvinceTheme" v-if="showLeftProvinceTable"></scroll-table-province>
      <scroll-table-right class="table-world" :theme="tableRightTheme" v-else></scroll-table-right>
    </section>
  </section>
</template>

<script>
import axios from 'axios'
import Config from '../../assets/js/config'
import API from '../../assets/js/api'
import ScrollTableProvince from '../charts/SrcollTableProvince'
import ScrollTableRight from '../charts/ScrollTableRight'
import WorldMap from '../charts/WorldMap.vue'
import TextListView from '../charts/TextListView'

export default {
  name: 'WorldPage',
  data () {
    return {
      tableRightTheme: {
        'top': 0,
        'height': '100%',
        'font-size': window.lib.px2rem(32) + 'rem'
      },
      tableProvinceTheme: {
        'top': 0,
        'height': '100%',
        'font-size': window.lib.px2rem(32) + 'rem',
        'pading-left': window.lib.px2rem(30) + 'rem',
        'pading-right': window.lib.px2rem(30) + 'rem'
      },
      textList: []
    }
  },
  computed: {
    // 当前项目阶段索引
    currentProjectIndex () {
      return this.$store.state.currentProjectIndex
    },
    showLeftProvinceTable () {
      return this.currentProjectIndex === 0 || this.currentProjectIndex === 1
    }
  },
  created () {
    this.$store.commit('updateCountry', null)
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
          let itemCode = this.$store.state.mapList.filter(map => {
            return map.code.indexOf('bot') > -1 && map.datavalue === item.grop
          })
          this.textList.push({
            group: itemCode[0].value,
            icon: Config.group[itemCode[0].code].icon,
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
    WorldMap,
    TextListView
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
.page-world {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  flex: auto;

  .panel {
    display: flex;
    justify-content: center;
  }

  .panel-top {
    // height: px2rem(130);
    height: px2rem(140);

    .container-logo {
      width: px2rem(458);
      height: px2rem(124);
      background: url('../../assets/img/logo.png') center right/auto 100% no-repeat;
    }

    .container-number {
      position: relative;
      box-sizing: border-box;
      padding: 0 px2rem(110);
      flex: auto;
      flex-wrap: nowrap;
      display: flex;
      height: 100%;

      li {
        height: 100%;
        width: 25%;
      }
    }
  }

  .panel-middel {
    position: relative;
    // top: px2vh(-10);
    display: flex;
    flex: auto;
    justify-content: space-between;

    .panel-left {
      width: px2rem(708);

      // .panel-timer {
      //   position: absolute;
      //   width: px2rem(583);
      //   height: px2vh(158);
      // }
    }

    .panel-china {
      position: relative;
      width: px2rem(1882);
      flex: auto;

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
      flex: auto;
    }
  }

  .panel-bottom {
    height: px2vh(158);
  }

  .panel-table {
    position: absolute;
    // left: px2rem(56);
    bottom: 17vh;
    width: px2rem(624);
    height: px2vh(920);
    // width: px2rem(700);
    // height: 54.91071vh;
  }

  .panel-timer {
    position: absolute;
    left: px2rem(56);
    top: 11vh;
    width: px2rem(682);
    height: px2vh(160);
  }
}
</style>
