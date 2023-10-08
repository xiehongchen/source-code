const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
  return 3
}).finally(res => {
  console.log('finally', res)
})
/**
 * 结果是
 * resovle1
 * finally undefined
 * timer1
 * Promise { 3 } 这里的3是在then返回的
 *  
 */
