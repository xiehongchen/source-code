// 遍历对象有哪些方法，如果是对象的原型链上的属性会不会被遍历到？有什么办法可以排除原型链上的属性？

Object.prototype.age = 18
const person = {
  name: '小明',
  age: 17
}

for( key in person) {
  console.log('for-in', key)
}
// 输出结果：
// for-in name
// for-in age
for( key in person) {
  console.log('for-in', person[key])
}
for (key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key)
  }
}
// 输出结果：
// name

// 输出结果：
// for-in 小明
// for-in 18

Object.keys(person).forEach(key=>{
  console.log('object.keys', key)
})
// 输出结果：
// object.keys name
Object.values(person).forEach(value => {
  console.log('object.values', value)
})
// 输出结果：
// object.values 小明
for( const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`)
}
// 输出结果：
// name: 小明