<template>
  <div class="order-table-list">
    <div :style="{color: typeColor}" class="title-header">
      {{title}}
    </div>
    <div class="order-table">
      <div class="table-header">
        <ul>
          <li class="table-td-name">{{tableList.proName}}</li>
          <li class="table-td-number">{{tableList.sales}}</li>
        </ul>
      </div>
      <div class="table-body">
        <vue-seamless-scroll :data="dataList" :class-option="classOption">
          <ul v-for="(item, index) in dataList" :key="index">
            <li class="table-td-name">{{item.name}}</li>
            <li v-if="tableList.sales === '金额(亿元)'" class="table-td-number">{{Number(item.amount).toFixed(2)}}</li>
            <li v-if="tableList.sales === '数量(个)'" class="table-td-number">{{Number(item.amount).toFixed(0)}}</li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import axios from 'axios'
export default {
  name: 'OrderTableList',
  // computed: {
  //   typeList () {
  //     if (this.dataType === 'bottom') {
  //       return this.$store.state.group.listBottom
  //     } else {
  //       return this.$store.state.group.listTop
  //     }
  //   }
  // },
  methods: {
    dealData () {
      if (JSON.stringify(this.param) !== '{}') {
        if (this.dataType === 'bottom') {
          this.typeColor = '#5ed327'
        }
      } else {
        this.typeColor = '#fff'
      }
    },
    getData () {
      if (JSON.stringify(this.param) !== '{}') {
        return axios.post(this.dataSource, JSON.stringify(this.param), {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.data.data && res.data.msg === 'success' && res.status === 200) {
            // console.log('电站数据', res.data.data)
            this.typeList = []
            this.typeColor = ''
            this.typeTitle = ''
            if (this.dataType === 'bottom') {
              this.typeList = res.data.data.list2
              if (res.data.data.list_color) {
                this.typeColor = res.data.data.list_color[1].color
                this.typeTitle = res.data.data.list_color[1].stage
              } else {
                this.typeTitle = this.title
                this.typeColor = '#5ed327'
              }
            } else {
              this.typeList = res.data.data.list1
              if (res.data.data.list_color) {
                this.typeColor = res.data.data.list_color[0].color
                this.typeTitle = res.data.data.list_color[0].stage
              } else {
                this.typeTitle = this.title
                this.typeColor = '#d75f01'
              }
            }
            this.flag = true
          }
          // console.log('获取表格数据1', this.typeList)
        })
      } else {
        return axios.post(this.dataSource).then((res) => {
          if (res.data.data && res.data.msg === 'success' && res.status === 200) {
            // console.log('电站数据', res.data.data)
            this.typeList = []
            this.typeColor = ''
            this.typeTitle = ''
            if (this.dataType === 'bottom') {
              this.typeList = res.data.data.list2
              if (res.data.data.list_color) {
                this.typeColor = res.data.data.list_color[1].color
                this.typeTitle = res.data.data.list_color[1].stage
              } else {
                this.typeTitle = this.title
                this.typeColor = '#fff'
              }
            } else {
              this.typeList = res.data.data.list1
              if (res.data.data.list_color) {
                this.typeColor = res.data.data.list_color[0].color
                this.typeTitle = res.data.data.list_color[0].stage
              } else {
                this.typeTitle = this.title
                this.typeColor = '#fff'
              }
            }
            this.flag = true
          }
          // console.log('获取表格数据1', this.typeList)
        })
      }
    }
  },
  data () {
    return {
      typeList: [], // 页面数据
      typeColor: '', // 表格标题颜色
      typeTitle: '',
      flag: false,
      timeId: undefined,
      ops: {
        mode: 'native',
        scrollPanel: {
          initialScrollX: 0,
          initialScrollY: 0,
          scrollingX: true,
          easing: 'easeOutQuad',
          speed: 1000
        },
        bar: {
          vBar: {
            opacity: 0
          },
          hBar: {
            opacity: 0
          }
        }
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    tableList: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dataSource: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: function () {
        return []
      }
    }, // 父级返回数据
    dataType: {
      type: String,
      default: ''
    },
    param: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    classOption () {
      return {
        step: 0.5,
        limitMoveNum: 5,
        direction: 1 // 1 往上 0 往下
        // waitTime: 1000 // 单步停止等待时间
      }
    }
  },
  created () {
    this.dealData()
  },
  components: {
    vueSeamlessScroll
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
.order-table-list {
  width: 100%;
  height: 100%;
  background: url('../../../assets/img/group/bg_table_bottom.png') center center/100% 100% no-repeat;
  font-size: px2rem(40);
  box-sizing: border-box;
  .title-header {
    height: px2vh(120);
    // height: 15%;
    width: 100%;
    text-align: center;
    line-height: px2vh(120);
    font-size: px2rem(46);
  }
  .order-table {
    width: 100%;
    height: 75%;
    color: #869fc9;

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(40);
    }
    .table-td-name {
      width: px2rem(350);
    }
    // .table-td-number {
    //   width: 40%;
    // }

    .table-header {
      padding: 0 px2rem(7);
      font-size: px2rem(40);
      ul {
        padding: px2vh(17) px2rem(45);
        // border-bottom: px2rem(1) solid #578fb1;
        li {
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .table-body {
      padding: px2vh(30) px2rem(30);
      height: 80%;
      overflow-y: hidden;
      font-size: px2rem(36);
      margin-top: px2vh(10);

     ul {
       padding: px2vh(15) px2rem(18);
       background: rgba($color: #08142b, $alpha: .5);
       margin-bottom: px2vh(12);
       font-size: px2rem(34);

      //  li:first-child {
      //    width: px2rem(390);
      //  }
      //  li:last-child {
      //    width: px2rem(100);
      //  }
        li {
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #fff;
        }
     }
    }
  }
}
</style>
