function a () {}

const a1 = new a()
a1.name = 'a1'

const a2 = new a()
a2.name = 'a2'

console.log(a.prototype.constructor) // function a
console.log(a.prototype) // {}
console.log(a1.__proto__) // {}
console.log(a1.__proto__ === a.prototype) // true

console.log(a1.age) // undefined
a.prototype.age = '12'
console.log(a1.age) // 12
a1.age = '14'
console.log(a1.age) // 14