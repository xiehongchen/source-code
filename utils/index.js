/**
 * 这个throttle函数接受三个参数：

  1、func：要进行节流操作的函数。
  2、wait：设置节流的时间间隔，以毫秒为单位，表示两次函数调用之间的最小时间间隔。
  3、options（可选）：一个配置对象，可以包含leading和trailing属性，用于控制节流的行为。
  throttle函数返回一个新的函数，这个函数会根据配置在一定的时间间隔内执行原始的func函数。
  leading选项用于控制是否在节流开始时立即执行一次func，trailing选项用于控制是否在节流结束后再次执行一次func。
  这个函数可用于限制某些事件的触发频率，以提高性能并更好地控制用户交互。
 */

function throttle(func, wait, options) {
  // 定义变量来存储定时器和前一个时间戳
  let timeout;
  let previous = 0;

  // 如果没有提供options参数，将其设为一个空对象
  if (!options) options = {};

  // 返回一个新的函数，这个函数将被用作实际的节流控制
  return function() {
    // 获取当前时间戳
    const now = Date.now();
    // 获取函数调用时的上下文（this）
    const context = this;
    // 获取传递给函数的参数
    const args = arguments;

    // 如果选项中设置了 leading 为 false 且 previous 为 0，则将 previous 设为当前时间戳
    if (!previous && options.leading === false) previous = now;

    // 计算距离上次函数执行的时间间隔
    const remaining = wait - (now - previous);

    // 如果 remaining 小于等于 0 或者大于 wait（表示时间间隔过长），则执行函数
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        // 清除定时器
        clearTimeout(timeout);
        timeout = null;
      }

      // 更新 previous 为当前时间戳
      previous = now;
      // 执行原函数并传递上下文和参数
      func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      // 如果没有定时器且选项中设置 trailing 不为 false，则设置定时器
      timeout = setTimeout(function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        // 执行原函数并传递上下文和参数
        func.apply(context, args);
      }, remaining);
    }
  };
}

function handleButtonClick() {
  console.log('Button clicked');
}
const normalThrottle = throttle(handleButtonClick, 1000);
const throttledClickHandler = throttle(handleButtonClick, 1000, { leading: true, trailing: true });
normalThrottle();
throttledClickHandler()