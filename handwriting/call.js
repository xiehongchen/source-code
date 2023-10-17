function foo(x,y) {
  console.log(this.a,x+y);
}

const obj = {
  a:1
}

Function.prototype.myCall = function(context,...args){
  if(typeof this !== 'function')  return new TypeError('is not a function')
  const fn = Symbol('fn') //使用Symbol尽可能降低myCall对其他的影响
  context[fn] = this  //this指向foo
  const res = context[fn](...args)  //解构，调用fn
  delete context[fn]  //不要忘了删除obj上的工具函数fn
  return res  //将结果返回
}

//验证
foo.myCall(obj,1,2)   //1,3