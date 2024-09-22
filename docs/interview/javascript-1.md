<script setup>
import Question from '../../components/Question.vue';
</script>

# JavaScript 每日积累

<question title="javascript 函数中 this 的指向问题" date="2024-09-20">

创建执行上下文的时候来确定 this 的指向（this 的指向取决于调用函数的方式）。

| 调用方式         |      示例      | 函数中的 this 指向 |
| ---------------- | :------------: | -----------------: |
| 通过 new 调用    |  new Method()  |             新对象 |
| 直接调用         |    method()    |           全局对象 |
| 通过对象调用     |  obj.method()  |       前面的的对象 |
| call、apply 调用 | func.call(ctx) |         第一个参数 |
| 箭头函数         | 没有 this 指向 |         词法作用域 |

```javascript
function Fn() {
  console.log(this);
}

new Fn(); // 新对象 Fn {}
Fn(); // 全局对象 (window 或{})
const obj = { method: Fn };
obj.method(); // 前面的对象 obj {}
Fn.call(obj); // 第一个参数 obj {}
const arrowFn = () => console.log(this);
arrowFn(); // 词法作用域 window 或 {}
```

</question>

<question title="内存泄漏和闭包" date="2024-09-21">

1. 内存泄漏

内存泄露是指程序在运行过程中，由于某些原因而无法回收已经不再使用的内存（垃圾），导致系统内存占用过多，最终导致系统崩溃，甚至导致数据丢失。

回收

- 手动回收：程序员手动调用垃圾回收机制，释放不再使用的内存。
- 自动回收：程序运行时，自动检测垃圾，并回收不再使用的内存。

```javascript
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 2, 3, 4, 5];
arr1 = null; // 手动回收 arr1
arr2 = [6, 7, 8, 9, 10]; // 自动回收 arr2 [1, 2, 3, 4, 5]
```

2. 闭包会造成内存泄漏吗？

闭包会增加内存泄露的风险，因为闭包会使得函数中的变量一直留在内存中，而不会被回收。

闭包造成的内存泄漏：

a. 当本应销毁的函数没有销毁，导致其关联的词法环境无法销毁，造成内存泄漏。

b. 当多个函数共享一个词法环境，导致词法环境膨胀，从而可能出现无法触达也无法回收的内存空间，造成内存泄漏。

```javascript
// 第一种情况
function createIncrease() {
  const arr = new Array(10000).fill(0).map(() => parseInt(Math.random() * 100));
  function increase() {
    return arr.map((item) => item + 1);
  }
  return increase;
}
const increase = createIncrease();
const btn = document.querySelector('#button');
btn.addEventListener('click', increase);
// 解决方案
btn.addEventListener('click', increase, { once: true });

// 第二种情况
function createIncrease() {
  const arr = new Array(10000).fill(0).map(() => parseInt(Math.random() * 100));
  function increase() {
    console.log(1);
  }
  function temp() {
    return arr.map((item) => item + 1);
  }
  return increase;
}
const increase = createIncrease();
const btn = document.querySelector('#button');
btn.addEventListener('click', increase);

// 解决方案
function createIncrease() {
  // const arr = new Array(10000).fill(0).map(() => parseInt(Math.random() * 100));
  function increase() {
    console.log(1);
  }
  // function temp() {
  //   return arr.map((item) => item + 1);
  // }
  return increase;
}
```

</question>

<question title="说说你对 promise 的理解" date="2024-09-22">

什么是 Promise

promise 是一个对象，用来表示一个异步操作的最终完成（或失败）及其结果值。它能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来，使得异步方法可以像同步方法那样有返回值，异步方法不会立即返回最终的值，而是会返回一个 _`promise`_，以便在未来某个时候把值交给使用者。

一个 Promise 必然会处于以下三个状态之一：

- `pending`: 待定状态，既没有被兑现，也没有被拒绝；

- `fulfilled`: 意味着操作成功完成；（调用 resolve 方法）

- `rejected`: 意味着操作失败；（调用 reject 方法）

一道 Promise 面试题

```javascript
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
```

结果输出：0 1 2 3 4 5 6

解析：

1. 第一步

![第一步](https://s21.ax1x.com/2024/09/22/pAMos2T.png)

2. 第二步

![第二步](https://s21.ax1x.com/2024/09/22/pAMo2qJ.png)

3. 第三步

![第三步](https://s21.ax1x.com/2024/09/22/pAMoyxU.png)

4. 第四步

![第四步](https://s21.ax1x.com/2024/09/22/pAMocMF.png)

5. 第五步

![第五步](https://s21.ax1x.com/2024/09/22/pAMogr4.png)

<iframe style="width: 100%;height: 600px;" src="//player.bilibili.com/player.html?isOutside=true&aid=113066574415212&bvid=BV1HXHreNEi8&cid=25701976261&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

</question>
