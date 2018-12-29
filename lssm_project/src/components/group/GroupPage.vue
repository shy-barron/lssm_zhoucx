<template>
  <div class="group-page">
    <!-- 背景流星 -->
    <div class="page-bganimate">
      <ul>
        <li v-for="i of 5" :key="i"></li>
      </ul>
    </div>
    <!-- <img src="../../assets/img/group/bg_group_order.png" alt=""> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { group } from '../../assets/js/api.js'
import { getUrlParam } from '../../assets/js/weapon.js'
import axios from 'axios'
export default {
  name: 'GroupPage',
  data () {
    return {
      timeId: undefined, // 定时器柄
      timeOut: 10000 // 定时器时间
    }
  },
  methods: {
    // 处理页面切屏
    routeEach () {
      let length = this.$router.options.routes[0].children.length
      let k = 1
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.$router.push({path: this.$router.options.routes[0].children[k].path})
        ++k
        if (k >= length) {
          k = 0
        }
      }, this.timeOut)
    },
    // 获取切换时间
    getData () {
      try {
        return axios.post(group.getByChangeTimePrj).then((res) => {
          if (res.data.data && parseInt(res.data.code) === 1) {
            // console.log('切换时间', res.data.data.changTime.time)
            this.timeOut = res.data.data.changTime.time || 10000
            this.$store.commit('group/updatedTimeOut', this.timeOut)
            // this.routeEach()
          }
        })
      } catch (error) {
        console.warn(error)
      }
    }
  },
  created () {
    this.getData() // 获取切屏时间
    // 路由判断是否切屏
    try {
      const Roll = getUrlParam('roll')
      if (Roll && Roll === 'false') {
        this.$store.commit('group/updatedRoll', Roll)
      } else {
        this.$store.commit('group/updatedRoll', 'true')
      }
    } catch (error) {
      console.log(error)
    }
    // this.getData()
  },
  beforeDestroy () {
    if (this.timeId) {
      clearInterval(this.timeId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
@keyframes star-ani {
    0% {
        // opacity: 1;
        transform: translate3d(30vw, 0, 0);
    }
    100% {
        // opacity: 1;
        transform: translate3d(3vw, 40vh, 0);
    }
}
@keyframes second-ani {
    0% {
        // opacity: 1;
        transform: translate3d(50vw, 0, 0);
    }
    100% {
        // opacity: 1;
        transform: translate3d(3vw, 80vh, 0);
    }
}
@keyframes third-ani {
    0% {
        // opacity: 1;
        transform: translate3d(70vw, 0, 0);
    }
    100% {
        // opacity: 1;
        transform: translate3d(15vw, 92vh, 0);
    }
}
@keyframes four-ani {
    0% {
        // opacity: 1;
        transform: translate3d(90vw, 0, 0);
    }
    100% {
        // opacity: 1;
        transform: translate3d(32vw, 92vh, 0);
    }
}
@keyframes fived-ani {
    0% {
        // opacity: 1;
        transform: translate3d(90vw, 30vh, 0);
    }
    100% {
        // opacity: 1;
        transform: translate3d(45vw, 92vh, 0);
    }
}
.group-page {
  position: relative;
  height: 100%;
  width: 100%;
  background: url('../../assets/img/group/bg_group_app.png') center center/ 100% 100% no-repeat;
  .page-bganimate {
    ul {
      li {
       width: px2rem(102);
       height: px2rem(125);
       background: url('../../assets/img/meteor.png') center center/ 100% 100% no-repeat;
       position: absolute;
       z-index: 1000;
      //  transform-origin: 100% 0;
      }
      li:nth-of-type(1) {
        top: 0;
        // left: 20vw;
        animation: star-ani 7s linear infinite;
        -webkit-animation:star-ani 7s linear infinite;
        -moz-animation: star-ani 7s linear infinite;
        // animation-delay:2s;
        // -webkit-animation-delay:2s; /* Safari 和 Chrome */
      }
      li:nth-of-type(2) {
        top: 0;
        transform: translate3d(50vw, 0, 0);
        // left: 40vw;
        animation: second-ani 15s linear infinite;
        -webkit-animation: second-ani 15s linear infinite;
        -moz-animation: second-ani 15s linear infinite;
      }
      li:nth-of-type(3) {
        top: 0;
        // left: 60vw;
        transform: translate3d(70vw, 0, 0);
        animation: third-ani 18s linear infinite;
        -webkit-animation: third-ani 18s linear infinite;
        -moz-animation: third-ani 18s linear infinite;
      }
       li:nth-of-type(4) {
        top: 0;
        transform: translate3d(90vw, 0, 0);
        // left: 70vw;
        animation: four-ani 16s linear infinite;
        -webkit-animation: four-ani 16s linear infinite;
        -moz-animation: four-ani 16s linear infinite;
      }
      li:nth-of-type(5) {
        top: 0;
        transform: translate3d(94vw, 30vh, 0);
        // left: 70vw;
        animation: fived-ani 14s linear infinite;
        -webkit-animation: fived-ani 14s linear infinite;
        -moz-animation: fived-ani 14s linear infinite;
      }
    }
  }
}
</style>
