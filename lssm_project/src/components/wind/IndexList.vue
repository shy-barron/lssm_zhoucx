<template>
  <div class="index-list">
    <ul class="list-container">
      <li class="list-item" v-for="(item, index) of indexList" :key="index">
        <p class="item-key">{{item.key}}</p>
        <div class="item-value">
          <span>{{item.value}}</span>
          <span>{{item.unit}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import {wind} from '../../assets/js/api'

export default {
  name: 'IndexList',
  data () {
    let data = {}
    data.indexList = [
      {
        key: '全国风场数',
        value: '--',
        unit: '个'
      },
      {
        key: '接入风云风场数',
        value: '--',
        unit: '个'
      },
      {
        key: '质保期风场数',
        value: '--',
        unit: '个'
      },
      {
        key: '新增装机容量',
        value: '--',
        unit: 'MW'
      },
      {
        key: '累计装机容量',
        value: '--',
        unit: 'MW'
      },
      {
        key: 'CO2减排量',
        value: '--',
        unit: '吨'
      }
    ]
    return data
  },
  created () {
    axios.post(wind.getAnalysisByNation).then(response => {
      const result = response.data
      console.log('全国风场信息', result)
      if (parseInt(result.code) === 1) {
        this.indexList = result.data
      }
    }).catch(error => {
      console.error(error)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/rem.scss';
@font-face {
  font-family: ds digital;
  src: url('../../assets/fonts/DS-DIGI.TTF');
}
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: px2rem(50);

  .list-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;

    .list-item {
      height: 100%;
      text-align: center;

      .item-key {
        color: #EFF0F2;
        height: px2vh(72);
        background: url('../../assets/img/bg_windPage_light.png') center bottom / 100% auto no-repeat;
      }

      .item-value {
        color: #7CB0D9;
        span:first-child {
          font-family: ds digital;
          font-size: px2rem(70);
        }
        span:last-child {
          font-size: px2rem(50);
        }
      }
    }
  }
}
</style>
