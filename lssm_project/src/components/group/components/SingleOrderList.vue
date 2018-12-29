<template>
  <div class="order-list">
    <ul class="order-item">
      <li class="item-key">
        <ul>
          <!-- <li v-for="(item, index) in bottomLeft" :key="index">
            <div :style="'color:' + item.color" class="title">{{item.stage}}</div>
            <div class="sales">
              <div class="sales-item">
                <p :style="'borderBottomColor:' + item.color">总数量</p>
                <div class="count">
                  <span>{{item.count}}</span><span>&nbsp;{{item.c_unit}}</span>
                </div>
              </div>
              <div class="sales-item">
                <p :style="'borderBottomColor:' + item.color">海外占比</p>
                <div class="count">
                  <span>{{item.rate * 100}}</span><span>&nbsp;%</span>
                </div>
              </div>
            </div>
          </li> -->
          <li v-for="(item, index) in singleBottom" :key="index">
            <div :style="'color:' + item.color" class="title">{{item.stage}}</div>
            <div class="sales">
              <div class="sales-item">
                <p :style="'borderBottomColor:' + item.color">总数量</p>
                <div class="count">
                  <span>{{Number(item.count).toFixed(0)}}</span><span>&nbsp;{{item.c_unit}}</span>
                </div>
              </div>
              <div class="sales-item">
                <p :style="'borderBottomColor:' + item.color">总金额</p>
                <div class="count">
                  <span>{{Number(item.amount).toFixed(2)}}</span><span>&nbsp;{{item.a_unit}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  computed: {
    // bottomLeft () {
    //   return this.$store.state.world.bottomLeft
    // },
    // bottomRight () {
    //   return this.$store.state.world.bottomRight
    // },
    // activeIndex () {
    //   return this.$store.state.world.activeIndex
    // }
    singleBottom () {
      return this.$store.state.world.singleBottom
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
@font-face {
  font-family: ds digital;
  src: url('../../../assets/fonts/DS-DIGI.TTF');
}
.order-list {
  position: relative;
  width: 100%;
  height: 100%;
  .order-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .item-key {
      // width: 49%;
      width: 100%;
      height: 100%;
      background: url('../../../assets/img/group/bottom.png') center center/100% 100% no-repeat;
      font-size: px2rem(40);
      box-sizing: border-box;
      // padding: px2vh(23) px2rem(64);
      &.active {
        width: 49%;
        height: 100%;
        box-shadow: 0px 0px px2rem(35) px2rem(8) #095893;
        // background: url('../../../assets/img/group/bottom_active.png') center center/100% 100% no-repeat;
        // transform: scaleY(1.1);
        // padding: px2vh(40) px2rem(90);
      }

      ul {
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: px2vh(50) 0;
        box-sizing: border-box;

        li {
          height: 100%;
          width: 50%;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 8%;
          .title {
            font-size: px2rem(48);
            // color: green;
            width: 28%;
          }

          .sales {
            display: flex;
            justify-content: space-between;
            width: 62%;
            .sales-item {
              // width: 50%;
              height: 100%;
              p {
                text-align: start;
                color: #89a2cb;
                font-size: px2rem(36);
                padding-bottom: px2vh(15);
                border-bottom-style: solid;
                border-bottom-width: px2rem(3);
                // border-bottom-color: green;
              }
              .count {
                span:first-child {
                  font-family: ds digital;
                  font-size: px2rem(70);
                }
              }
            }
          }
        }

        li:first-child {
          border-right: px2rem(1) solid #095793;
        }
      }
    }
  }
}
</style>
