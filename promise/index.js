const PROMISE_PENDING_STATE = "pending";
const PROMISE_FULFILLED_STATE = "fulfilled";
const PROMISE_REJECTED_STATE = "rejected";

class Promise {
  constructor(execute) {
    this.PromiseState = PROMISE_PENDING_STATE;
    this.PromiseResult = undefined;
    this.callbacks = [];

    try {
      execute(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(result) {
    if (this.PromiseState === PROMISE_PENDING_STATE) {
      this.PromiseState = PROMISE_FULFILLED_STATE;
      this.PromiseResult = result;

      setTimeout(() => {
        this.callbacks.forEach((cb) => {
          cb.onResolved(this.PromiseResult);
        });
      });
    }
  }

  reject(reason) {
    if (this.PromiseState === PROMISE_PENDING_STATE) {
      this.PromiseState = PROMISE_REJECTED_STATE;
      this.PromiseResult = reason;

      setTimeout(() => {
        this.callbacks.forEach((cb) => {
          cb.onRejected(this.PromiseResult);
        });
      });
    }
  }

  then(onResolved, onRejected) {
    if (typeof onResolved !== "function") {
      onResolved = (result) => {
        return result;
      };
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }
    return new Promise((resolve, reject) => {
      const callback = (fn) => {
        try {
          const result = fn(this.PromiseResult);
          if (result instanceof Promise) {
            result.then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      // 成功
      if (this.PromiseState === PROMISE_FULFILLED_STATE) {
        setTimeout(() => {
          callback(onResolved);
        });
      }

      // 失败
      if (this.PromiseState === PROMISE_REJECTED_STATE) {
        setTimeout(() => {
          callback(onRejected);
        });
      }

      // 等待中
      if (this.PromiseState === PROMISE_PENDING_STATE) {
        this.callbacks.push({
          onResolved: () => {
            callback(onResolved);
          },
          onRejected: () => {
            callback(onRejected);
          },
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(result) {
    return new Promise((resolve, reject) => {
      if (result instanceof Promise) {
        result.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(result);
      }
    });
  }

  static reject(result) {
    return new Promise((resolve, reject) => {
      reject(result);
    });
  }

  static all(promises) {
    let result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (res) => {
            result[i] = res;
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (res) => {
            resolve(res);
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
}
