<template>
  <div class="my-header">
    <div class="logo"><a href="javascript:;"></a></div>
    <div class="title"><p>{{title}}</p></div>
    <div class="header-time"><p>{{currentTimeString}}</p></div>
  </div>
</template>

<script>
export default {
  name: 'headerTitle',
  data () {
    return {
      timeId: undefined,
      currentTimeString: ''
    }
  },
  props: {
    title: {
      type: String,
      default: '电站集团项目概览'
    }
  },
  methods: {
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
        this.currentTimeString = year + ' - ' + month + ' - ' + date
      }, 1000)
    }
  },
  beforeDestroy () {
    if (this.timeId) {
      clearInterval(this.timeId)
    }
  },
  created () {
    this.timer()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.my-header {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: #fff;
  background: url('../../../assets/img/group/bg-header-title.png') top center/ auto 90% no-repeat;

  .logo {
    width: px2rem(700);
    height: px2vh(169);
    background: url('../../../assets/img/group/logo.png') left center/ auto 100% no-repeat;
    margin-top: px2vh(30);
  }

  .title {
    padding-top: px2vh(38);
    text-align: center;
    p {
      font-size: px2rem(60);
    }
  }
  .header-time {
    margin-top: px2vh(22);
    background: url('../../../assets/img/group/header_date.png') right center/ auto 100% no-repeat;
    width: px2rem(700);
    height: px2vh(168);

    p {
      font-size: px2rem(60);
      font-family: ds digital;
      text-align: right;
      padding-top: px2vh(50);
      padding-right: px2rem(60);
      color: #b5e4f5;
    }
  }
}
</style>
