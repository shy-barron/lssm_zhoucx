<template>
  <section class="scroll-table" :style="theme">
    <table>
      <thead>
        <tr>
          <th colspan="2" v-if="country === '中国'">回款金额TOP10</th>
          <th colspan="2" v-else>项目金额TOP10</th>
          <!-- <th v-if="country === '中国'">回款总额</th>
          <th v-else>项目金额</th> -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>项目</td>
          <td>金额</td>
        </tr>
        <tr v-for="(item,index) of projectList" :key="index">
          <td>{{item.projectName}}</td>
          <td v-if="country === '中国'">{{(item.prjArAmount || 0).toFixed(2)}}</td>
          <td v-else>{{(item.orderAmount || 0).toFixed(2)}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import API from '../../assets/js/api'
import axios from 'axios'
export default {
  name: 'ScrollTableRight',
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
    country () {
      return this.$store.state.currentCountry
    },
    projectStatus () {
      return this.$store.getters.getProjectStatus
    },
    projectIndex () {
      return this.$store.state.currentProjectIndex
    },
    api () {
      return this.$store.state.currentCountry === '中国' ? API.right : API.left
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
      axios.post(this.api, {
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
.scroll-table {
  position: relative;
  // top: px2vh(260);
  top: 19vh;
  box-sizing: border-box;
  padding: px2vh(12) px2rem(60) 0 px2rem(60);
  width: 100%;
  height: px2vh(1107);
  font-size: px2rem(36);
  background: url('../../assets/img/bg_scrollTableRight.png') center center/ 100% 100% no-repeat;

  table {
    // height: 100%;
    width: 100%;
    table-layout: fixed;

    tr {
      height: px2vh(85);
      // height: 8%;
    }

    thead {
      color: #fff;

      font-weight: normal;
      tr {
        height: px2vh(104);

        th {
          text-align: center
        }

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

.table-world.scroll-table {
  table {
    tbody {
      tr {
        height: px2vh(60);
      }
    }
  }
}
</style>
