<template>
  <div class="layout col">
    <!-- header -->
    <div class="my-header row">
      <slot name="my-header"></slot>
      <!-- <div class="header-date">{{currentTimeString}}</div> -->
    </div>
    <!-- content -->
    <div class="content row">
      <div class="left col">
        <div class="top row">
          <slot name="content-left-top"></slot>
        </div>
        <div class="bottom row">
          <div class="left row">
            <slot name="content-left-bottom-left"></slot>
          </div>
          <div class="right row">
            <slot name="content-left-bottom-right"></slot>
          </div>
        </div>
      </div>
      <div class="right col">
        <div class="top row">
          <slot name="content-right-top"></slot>
        </div>
        <div class="bottom row">
          <slot name="content-right-bottom"></slot>
        </div>
      </div>
    </div>
    <div class="bottom-list">
      注：数据来源于上海电气SAP系统
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      currentTimeString: ''
    }
  },
  methods: {
    timer () {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        month = month < 10 ? '0' + month : month
        let date = now.getDate()
        date = date < 10 ? '0' + date : date
        this.currentTimeString = year + ' - ' + month + ' - ' + date
      }, 1000)
    }
  },
  created () {
    this.timer()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/rem.scss';
@font-face {
  font-family: ds digital;
  src: url('../../../assets/fonts/DS-DIGI.TTF');
}

/* flex布局样式 */
.row {
  display: flex;
  box-sizing: border-box;
}

.col {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.layout {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 px2rem(60) px2vh(74) px2rem(60);
  justify-content: space-between;

  .my-header {
    height: px2vh(216);
    max-height: px2vh(216);

    .header-date {
      position: absolute;
      top: px2vh(50);
      right: px2rem(62);
      width: px2rem(520);
      height: px2vh(160);
      background: url('../../../assets/img/group/header_date.png') center center/ 100% 100% no-repeat;
      text-align: center;
      font-family: ds digital;
      box-sizing: border-box;
      font-size: px2rem(80);
      padding-top: px2vh(40);
      color: #b5e4f5;
    }
  }

  .content {
    position: relative;
    height: px2vh(1733);
    max-height: px2vh(1733);
    justify-content: space-between;

    .left {
      height: 100%;
      width: px2rem(2756);
      max-width: px2rem(2756);
      justify-content: space-between;

      .top {
        height: px2vh(474);
        max-height: px2vh(474);
      }

      .bottom {
        position: relative;
        height: px2vh(1214);
        max-height: px2vh(1214);
        justify-content: space-between;

        .left {
          width: px2rem(1356);
          height: 100%;
        }

        .right {
          width: px2rem(1356);
          height: 100%;
        }
      }
    }

    .right {
      height: 100%;
      width: px2rem(661);
      justify-content: space-between;

      .top {
        height: px2vh(999);
      }

      .bottom {
        height: px2vh(692);
      }
    }
  }

  .bottom-list {
    position: absolute;
    right: 0;
    bottom: px2vh(20);
    padding-right: px2rem(62);
    font-size: px2rem(32);
    color: #586d8f;
  }
}
</style>
