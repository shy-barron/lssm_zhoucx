<template>
  <!-- 页面布局 -->
  <div class="page-wind">
    <!-- 背景流星 -->
    <!-- <div class="page-bganimate">
      <ul>
        <li v-for="i of 2" :key="i"></li>
      </ul>
    </div> -->
    <!-- 头部 -->
    <div class="header">
      <i class="header-logo"></i>
      <span class="title">风场分布</span>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 指标列表 -->
      <div class="index-list-container">
        <index-list></index-list>
      </div>
      <!-- 中国地图 -->
      <div class="map-container">
        <china-map-lines></china-map-lines>
      </div>
      <!-- 表格列表 -->
      <div class="table-container">
        <!-- 数量分布 -->
        <div class="table-quantity-container">
          <quantity-table></quantity-table>
        </div>
        <!-- 地区分布 -->
        <div class="table-distribution-container">
          <distribution-table></distribution-table>
        </div>
        <!-- 时间显示 -->
        <div class="timer-container">
          <timer></timer>
        </div>
      </div>
    </div>
    <!-- 信息提示 -->
    <div class="tips-msg">
      <p>注：“全国风场数”数据来源于上海电气SAP系统，其他数据均来源于上海电气风云系统</p>
    </div>
  </div>
</template>

<script>
import IndexList from './IndexList'
import ChinaMapLines from './ChinaMapLines'
import QuantityTable from './QuantityTable'
import DistributionTable from './DistributionTable'
import Timer from './Timer'

export default {
  name: 'WindPage',
  data () {
    return {
      timeId: undefined
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
  methods: {
    changeRoute () {
      if (this.roll && this.timeOut && this.roll === 'true') {
        // console.log('roll, timeOut', this.roll, this.timeOut)
        if (this.timeId) {
          clearTimeout(this.timeId)
        }
        this.timeId = setTimeout(() => {
          this.$router.push({path: 'china-power'})
        }, this.timeOut)
      }
    }
  },
  mounted () {
    this.changeRoute()
  },
  beforeDestroy () {
    if (this.timeId) {
      clearTimeout(this.timeId)
    }
  },
  components: {
    IndexList,
    ChinaMapLines,
    QuantityTable,
    DistributionTable,
    Timer
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';

// $design_height: 900;
// $design_width: 1600;
@keyframes star-ani {
    0% {
        // opacity: 1;
        transform: translate3d(30vw, 0, 0);
    }
    100% {
        // opacity: 1;
        transform: translate3d(-30vw, 90vh, 0);
    }
}
@keyframes second-ani {
    0% {
        // opacity: 1;
        transform: translate3d(50vw, 0, 0);
    }
    100% {
        // opacity: 1;
        transform: translate3d(-10vw, 90vh, 0);
    }
}
.page-wind {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  padding: 0 px2rem(80) px2vh(80) px2rem(80);
  width: 100%;
  height: 100%;
  background: #0d1c2c url('../../assets/img/bg_windPage.png') center center/ 100% 100% no-repeat;
  color: #fff;
  .page-bganimate {
    ul {
      li {
       width: px2rem(102);
       height: px2rem(125);
       background: url('../../assets/img/meteor.png') center center/ 100% 100% no-repeat;
       position: absolute;
      //  transform-origin: 100% 0;
      }
      li:nth-of-type(1) {
        top: 0;
        left: 20vw;
        animation: star-ani 6s linear infinite;
        -webkit-animation:star-ani 6s linear infinite;
        -moz-animation: star-ani 6s linear infinite;
        // animation-delay:2s;
        // -webkit-animation-delay:2s; /* Safari 和 Chrome */
      }
      li:nth-of-type(2) {
        top: 0;
        left: 40vw;
        animation: second-ani 5s linear infinite;
        -webkit-animation: second-ani 5s linear infinite;
        -moz-animation: second-ani 5s linear infinite;
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: px2vh(158);
    background: url('../../assets/img/bg_windPage_header.png') center center/ auto 100% no-repeat;
    font-size: px2rem(60);

    .header-logo {
      position: absolute;
      top: px2vh(30);
      left: px2rem(71);
      display: block;
      height: px2vh(136);
      width: px2rem(443);
      background: url('../../assets/img/logo.png') center center/ 100% auto no-repeat;
    }

    .title {
      font-weight: 900;
      background: linear-gradient(to bottom, #1cdff4, #1db0f1);
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  .content {
    position: relative;
    display: flex;
    flex: auto;

    .index-list-container {
      position: absolute;
      z-index: 999;
      top: px2vh(60);
      height: px2vh(125);
      width: 100%;
    }

    .map-container {
      flex: auto;
      box-sizing: border-box;
      padding-top: px2vh(104);
    }

    .table-container {
      width: px2rem(1047);

      .table-quantity-container {
        height: px2vh(593);
        margin-top: px2vh(254);
        background-color: rgba($color: #0d1f3a, $alpha: .7);
      }

      .table-distribution-container {
        height: px2vh(647);
        margin-top: px2vh(53);
        background-color: rgba($color: #0d1f3a, $alpha: .7);
      }

      .timer-container {
        position: relative;
        height: px2vh(140);
        margin-top: px2vh(83);
        width: 100%;
        // background-color: #0d2560;
      }
    }
  }

  .tips-msg {
    position: relative;
    top: px2vh(50);
    width: 100%;
    // font-size: px2rem(12);
    // color: #8FC3FF;
    font-size: 0.08929rem;
    color: #586d8f;
    text-align: right;
  }
}
</style>
