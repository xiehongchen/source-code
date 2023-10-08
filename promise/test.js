// 使用promise实现每隔一秒输出1,2,3

// 间隔一秒成功
function print () {
  return new Promise(
    (resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    }
  )
}
function autoPrint () {
  [1, 2, 3].reduce((preP, curVal, curIndex) => {
    return preP.then(() => {
      console.log(curVal)
      return print().then(() => {
        if (curIndex === 2) autoPrint()
      })
    })
  }, Promise.resolve())
}

autoPrint()