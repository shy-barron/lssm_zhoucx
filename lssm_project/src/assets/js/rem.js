/*
 * 根据屏幕宽度动态设置根字体大小
 * @author chenqy
 */
let lib = {}
let rem2px
let px2rem
let px2vh
let vh2px
let designWidth = 3840
let designHeight = 2160
try {
  const doc = window.document // 文档对象
  const docEl = doc.documentElement // 文档对象元素
  let metaEl = doc.querySelector('meta[name="viewport"]') // viewport 属性设置
  const dpr = window.devicePixelRatio || 1 // 屏幕dpr
  const scale = 1 / dpr // viewport 缩放
  let tid // 定时器句柄

  /* viewport 属性设置不存在 */
  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl)
    } else {
      let wrap = doc.createElement('div')
      wrap.appendChild(metaEl)
      doc.write(wrap.innerHTML)
    }
  }
  // 设置viewport
  metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no')
  // 设置data-dpr属性，留作的css hack之用
  docEl.setAttribute('data-dpr', dpr)
  // 设置根字体大小
  const refreshRem = () => {
    const rem = docEl.getBoundingClientRect().width / 10
    docEl.style.fontSize = rem + 'px'
    lib.rem = rem
  }
  refreshRem() // 首次加载设置根字体模块
  // 监听resize事件，设置根字体大小
  window.addEventListener('resize', () => {
    window.clearTimeout(tid)
    tid = window.setTimeout(refreshRem, 300)
  })
  // 监听页面刷新时间，设置根字体大小
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) { // 如果从缓存读取页面则设置根字体大小
      window.clearTimeout(tid)
      tid = window.setTimeout(refreshRem, 300)
    }
  })
  /* 设置body字体大小为12px */
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px'
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = 12 * dpr + 'px'
    }, false)
  }

  /* 导出变量对象 */
  lib.dpr = dpr
  lib.refreshRem = refreshRem
  /* rem转换成px */
  rem2px = lib.rem2px = d => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(d) * lib.rem
  }
  /* px转换成rem */
  px2rem = lib.px2rem = d => {
    if (isNaN(d)) {
      return d
    }
    // return parseFloat(d) / lib.rem
    return parseFloat(d) / designWidth * 10
  }
  /* px转换成vh */
  px2vh = lib.px2vh = d => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(d) / designHeight * 100
  }
  /* vh转换成px */
  vh2px = lib.vh2px = d => {
    if (isNaN(d)) {
      return d
    }
    return parseFloat(d) / 100 * designHeight
  }

  window.lib = lib
} catch (e) {
  // console.error(e)
}
export default lib
export {rem2px, px2rem, px2vh, vh2px}
