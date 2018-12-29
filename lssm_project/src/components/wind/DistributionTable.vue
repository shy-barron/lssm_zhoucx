<template>
  <div class="table-distribution">
    <div class="table-header">
      <p>全国风场区域分布</p>
      <ul>
        <li v-for="(item, index) of unitList" :key="index">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="table-body">
      <table >
        <thead>
          <tr>
            <th v-for="(item, index) of columnList" :key="index">
              {{item}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of dataList" :key="index">
            <td v-for="(subItem, subIndex) of item" :key="subIndex">
              {{subItem}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {wind} from '../../assets/js/api'

export default {
  name: 'DistributionTable',
  data () {
    return {
      unitList: ['台数(个)', '容量(MW)', '发电量(KW)'],
      columnList: ['区域', '装机总数', '装机总量', '新增装机总量', '历史发电量'],
      dataList: [
        ['华中地区', 0, 0, 0, 0],
        ['华南地区', 0, 0, 0, 0],
        ['华北地区', 0, 0, 0, 0],
        ['华西地区', 0, 0, 0, 0],
        ['华东地区', 0, 0, 0, 0]
      ]
    }
  },
  created () {
    axios.post(wind.getAnalysisByArea).then(response => {
      const result = response.data
      console.log('全国分区风场统计信息', result)
      if (parseInt(result.code) === 1) {
        this.unitList = result.data.unitList
        this.columnList = result.data.columnList
        this.dataList = result.data.dataList
      }
    }).catch(error => {
      console.error(error)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
.table-distribution {
  width: 100%;
  height: 100%;

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: px2rem(40);
    padding: px2vh(30) px2rem(30);
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(30);
      li {
        padding-left: px2rem(22);
        color: #94C4FB;
      }
    }
  }

  .table-body {
    font-size: px2rem(30);
    padding:0 px2rem(30) 0 px2rem(30);
    overflow: hidden;
    table {
      width: 100%;
      border-collapse: collapse;
      th {
        color: #fff;
        padding: px2vh(22) 0;
      }
      td {
        text-align: center;
        padding: px2vh(22) 0;
      }
      tbody {
        color: #8FC3FF;
        tr:nth-child(odd) {
        background: rgba(7, 21, 41, .8);
        }
      }
    }
  }
}
</style>
