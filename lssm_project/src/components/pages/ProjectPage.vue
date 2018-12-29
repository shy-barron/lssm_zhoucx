<template>
  <div class="page-project">
    <div class="container-main">
      <section class="header">
        <div class="container-logo">
          <div class="container-timer">
            <my-timer></my-timer>
          </div>
        </div>
        <ul class="container-number">
          <li v-for="(item, index) of scrollNumberList"
            :class="currentProjectIndex === index ? 'active' : ''"
            :key="index">
            <img class="scrollNumber-narrow"
              v-if="currentProjectIndex === index"
              src="../../assets/img/bg_scrollNumber_narrow.png" alt="">
            <scroll-number :text="item.value"
              :class="currentProjectIndex === index ? 'active' : ''"
              :value="item.text">
            </scroll-number>
          </li>
        </ul>
        <div class="container-unit">
          <span>单位</span>
          <span>数量 : 个</span>
          <span>金额 : 亿</span>
        </div>
      </section>
      <section class="content">
        <router-view/>
      </section>
    </div>
  </div>
</template>

<script>
import Config from '../../assets/js/config.js'
import MyTimer from '../../components/charts/MyTimer'
import MySlider from '../../components/charts/MySlider'
import ScrollNumber from '../../components/charts/ScrollNumber'
import axios from 'axios'
import API from '../../assets/js/api'

export default {
  name: 'ProjectPage',
  data () {
    let data = {}
    data.pageTimerId = undefined // 翻页时间句柄
    data.projectTimerId = undefined // 计划状态滚动句柄
    data.scrollNumberList = [] // 头部显示列表
    return data
  },
  // beforeRouteEnter (to, from, next) {
  //   if (!window.mapList || window.mapList.length === 0) {
  //     axios.post(API.mapping, {
  //     }).then(response => {
  //       const mapList = response.data.data
  //       window.mapList = mapList
  //       // this.a.app.$options.store.commit('updateMapList', mapList)
  //       next(vm => {
  //         console.log(vm.$store.state.mapList)
  //         vm.$store.commit('updateMapList', mapList)
  //       })
  //     }).catch(error => {
  //       console.error(error)
  //       alert('获取接口数据失败，请检查网络状态后刷新页面。')
  //     })
  //   } else {
  //     next()
  //   }
  // },
  computed: {
    // 当前页索引
    currentPageIndex () {
      return this.$store.state.currentPageIndex
    },
    // 当前项目索引
    currentProjectIndex () {
      return this.$store.state.currentProjectIndex
    },
    // 当前国家
    currentCountry () {
      return this.$store.state.currentCountry
    },
    // 项目状态列表
    slideList () {
      return this.$store.getters.getMapList
    }
  },
  watch: {
    // 国家变化时重新加载头部数据
    currentCountry () {
      this.loadHeadData()
    }
  },
  created () {
    console.log('======当前版本V' + Config.version + '======')
    // 加载头部数据
    this.loadHeadData()
    // 滚动页面
    this.slidePage()
  },
  methods: {
    loadHeadData () {
      // console.log('加载头部数据', API.head)
      axios.post(API.head, {
        user: this.$store.state.user,
        period: this.$store.state.currentPeriod,
        country: this.$store.state.currentCountry
      }).then(response => {
        const result = response.data.data
        this.scrollNumberList = this.$store.getters.getTopList.map(item => {
          for (let project of result) {
            if (item.datavalue === project.projectStatus) {
              let text = project.orderQty + '个'
              if (project.orderAmount !== null && project.orderAmount !== 0) {
                text += ('/' + project.orderAmount.toFixed(2) + '亿')
              }
              item.text = text
              return item
            }
          }
        })
      }).catch(error => {
        console.error(error)
      })
    },
    slidePage () {
      // const routes = this.$router.options.routes[0].children
      const routes = this.$router.options.routes[1].children
      // console.log(routes)
      // 初始化
      this.$store.commit('updatePageIndex', 0)
      this.$store.commit('updateProjectIndex', 0)
      this.$router.push(routes[0].path)
      this.slideProject()
      // 开始滚动页
      this.pageTimerId = setInterval(() => {
        let pageIndex = (this.currentPageIndex + 1) % routes.length
        this.stopSlideProject()
        this.$router.push(routes[pageIndex].path)
        this.$store.commit('updatePageIndex', pageIndex)
        // 切换页重新设置项目状态索引为0
        this.$store.commit('updateProjectIndex', 0)
        this.slideProject()
      }, Config.PageSlideInterval)
    },
    // 滚动项目状态
    slideProject () {
      this.projectTimerId = setInterval(() => {
        let projectIndex = (this.currentProjectIndex + 1) % this.slideList.length
        this.$store.commit('updateProjectIndex', projectIndex)
      }, Config.ProjectPeroidSlideInterval)
    },
    // 停止项目滚动
    stopSlideProject () {
      clearInterval(this.projectTimerId)
    }
  },
  beforeDestroy () {
    clearInterval(this.projectTimerId)
    clearInterval(this.pageTimerId)
  },
  components: {
    MyTimer,
    MySlider,
    ScrollNumber
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/rem.scss';

  .page-project {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 0 px2rem(60) px2vh(60) px2vh(60);
    font-size: px2rem(72);
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #fff;
    background: #011122 url('../../assets/img/bg.png') center center/ 100% 100% no-repeat;

    .container-slider {
      position: fixed;
      z-index: 99;
      left: 50%;
      top: px2vh(160);
      margin-left: px2rem(-1320 / 2);
      width: px2rem(1320);
      height: px2vh(180);
    }

    .container-main {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-flow: column nowrap;
      height: 100%;
      width: 100%;

      .header {
        position: relative;
        display: flex;
        justify-content: center;
        height: px2vh(198);
        box-sizing: border-box;
        padding-top: px2rem(60);

        .container-logo {
          position: relative;
          width: px2rem(447);
          height: px2rem(122);
          background: url('../../assets/img/logo.png') center right/auto 100% no-repeat;

          .container-timer {
            position: absolute;
            top: px2rem(180);
            width: px2rem(650);
            height: px2vh(120);
          }
        }

        .container-number {
          position: relative;
          padding-left: px2rem(127);
          flex: auto;
          flex-wrap: nowrap;
          display: flex;
          height: px2vh(198);
          top: px2rem(-60);
          // height: 100%;

          li {
            position: relative;
            height: 100%;
            box-sizing: border-box;
            padding-top: px2vh(60);
            width: 25%;

            .scrollNumber-narrow {
              position: absolute;
              width: px2rem(112);
              left: 50%;
              height: auto;
              margin-left: px2rem(-112 / 2);
              top: 0;
            }
          }

          li.active {
            background: url('../../assets/img/bg_scrollNumber_active.png') center 1vh/ auto 100% no-repeat;
          }
        }

        .container-unit {
          display: flex;
          align-items: center;
          color: #75b6fe;
          width: px2rem(730);
          height: px2vh(138);
          font-size: px2rem(40);
          background: url('../../assets/img/bg-unit.png') center center/100% 100% no-repeat;

          span:first-child {
            padding-left: px2rem(170);
          }

          span:nth-child(2) {
            padding-left: px2rem(60);
          }

          span:last-child {
            padding-left: px2rem(50);
          }
        }
      }

      .content {
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-flow: column nowrap;
        flex: auto;
      }
    }
  }
</style>
