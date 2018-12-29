<template>
  <section class="scroll-table-left" :style="theme">
    <table>
      <thead>
        <tr>
          <th colspan="2">项目数量TOP10</th>
          <!-- <th>项目数量</th> -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{title}}</td>
          <td>数量</td>
        </tr>
        <tr v-for="(item,index) of projectList" :key="index">
          <td>{{$store.state.currentCountry === '中国' ? item.province : item.country}} </td>
          <td>{{(item.orderQty || 0).toFixed(0)}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import API from '../../assets/js/api'
import axios from 'axios'
export default {
  name: 'ScrollTableLeft',
  props: {
    theme: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      projectList: []

    }
  },
  computed: {
    title () {
      return this.$store.state.currentCountry === '中国' ? '省份' : '国家'
    },
    projectStatus () {
      return this.$store.getters.getProjectStatus
    }
  },
  watch: {
    projectStatus () {
      this.loadData()
    }
  },
  methods: {
    loadData () {
      if (this.$store.state.currentCountry === '中国') {
        axios.post(API.province, {
          user: this.$store.state.user,
          period: this.$store.state.currentPeriod,
          projectStatus: this.projectStatus,
          country: this.$store.state.currentCountry
        }).then(response => {
          this.projectList = response.data.data
        }).catch(error => {
          console.error(error)
        })
      } else {
        axios.post(API.country, {
          user: this.$store.state.user,
          period: this.$store.state.currentPeriod,
          projectStatus: this.projectStatus,
          country: this.$store.state.currentCountry
        }).then(response => {
          this.projectList = response.data.data
        }).catch(error => {
          console.error(error)
        })
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
.scroll-table-left {
  position: relative;
  // top: px2vh(290);
  top: 19vh;
  box-sizing: border-box;
  padding: px2vh(58) px2rem(92) 0 px2rem(83);
  width: 100%;
  height: px2vh(1107);
  font-size: px2rem(36);
  background: url('../../assets/img/bg_scrollTableProvince.png') center center/ 100% 100% no-repeat;

  table {
    width: 100%;
    table-layout: fixed;

    tr {
      height: px2vh(76);
      // height: 10%;
    }

    thead {
      // color: #90cae1;
      color: #fff;
      font-weight: normal;

      th {
        text-align: center
      }

      // th:first-child {
      //   text-align: left;
      // }

      // th:last-child {
      //   text-align: right;
      // }
    }

    tbody {
      color: #90cae1;

      tr:first-child {
        color: #fff;
      }

      td:first-child {
        text-align: left;
      }

      td:last-child {
        text-align: right;
      }
    }
  }
}

.scroll-table-left.small {
  top: 20vh;
  box-sizing: border-box;
  padding: px2vh(12) px2rem(60) 0 px2rem(60);
  background: url('../../assets/img/bg_scrollTableProvince_small.png') center center/ 100% 100% no-repeat;
  // height: px2vh(995);

  table {
    // height: 100%;
    width: 100%;
    table-layout: fixed;

    tr {
      height: px2vh(60);
      // height: 8%;
    }

    thead {
      color: #fff;

      font-weight: normal;
      tr {
        height: px2vh(104);

        // th:first-child {
        //   text-align: left;
        //   width: 65%
        // }

        // th:last-child {
        //   text-align: right;
        //   width: 35%;
        // }
      }
    }

    tbody {
      color: #90cae1;

      td:first-child {
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      td:last-child {
        text-align: right;
      }
    }
  }
}
</style>
