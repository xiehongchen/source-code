function foo(x,y,z){
  this.name='zt'
  console.log(this.a,x+y+z);
}

const obj={
  a:1
}


Function.prototype.myBind=function(context,...args){
  
  if(typeof this !== 'function')  return new TypeError('is not a function')

  context=context||window

  let _this=this
  
  return function F(...arg){
    //判断返回出去的F有没有被new，有就要把foo给到new出来的对象
    if(this instanceof F){
      return new _this(...args,...arg) //new一个foo
    }
    _this.apply(context,args.concat(arg))  //this是F的,_this是foo的  把foo的this指向obj用apply
  }
}

//验证
const bar=foo.myBind(obj,1,2)
console.log(new bar(3));   //undefined 6  foo { name: 'zt' }

