function foo(x,y){
  console.log(this.a,x+y);
}

const obj={
  a:1
}

Function.prototype.myApply=function(context,args){
  if(typeof this !== 'function')  return new TypeError('is not a function')
  const fn=Symbol('fn') //尽可能降低myCall对其他的影响
  context[fn]=this
  context[fn](...args)
  delete context[fn]
}

//验证
foo.myApply(obj,[1,2])  //1,3
