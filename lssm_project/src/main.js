// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Api from './assets/js/api'

// 开发测试接口, 不用模拟接口的时候注释掉
import './assets/js/api_dev'

// normalize 统一浏览器样式
import 'normalize.css'
// 重置全局样式
import './assets/scss/reset.scss'
// 根字体自适应
import './assets/js/rem'
import vuescroll from 'vuescroll' // 滚动条内容
Vue.use(vuescroll)
Vue.prototype.cacheData = (() => {
  let store = window.localStorage
  let doc = document.documentElement
  if (!store) {
    doc.style.behavior = 'url(#default#userData)'
  }
  return {
    /**
     * 保存数据
     */
    set: function (key, val, context) {
      if (store) {
        return store.setItem(key, val, context)
      } else {
        doc.setAttribute(key, val)
        return doc.save(context || 'default')
      }
    },
    /**
     * 读取数据
     */
    get: function (key, context) {
      if (store) {
        return store.getItem(key, context)
      } else {
        doc.load(context || 'default')
        return doc.getAttribute(key) || ''
      }
    },
    /**
     * 删除数据
     * @param {Object}
     * @param {Object}
     */
    rm: function (key, context) {
      if (store) {
        return store.removeItem(key, context)
      } else {
        context = context || 'default'
        doc.load(context)
        doc.removeAttribute(key)
        return doc.save(context)
      }
    },
    /**
     * 清空数据
     */
    clear: function () {
      if (store) {
        return store.clear()
      } else {
        doc.expires = -1
      }
    }
  }
})()

Vue.config.productionTip = false

// 获取名称映射
axios.post(Api.mapping, {
}).then(response => {
  const mapList = response.data.data
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    created () {
      this.$store.commit('updateMapList', mapList)
    },
    components: { App },
    template: '<App/>'
  })
}).catch(error => {
  console.error(error)
  alert('获取接口数据失败，请检查网络状态后刷新页面。')
})
