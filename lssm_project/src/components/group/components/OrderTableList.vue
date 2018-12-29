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
        <vue-scroll :ops="ops">
          <ul v-for="(item, index) in dataList" :key="index">
            <li class="table-td-name">{{item.name}}</li>
            <li class="table-td-number">{{Number(item.amount).toFixed(2)}}</li>
          </ul>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
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
          this.typeColor = '#d75f01'
        } else {
          this.typeColor = '#f1f347'
        }
      } else {
        this.typeColor = '#fff'
      }
    },
    getData () {
      // console.log('电站数据', this.param)
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
                this.typeColor = '#d75f01'
              }
            } else {
              this.typeList = res.data.data.list1
              if (res.data.data.list_color) {
                this.typeColor = res.data.data.list_color[0].color
                this.typeTitle = res.data.data.list_color[0].stage
              } else {
                this.typeTitle = this.title
                this.typeColor = '#f1f347'
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
    title: { // 标题
      type: String,
      default: ''
    },
    tableList: { // 表头数据
      type: Object,
      default: function () {
        return {}
      }
    },
    dataSource: { // api请求接口名
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: function () {
        return []
      }
    }, // 父级返回数据
    dataType: { // 表格类型
      type: String,
      default: ''
    },
    param: { // 页面返回参数
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    this.dealData()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';

.sizeColor {
    color: #fff;
}
.order-table-list {
  width: 100%;
  height: 100%;
  background: url('../../../assets/img/group/bg_order_table_right.png') center center/100% 100% no-repeat;
  font-size: px2rem(40);
  box-sizing: border-box;
  .title-header {
    // height: px2vh(120);
    height: 12.77%;
    width: 100%;
    text-align: center;
    line-height: px2vh(120);
    font-size: px2rem(46);
  }
  .order-table {
    width: 100%;
    height: 88%;
    color: #869fc9;

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(40);
    }

    .table-td-name {
      width: px2rem(370);
    }
    // .table-td-number {
    // }
    .table-header {
      padding: 0 px2rem(2);
      font-size: px2rem(40);
      ul {
        padding: 0 px2rem(45);
        // border-bottom: px2rem(1) solid #578fb1;
        // li:first-child {
        //   width: 75%;
        // }
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
      height: 86%;
      overflow-y: auto;
      font-size: px2rem(36);
     ul {
       padding: px2vh(13) px2rem(18);
       background: rgba($color: #08142b, $alpha: .5);
       margin-bottom: px2vh(12);
       font-size: px2rem(34);

       li:first-child {
         width: px2rem(390);
        // width: 60%;
       }
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
