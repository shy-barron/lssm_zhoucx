<template>
  <section class="text-list">
    <ul>
      <li v-for="(item, index) of textList" :key="index">
        <p class="grop">
          <img class="icon" :src="item.icon">
          <span>{{item.group}}</span>
        </p>
        <p class="quantity">
          <span>{{item.quantity}}个</span>
          <span v-if="item.amount">/ {{(item.amount || 0).toFixed(2)}}亿</span>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  name: 'TextListView',
  props: {
    textList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
.text-list {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: px2rem(32);
  color: #b5e4f5;

  ul {
    box-sizing: border-box;
    height: 100%;
    width: px2rem(1452);
    display: flex;
    justify-content: space-between;
    padding-bottom: px2vh(8);
    align-items: flex-end;

    li {
      box-sizing: border-box;

      p {
        display: flex;
        align-items: center;

        .icon {
          width: px2rem(48);
          height: px2rem(48);
        }

        span:nth-child(2) {
          margin-left: px2rem(24);
        }
      }

      .quantity, .amount {
        box-sizing: border-box;
        padding-left: px2rem(63);
      }

      .quantity {
        margin-top: px2vh(20);
      }

      .amount {
        margin-top: px2vh(20);
      }

      .grop {
        color: #fff;
        font-size: 0.1rem;
      }
    }
  }
}
</style>
