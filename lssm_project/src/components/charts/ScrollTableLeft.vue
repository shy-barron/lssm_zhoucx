<template>
  <section class="scroll-table-left">
    <table>
      <thead>
        <tr>
          <th colspan="2">订单金额TOP10</th>
          <!-- <th>项目金额</th> -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>项目</td>
          <td>金额</td>
        </tr>
        <tr v-for="(item,index) of projectList" :key="index">
          <td>{{item.projectName}}</td>
          <td>{{(item.orderAmount || 0).toFixed(2)}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import API from '../../assets/js/api'
import axios from 'axios'
export default {
  name: 'scrollTableLeft',
  data () {
    return {
      projectList: []
    }
  },
  computed: {
    projectStatus () {
      return this.$store.getters.getProjectStatus
    }
  },
  watch: {
    projectStatus () {
      this.loadData()
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      // console.log('load left table data', API.left)
      axios.post(API.left, {
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
  background: url('../../assets/img/bg_scrollTableLeft.png') center center/ 100% 100% no-repeat;

  table {
    width: 100%;
    table-layout: fixed;

    tr {
      height: px2vh(76);
    }

    thead {
      color: #fff;
      font-weight: normal;
      th {
        text-align: center
      }

      // th:first-child {
      //   text-align: left;
      //   width: 65%;
      //   // width: px2rem(329);
      // }

      // th:last-child {
      //   text-align: right;
      //   width: 35%;
      //   // width: px2rem(211);
      // }
    }

    tbody {

      color: #90cae1;

      tr:first-child {
        color: #fff;
      }

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
