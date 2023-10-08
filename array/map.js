/**
 * map是一个迭代方法，它为数组中的每一个元素调用一次提供的callbackFn函数，并用结果构建一个新数组
 * map返回一个新数组，并不会改变原数组
 */

const array = [1, 4, 9, 16];
const map = array.map((x) => x * 2);
console.log(map); //  [ 2, 8, 18, 32 ]
console.log(array); //  [1, 4, 9, 16]

/**
 * map接收三个参数
 * element：当前遍历的数组元素的值
 * index（可选）当前元素在数组中的索引
 * array（可选）被遍历的原数组
 */
const array1 = [1, 2, 3, 4, 5];

const newArray = array1.map((element, index, array1) => {
  return `${element} is at index ${index} in the array [${array1}]`;
});
// [
//   '1 is at index 0 in the array [1,2,3,4,5]',
//   '2 is at index 1 in the array [1,2,3,4,5]',
//   '3 is at index 2 in the array [1,2,3,4,5]',
//   '4 is at index 3 in the array [1,2,3,4,5]',
//   '5 is at index 4 in the array [1,2,3,4,5]'
// ]
console.log(newArray);