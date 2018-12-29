<template>
  <section class="scroll-number">
    <div class="label">
      <span>{{text}}</span>
    </div>
    <div class="value">
      <span>{{value}}</span>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ScrollNumber',
  props: {
    text: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';

.scroll-number {
  position: relative;
  // top: -0.05rem;
  width: 100%;
  height: 100%;
  font-size: px2rem(40);

  .label {
    display: flex;
    justify-content: center;
    height: px2rem(60);
    width: 100%;
    background: url('../../assets/img/bg-scrollnumber.png') center 1vh/ 100% auto no-repeat;
    span {
      top: -0.035rem;
      position: relative;
    }
  }

  .value {
    display: flex;
    justify-content: center;
    width: 100%;
    color: #90c5ea;
  }
}

.scroll-number.active {
  color: #fedf7b;
  // font-weight: 800;
  font-size: px2rem(50);

  // background: url('../../assets/img/bg_scrollNumber_active.png') center center/ 100% 150% no-repeat;

  .label {
    background: none;
  }
}
</style>
