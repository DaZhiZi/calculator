let operation = []
let appendArr = []

// 添加显示用的函数
const appendNum = function (v) {
    appendArr.push(v)
    let str = loadNum()
    return str
}

// 删除显示用的函数
const removeNum = function () {
    let len = appendArr.length - 1
    appendArr.splice(len, 1)
    let str = loadNum()
    return str
}

// 载入显示的数字
const loadNum = function () {
    let s  = ''
    for (let i = 0; i < appendArr.length; i++) {
        s += appendArr[i]
    }
    return s
}

// 清空数字和op
const emptyAll = function () {
    // 清空运算数组
    operation.splice(0, operation.length)
    // 清空添加数组
    appendArr.splice(0, appendArr.length)
}
// 判断运算数组
const determineNum = function () {
    let sign = ['+', '-', '/', '*', '>', '<']
    if (operation.length == 0) {
        return 'none'
    } else if (!sign.includes(operation[1])) {
        return 'none'
    }
}

// 运算函数
const count = function (n) {
    if (operation[1] == '+') {
        return parseFloat(operation[0]) + parseFloat(n)
    } else if (operation[1] == '-') {
        return parseFloat(operation[0]) - parseFloat(n)
    } else if (operation[1] == '/') {
        return parseFloat(operation[0]) / parseFloat(n)
    } else if (operation[1] == '*') {
        return parseFloat(operation[0]) * parseFloat(n)
    } else if (operation[1] == '>') {
        return parseFloat(operation[0]) > parseFloat(n)
    } else if (operation[1] == '<') {
        return parseFloat(operation[0]) < parseFloat(n)
    }
}

// 解锁四则运算按键
const deBlock = function () {
    let arithmetic = es('.arithmetic')
    for (let i = 0; i < arithmetic.length; i++) {
        arithmetic[i].setAttribute('data-lock', 'deblock')
    }
}

// 上锁四则运算按键
const block = function () {
    let arithmetic = es('.arithmetic')
    for (let i = 0; i < arithmetic.length; i++) {
        arithmetic[i].setAttribute('data-lock', 'block')
    }
}

// 判断锁的状态
const judgeBlock = function () {
    let arithmetic = es('.arithmetic')
    for (let i = 0; i < arithmetic.length; i++) {
        let a = arithmetic[i].getAttribute('data-lock')
        if (a != 'deblock') {
            return log('error')
            break
        }
    }
    return 'deblock'
}

// 判断小数点是否可输入
const judgeDot = function () {
    for (let i = 0; i < appendArr.length; i++) {
        if (appendArr[i] == '.' || appendArr.length <= 0) {
            return false
        }
    }
    return true
}
const bindNumber = function () {
    let keys = es('.calculator-key')
    let large = e('.calculator-display-large')
    bindAll(keys, 'click', function (event) {
        let target = event.target
        if (target.classList.contains('key-number')) {
            log('key-number')
            // 清空大显示区域
            large.innerHTML = ''
            let value = target.innerHTML
            large.innerHTML = appendNum(value)
            // 解锁四则运算按键
            deBlock()
        }
    })
}
const bindArithmetic = function () {
    let keys = es('.calculator-key')
    let large = e('.calculator-display-large')
    let small = e('.calculator-display-small')
    bindAll(keys, 'click', function (event) {
        let target = event.target
        if (target.classList.contains('arithmetic')) {
            if (judgeBlock() == 'deblock') {
                if (determineNum() == 'none') {
                    // 小显示区域
                    small.innerHTML = large.innerHTML + target.dataset.id
                    // push 大显示区域的数字
                    let html = large.innerHTML
                    operation.push(html)
                    // 清空大显示区域
                    large.innerHTML = ''
                    // push 被点击的四则运算符号
                    let dataId = target.dataset.id
                    operation.push(dataId)
                    // 清空添加数组
                    appendArr.splice(0, appendArr.length)
                    // 上锁
                    block()
                } else {
                    // 小显示区域
                    small.innerHTML = small.innerHTML + large.innerHTML + target.dataset.id
                    // 把 大显示区域 的数字 传进 运算函数
                    let num = large.innerHTML
                    let result = count(num)
                    // 大显示区域替换为 运算返回的结果
                    large.innerHTML = result
                    // 清空运算数组
                    operation.splice(0, operation.length)
                    // 把返回的结果和点击的符号添加到数组
                    operation.push(result)
                    let dataId = target.dataset.id
                    operation.push(dataId)
                    // 清空添加数组
                    appendArr.splice(0, appendArr.length)
                    // 上锁
                    block()
                }
            }
        }
    })


}
const bindEqual = function () {
    let keys = es('.calculator-key')
    let large = e('.calculator-display-large')
    let small = e('.calculator-display-small')
    bindAll(keys, 'click', function (event) {
        let target = event.target
        if (target.classList.contains('equal')) {
            if (operation.length > 1 && judgeBlock() == 'deblock') {
                // 把 大显示区域 的数字 传进 运算函数
                let num = large.innerHTML
                let result = count(num)
                // 大显示区域替换为 运算返回的结果
                log('equal result', result)
                large.innerHTML = result
                // 清空数字和 op
                emptyAll()
                // 清空小显示区域
                small.innerHTML = ''
            }
        }
    })
}
const bindBackspace = function () {
    let keys = es('.calculator-key')
    let large = e('.calculator-display-large')
    let small = e('.calculator-display-small')
    bindAll(keys, 'click', function (event) {
        let target = event.target
        if (target.classList.contains('backspace')) {
            large.innerHTML = removeNum()
        }
    })
}
const bindMinus = function () {
    let keys = es('.calculator-key')
    let large = e('.calculator-display-large')
    let small = e('.calculator-display-small')
    bindAll(keys, 'click', function (event) {
        let target = event.target
        if (target.classList.contains('minus')) {
            if (!appendArr.includes('-')) {
                appendArr.splice(0, 0, '-')
                large.innerHTML = loadNum()
            }
        }
    })
}
const bindDot = function () {
    let keys = es('.calculator-key')
    let large = e('.calculator-display-large')
    let small = e('.calculator-display-small')
    bindAll(keys, 'click', function (event) {
        let target = event.target
        if (target.classList.contains('dot')) {
            if (judgeDot() == true) {
                // 清空大显示区域
                large.innerHTML = ''
                let value = target.innerHTML
                large.innerHTML = appendNum(value)
            }
        }
    })
}
const bindEvents = function () {
    bindNumber()
    bindArithmetic()
    bindEqual()
    bindBackspace()
    bindMinus()
    bindDot()
}


const __main = function () {
    bindEvents()
}
__main()