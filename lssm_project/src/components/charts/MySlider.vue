<template>
  <section class="slider">
    <ul class="slider-container" :id="listId"
      :style="{ width: slideContainerWidth + 'rem', left: liWidth + 'rem' }">
      <li v-for="(item, index) of slideList"
        :style="{ width: liWidth + 'rem' }"
        :class="['slider-item', index === currentProjectIndex? 'active': '']"
        :key="index">
        <span>{{item.value}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'MySlider',
  props: {
    slideList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    let data = {}
    data.listId = _.uniqueId('slide-')
    data.liWidth = window.lib.px2rem(400)
    data.slider = undefined
    return data
  },
  computed: {
    currentProjectIndex () {
      return this.$store.state.currentProjectIndex
    },
    slideContainerWidth () {
      return this.liWidth * this.slideList.length
    }
  },
  watch: {
    currentProjectIndex () {
      if (!this.slider) {
        return false
      }
      this.slider.style.left = window.lib.px2rem(390) * (1 - this.currentProjectIndex) + 'rem'
    }
  },
  mounted () {
    this.slider = document.getElementById(this.listId)
  }
  // methods: {
  //   slide () {
  //     this.activeIndex = (++this.activeIndex) % this.slideList.length
  //     this.$store.commit('project/updateProjectIndex', this.activeIndex)
  //     this.$store.commit('project/updateStatus', this.slideList[this.activeIndex].datavalue)
  //     this.slider.style.left = window.lib.px2rem(390) * (1 - this.activeIndex) + 'rem'
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
.slider {
  position: relative;
  overflow: hidden;
  z-index: 99;
  width: 100%;
  height: 100%;
  font-size: px2rem(36);
  color: #1d67af;
  background: url('../../assets/img/bg_slider.png') center center/ 100% 100% no-repeat;

  .slider-container {
    position: absolute;
    height: 100%;
    transition: left .3s;

    .slider-item {
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .slider-item.active {
      color: #fae175;
      font-size: px2rem(48);
    }
  }
}
</style>
