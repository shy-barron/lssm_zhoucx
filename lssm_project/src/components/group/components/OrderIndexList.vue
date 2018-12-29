<template>
  <div class="order-index-list">
    <ul class="list-ul">
      <li v-for="(item, index) in orderList" :key="index" class="list-item">
        <div class="title">2018年{{item.stage === '全球' ? '' : item.stage}}{{proName}}订单</div>
        <ul>
          <li>
            <p class="item-key">总数量</p>
            <div class="item-value">
              <span>{{item.count}}</span>
              <span>个</span>
            </div>
          </li>
          <li>
            <p class="item-key">总金额</p>
            <div class="item-value">
              <span>{{Number(item.amount).toFixed(2)}}</span>
              <span>亿元</span>
            </div>
          </li>
          <li>
            <p class="item-key">同比增长</p>
            <div class="item-value">
              <span>{{Number(item.rate * 100).toFixed(0)}}</span>
              <span>%</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderIndexList',
  props: {
    proName: {
      type: String,
      default: ''
    }
  },
  computed: {
    orderList () {
      return this.$store.state.group.orderList
    }
    // sales () {
    //   return this.dealData()
    // }
  },
  methods: {
    dealData (number) {
      if (!number) {
        return '0.00'
      }
      let inPart = Number(number).toFixed(0) // 获取整数部分
      let inpartFormat = inPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return inpartFormat
    },
    getData () {
      for (var i in this.orderList) {
        if (this.orderList[i].count) {
          this.orderList[i].count = this.dealData(this.orderList[i].count)
        }
      }
    }
  },
  watch: {
    orderList () {
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
@font-face {
  font-family: ds digital;
  src: url('../../../assets/fonts/DS-DIGI.TTF');
}
.order-index-list {
  width: 100%;
  height: 100%;
  background: url('../../../assets/img/group/bg_order_index_list.png') center center/ 100% 100% no-repeat;
  font-size: px2rem(40);

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-ul {
    width: 100%;
    height: 100%;
   .list-item {
     height: 100%;
     width: 50%;
     box-sizing: border-box;
     padding: px2vh(32) px2rem(100) px2vh(120) px2rem(100);
     text-align: center;

     .title {
       font-size: px2rem(46);
      //  color: #0076BA;
     }

     ul {
       margin-top: px2vh(110);
       justify-content: space-between;
      //  width: 100%;
      //  height: 100%;

      li {
        .item-key {
          padding-bottom: px2vh(25);
        }

        .item-value {
          color: #d5dcf3;
          span:first-child {
            font-family:  ds digital;
            font-size: px2rem(100);
          }
        }
      }
     }
   }
  }
}
</style>
