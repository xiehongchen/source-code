const myInstanceOf=(Left,Right)=>{
  if(!Left){
    return false
  }
  while(Left){
    if(Left.__proto__ === Right.prototype){
      return true
    }else{
      Left=Left.__proto__
    }
  }
  return false
}

//验证
console.log(myInstanceOf({},Object));//true
console.log(myInstanceOf({},Array));//false