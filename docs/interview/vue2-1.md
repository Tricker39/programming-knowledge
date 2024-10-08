---
outline: 2
---

# Vue 2 每日积累

## Vue 双向绑定原理

mvvm 双向绑定，采用数据劫持结合发布者-订阅者模式的方式，通过 ​​Object.defineProperty()​​ 来劫持各个属性的 setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

![Vue 双向绑定原理](/imgs/interview/vue/1.jpg)

**几个要点：**

1. 实现一个数据监听器 Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2. 实现一个指令解析器 Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3. 实现一个 Watcher，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4. mvvm 入口函数，整合以上三者

**具体步骤：**

1.  需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2.  compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3.  Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是: 在自身实例化时往属性订阅器(dep)里面添加自己自身必须有一个 update() 方法待属性变动 dep.notice() 通知时，能调用自身的 update() 方法，并触发 Compile 中绑定的回调，则功成身退。
4.  MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

## 虚拟 DOM 实现原理

- 虚拟 DOM 本质上是 JavaScript 对象,是对真实 DOM 的抽象
- 状态变更时，记录新树和旧树的差异
- 最后把差异更新到真正的 dom 中

::: info

详细实现见 :link: [面试官: 你对虚拟 DOM 原理的理解?](https://juejin.cn/post/6844903902429577229)

:::

## 描述下 vue 从初始化页面--修改数据--刷新页面 UI 的过程

&emsp;&emsp;当 Vue 进入初始化阶段时，一方面 Vue 会遍历 data 中的属性，并用 Object.defineProperty 将它转化成 getter/setter 的形式，实现数据劫持(暂不谈 Vue3.0 的 Proxy)；另一方面，Vue 的指令编译器 Compiler 对元素节点的各个指令进行解析，初始化视图，并订阅 Watcher 来更新试图，此时 Watcher 会将自己添加到消息订阅器 Dep 中，此时初始化完毕。

&emsp;&emsp;当数据发生变化时，触发 Observer 中 setter 方法，立即调用 Dep.notify(),Dep 这个数组开始遍历所有的订阅者，并调用其 update 方法，Vue 内部再通过 diff 算法，patch 相应的更新完成对订阅者视图的改变。

## 既然 Vue 通过数据劫持可以精准探测数据变化,为什么还需要虚拟 DOM 进行 diff 检测差异?

考点: Vue 的变化侦测原理前置知识: 依赖收集、虚拟 DOM、响应式系统现代前端框架有两种方式侦测变化，一种是 pull，一种是 push

pull: 其代表为 React，我们可以回忆一下 React 是如何侦测到变化的,我们通常会用 setStateAPI 显式更新，然后 React 会进行一层层的 Virtual Dom Diff 操作找出差异，然后 Patch 到 DOM 上，React 从一开始就不知道到底是哪发生了变化，只是知道「有变化了」，然后再进行比较暴力的 Diff 操作查找「哪发生变化了」，另外一个代表就是 Angular 的脏检查操作。

push: Vue 的响应式系统则是 push 的代表，当 Vue 程序初始化的时候就会对数据 data 进行依赖的收集，一但数据发生变化,响应式系统就会立刻得知。因此 Vue 是一开始就知道是「在哪发生变化了」，但是这又会产生一个问题，如果你熟悉 Vue 的响应式系统就知道，通常一个绑定一个数据就需要一个 Watcher，一但我们的绑定细粒度过高就会产生大量的 Watcher，这会带来内存以及依赖追踪的开销，而细粒度过低会无法精准侦测变化,因此 Vue 的设计是选择中等细粒度的方案,在组件级别进行 push 侦测的方式,也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件,然后在组件内部进行 Virtual Dom Diff 获取更加具体的差异，而 Virtual Dom Diff 则是 pull 操作，Vue 是 push+pull 结合的方式进行变化侦测的。
