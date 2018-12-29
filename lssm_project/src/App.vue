<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './assets/scss/rem.scss';

  html, body {
    height: 100%;
    margin: 0;
  }

  #app {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: px2rem(72);
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #fff;
  }
</style>
