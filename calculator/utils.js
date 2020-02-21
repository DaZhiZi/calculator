/**
 * log 函数
 * @return {none}
 */
const log = console.log.bind(console)
/* 第二种写法
const log = function () {
  console.log.apply(console, arguments)
}
 */


/**
 * e 选择元素函数
 * @param  {CSS选择器} selector
 * @return {DOM元素}
 */
const e = selector => document.querySelector(selector)

/**
 * es 选择所有元素函数
 * @param  {CSS选择器} selector
 * @return {DOM元素集合}
 */
const es = selector => document.querySelectorAll(selector)


/**
 * 插入 html 函数
 * @param  {DOM元素} element 用来定位的 DOM 元素
 * @param  {模板变量} html 一般用模板字符串
 * @return {none}
 */
const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)


/**
 * 查找 element 的所有子元素
 * @param  {DOM元素} element 用来定位的 DOM 元素
 * @param  {CSS选择器} selector
 * @return {DOM元素}
 */
const find = (element, selector) => { //  find 函数可以查找 element 的所有子元素
    return element.querySelector(selector)
}


/**
 * 查找 element 的所有子元素集合
 * @param  {DOM元素} element 用来定位的 DOM 元素
 * @param  {CSS选择器} selector
 * @return {DOM元素集合}
 */
const findAll = (element, selector) => {
    return element.querySelectorAll(selector)
}


const EventType = { // event_type  事件枚举
    click: 'click',
    popstate: 'popstate',
    mouseover: 'mouseover',
    mouseout: 'mouseout',
    keyup: 'keyup',
}


/**
 * 切换类名函数
 * @param  {DOM元素} element
 * @param  {类名} className
 * @return {none}
 */
const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

/**
 * 移除所有含有类的div名函数(先查找到含有该类名的所有元素，然后移除掉元素上的该类名的整段div)
 * @param  {类名} className
 * @return {none}
 */
const removeDivAll = (className) => {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let v of elements) {
        let element = v
        element.remove()
    }
}

/**
 * 移除所有类名函数(先查找到含有该类名的所有元素，然后移除掉元素上的该类名)
 * @param  {类名} className
 * @return {none}
 */
const removeClassAll = (className) => {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let v of elements) {
        let element = v
        element.classList.remove(className)
    }
}


/**
 * 单个元素绑定事件函数
 * @param  {DOM元素} element 被绑定事件的元素
 * @param  {事件名称} eventName click等
 * @param  {回调函数} callback
 * @return {none}
 */
const bindEvent = (ele, eventName, callback) => {
    ele.addEventListener(eventName, callback)
}


/**
 * 所有相同类名元素绑定事件函数
 * @param  {DOM元素} elements
 * @param  {事件名称} eventName
 * @param  {回调函数} callback
 * @return {none}
 */
const bindAll = (elements, eventName, callback) => {
    for (let v of elements) {
        let element = v
        element.addEventListener(eventName, callback)
    }
}

// 在 element 上绑定一个事件委托, 只会响应拥有 responseClass 类的元素
// 需要做成支持多个 responseClass 的形式
const bindEventDelegate = function (element, eventName, callback, responseClass, useCapture = false) {
    element.addEventListener(eventName, function (event) {
        let target = event.target
        let hasClass = target.classList.contains(responseClass)
        if (hasClass) {
            callback()
        }
    })
}


/**
 *  向下取整
 * @param  {数字} number
 * @return {数字}
 */
const floor = num => Math.floor(num)


/**
 *  生成 1 到 number 之间的随机整数
 * @param  {数字} number
 * @return {数字}
 */
const random = num => Math.ceil(Math.random() * num)


/**
 *  生成 num1 到 num2 之间的随机整数
 * @param  {数字} number1 number2
 * @return {数字}
 */
const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return ~~(n + start)
}

/**
 * 获取当前时间函数
 * @return {[type]} [description]
 */
const now = () => {
    let d = new Date()
    let nm = d.getFullYear()
    let yt = d.getMonth() + 1
    let ri = d.getDate()
    let ui = d.getHours()
    let ff = d.getMinutes()
    let mc = d.getSeconds()

    return `${nm}/${yt}/${ri} ${ui}:${ff}:${mc}`
}

/**
 *  把数组或者对象 转换成字符串
 * @param  {object arrary}  obj or arr
 * @return {字符串}
 */
const sty = obj => JSON.stringify(obj)

/**
 *  把字符串 转换成数组或者对象
 * @param  {字符串}
 * @return {object arrary}  obj or arr
 */
const par = obj => JSON.parse(obj)


const ensureEqual = (a, b, message) => {
    if (JSON.stringify(a) != JSON.stringify(b)) {
        log(`*** 测试失败, 结果(${a})  预期 (${b}), ${message}`)
    } else {
        log(`    ***  ${message} 测试成功, 大侄子牛逼呀`)
    }
}
const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('*** 测试成功   大侄子牛逼啊', message)
    }
}
