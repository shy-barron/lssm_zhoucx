<template>
  <section class="timer">
    <span>{{year}} &nbsp;</span>
    <span>-</span>
    <span>&nbsp; {{month}} &nbsp;</span>
    <span>-</span>
    <span>&nbsp; {{day}}</span>
  </section>
</template>

<script>
export default {
  name: 'MyTimer',
  data () {
    let data = {}
    data.timeId = undefined
    data.date = new Date()
    return data
  },
  computed: {
    year () {
      return this.date.getFullYear()
    },
    month () {
      let month = this.date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      return month
    },
    day () {
      let day = this.date.getDate()
      day = day < 10 ? '0' + day : day
      return day
    }
  },
  created () {
    let vm = this
    window.setInterval(() => {
      vm.date = new Date()
    }, 60 * 60 * 1000)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
@font-face {
  font-family: ds digital;
  src: url('../../assets/fonts/DS-DIGI.TTF');
}

.timer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: px2rem(64);
  color: #b2e4f6;
  font-family: ds digital;
  background: url('../../assets/img/bg_timer.png') center center/ 100% 100% no-repeat;
}
</style>
