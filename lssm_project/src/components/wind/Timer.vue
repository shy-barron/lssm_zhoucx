<template>
  <div class="timer">
    <span>截止到&nbsp;&nbsp;</span><span>{{currentTimeString}}</span>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  data () {
    let data = {}
    data.timeId = undefined
    data.currentTimeString = ''
    return data
  },
  created () {
    this.timer()
  },
  methods: {
    // 计时
    timer () {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        month = month < 10 ? '0' + month : month
        let date = now.getDate()
        date = date < 10 ? '0' + date : date
        let hours = now.getHours()
        hours = hours < 10 ? '0' + hours : hours
        let minutes = now.getMinutes()
        minutes = minutes < 10 ? '0' + minutes : minutes
        // let seconds = now.getSeconds()
        // seconds = seconds < 10 ? '0' + seconds : seconds
        this.currentTimeString = year + ' - ' + month + ' - ' +
          date + ' ' + hours + ' : ' + minutes
      }, 1000)
    }
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
@font-face {
  font-family: ds digital;
  src: url('../../assets/fonts/DS-DIGI.TTF');
}
// $design_height: 900;
// $design_width: 1600;

.timer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: url('../../assets/img/dq_time.png') right center/ 100% 100% no-repeat;
  padding: 0 px2rem(60);
  span:first-child {
    font-size: px2rem(40);
  }
  span:last-child {
    font-family: ds digital;
    font-size: px2rem(75);
    color: #7CB0D9;
  }
}
</style>
