/**
 * reduce函数也是会返回一个新的数组
 * 接收4个参数
 * accumulator（必需）：累积器，用于存储累积的结果。这是回调函数的第一个参数，它在每次调用回调函数时传递并更新。
 * currentValue（必需）：当前迭代的数组元素的值。这是回调函数的第二个参数，表示当前正在处理的元素。
 * currentIndex（可选）：当前迭代的数组元素的索引。这是回调函数的第三个参数，表示当前元素在数组中的位置。
 * array（可选）：被遍历的原数组。这是回调函数的第四个参数，表示整个数组。
 * initialValue（可选）第一次调用回调时初始化 accumulator 的值。
 *    如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，
 *    则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。
 *    在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。
 */

const array = [1, 2, 3, 4, 5];

const result = array.reduce((accumulator, currentValue, currentIndex, array) => {
  console.log(`accumulator: ${accumulator}, currentValue: ${currentValue}, currentIndex: ${currentIndex}, array: ${array}`);
  return accumulator + currentValue;
}, 0);
// accumulator: 0, currentValue: 1, currentIndex: 0, array: 1,2,3,4,5
// accumulator: 1, currentValue: 2, currentIndex: 1, array: 1,2,3,4,5
// accumulator: 3, currentValue: 3, currentIndex: 2, array: 1,2,3,4,5
// accumulator: 6, currentValue: 4, currentIndex: 3, array: 1,2,3,4,5
// accumulator: 10, currentValue: 5, currentIndex: 4, array: 1,2,3,4,5

console.log(result);
