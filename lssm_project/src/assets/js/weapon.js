const weapon = {}

/**
 * 获取URL参数
 * @param {String} name
 * @returns {String} value
 */
function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r != null) {
    return unescape(r[2]) // 返回参数值
  }
}

/**
 * @description 16进制颜色转rgba
 * @param {String} color
 * @param {Number} opacity
 * @returns {String}
 */
function color2Rgba (color, opacity) {
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果参数不是有效的16进制颜色
  if (typeof color !== 'string' && reg.test(color)) {
    return color
  } else {
    let sColor = color.toLowerCase()
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    var sColorChange = []
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    let opacityNew = parseFloat(opacity)
    if (isNaN(opacityNew) || opacityNew < 0 || opacityNew > 1) {
      opacityNew = 1
    }
    return 'rgba(' + sColorChange.join(',') + ',' + opacityNew + ')'
  }
}

weapon.getUrlParam = getUrlParam
weapon.color2Rgb = color2Rgba

export { getUrlParam, color2Rgba }
export default weapon
