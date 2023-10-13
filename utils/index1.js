/**
 * 实现一个并发请求
 * 请求地址为一个数组，有一个最大并发数，每次发送请求数量不超过最大并发数，
 * 有一个结果数组，无论成功还是失败都要返回结果，最后每一个请求所产生的结果归到一个数组里边去最终数组顺序要跟url数组顺序一样
 * @param {string[]} urls 待请求的url数组
 * @param {number} maxNum 最大并发数
 */
function concurRequest(urls, maxNum) {
  //1
  return new Promise(resolve => {
      //2
      if (urls.length === 0) {
          resolve([])
          return
      }

      //3
      let index = 0 //下一个请求的下标
      //6
      let count = 0 //当前请求完成的数量

      const results = []
      let i = index
      
      //发送请求
      async function request() { 
          if (index === urls.length) {
              //如果index等于数组长度说明没有请求可发
              return
          }
          const url = urls[index]
          index++
          try {
              const resp = await fetch(url)
              //resp加入到results
              results[i] =resp
          } catch (error) {
              //err加入到results
              results[i]=error
          } finally {
              //判断是否所有的请求都已完成
              count++
              if (count === urls.length) {
                  console.log('over')
                  resolve(results)
              }
              //5
              request()
          }
      }
      const times = Math.min(maxNum, results.length)
      for (let i = 0; i < times; i++){
          request()
      }
  })
}

const apiEndpoints = [
  "https://api.example.com/user/profile",
  "https://api.example.com/user/orders",
  "https://api.example.com/product/list",
  "https://api.example.com/product/details",
  "https://api.example.com/cart/items",
  "https://api.example.com/cart/add",
  "https://api.example.com/cart/remove",
  "https://api.example.com/auth/login",
  "https://api.example.com/auth/logout",
  "https://api.example.com/auth/register",
  "https://api.example.com/search/products",
  "https://api.example.com/search/users",
  "https://api.example.com/order/history",
  "https://api.example.com/order/checkout",
  "https://api.example.com/notification/list",
  "https://api.example.com/notification/mark-read",
  "https://api.example.com/profile/settings",
  "https://api.example.com/profile/update",
  "https://api.example.com/user/reset-password",
];