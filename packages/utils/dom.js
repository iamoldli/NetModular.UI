/** 从ElementUI中移植过来 */
const SPECIAL_CHARS_REGEXP = /([\\:\-\\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
const camelCase = function(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/**
 * @description 绑定事件
 */
export const on = (function() {
  return function(element, event, handler) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false)
    }
  }
})()

/**
 * @description 删除事件
 */
export const off = (function() {
  return function(element, event, handler) {
    if (element && event) {
      element.removeEventListener(event, handler, false)
    }
  }
})()

/**
 * @description 绑定一次事件
 */
export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

/**
 * @description 判断是否含有指定的class
 */
export function hasClass(el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/**
 * @description 添加class
 */
export function addClass(el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/**
 * @description 删除class
 */
export function removeClass(el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

/**
 * @description 获取样式
 */
export const getStyle = function(element, styleName) {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

/**
 * @description 设置样式
 */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    element.style[styleName] = value
  }
}

export default {
  on,
  off,
  once,
  hasClass,
  addClass,
  removeClass,
  getStyle,
  setStyle
}
