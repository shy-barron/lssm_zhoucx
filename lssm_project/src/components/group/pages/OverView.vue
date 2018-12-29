<template>
  <div class="container-overview">
     <!-- header -->
    <div class="header-title">
      <header-title :title="'2018年度经营总览'"></header-title>
    </div>
    <!-- content -->
    <div class="container-content">
      <div v-for="(item, index) in brandList" :key="index" class="graid-echarts">
        <brand-bar :barList="item"></brand-bar>
      </div>
      <!-- <div class="graid-echarts"></div>
      <div class="graid-echarts"></div>
      <div class="graid-echarts"></div> -->
    </div>
    <!-- 信息提示 -->
    <div class="tips-msg">
      <p>注：数据来源于上海电气BCS系统</p>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '../components/HeaderTitle'
import BrandBar from '../components/BrandBar'
import axios from 'axios'
import { group } from '../../../assets/js/api'

export default {
  name: 'OverView',
  data () {
    return {
      brandList: [],
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
          this.$router.push({path: 'new-order'})
        }, this.timeOut)
      }
    },
    getData () {
      try {
        return axios.post(group.getOverView).then((res) => {
          if (res.data.data && res.data.msg === 'success' && res.status === 200) {
            // 处理数据
            const result = res.data.data
            const sum = result.sum.sort((a, b) => {
              return parseInt(a.flag) - parseInt(b.flag)
            })
            let indexList = []
            for (let x in result) {
              if (x !== 'sum') {
                indexList.push(result[x])
              }
            }
            indexList = indexList.sort((a, b) => {
              return parseInt(a.flag) - parseInt(b.flag)
            })
            for (let i = 0; i < indexList.length; i++) {
              indexList[i].sale = parseFloat(sum[i].amount).toFixed(2) || '--'
            }
            this.brandList = indexList
            console.log('sum', sum)
            console.log('indexList', indexList)
            // this.brandList = res.data.data.sort(function (a, b) {
            //   let s = Number(a.flag)
            //   let t = Number(b.flag)
            //   if (s < t) return -1
            //   if (s > t) return 1
            // })
            this.changeRoute()
          }
          console.log('res', this.brandList)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getData()
  },
  beforeDestroy () {
    if (this.timeId) {
      clearTimeout(this.timeId)
    }
  },
  components: {
    HeaderTitle,
    BrandBar
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
@font-face {
  font-family: ds digital;
  src: url('../../../assets/fonts/DS-DIGI.TTF');
}
.container-overview {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 px2rem(60) px2vh(74) px2rem(60);
  box-sizing: border-box;

  .header-title {
    height: px2vh(210);
    max-height: px2vh(210);
    padding-bottom: px2rem(20);
    box-sizing: border-box;
  }

  .container-content {
    width: 100%;
    height: px2vh(1733);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .graid-echarts {
      width: px2rem(1715);
      height: px2vh(837);
      background: url('../../../assets/img/group/dq_model_bg.png') center center/100% 100% no-repeat;
    }
  }

  .tips-msg {
    position: fixed;
    left: 0;
    bottom: 1.48016vh;
    width: 98%;
    // font-size: 0.03348rem;
    // color: #8FC3FF;
    text-align: right;
    font-size: 0.08929rem;
    color: #586d8f
  }
}
</style>
