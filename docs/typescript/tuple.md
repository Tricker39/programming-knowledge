# 元组

## 声明方式

元组可以像数组一样被解构，解构的变量得到相应元组元素的类型：

```typescript
let tuple: [number, string, boolean] = [7, 'hello', true];
let [a, b, c] = tuple;
console.log(a); // 7
console.log(b); // hello
console.log(c); // true
```

当访问一个越界的元素会报错。

```typescript
let tuple: [number, string, boolean] = [7, 'hello', true];
tuple[4] = 'world'; // Error, Property '4' does not exist on type '[number, string, boolean]'.
console.log(tuple[5].toString()); // Error, Property '5' does not exist on type '[number, string, boolean]'.
```

元组的声明和使用需要注意一下一点

```typescript
// 当前元组的长度是 3
let tuple: [number, string, boolean] = [7, 'hello', true];
// 可以往元组里面 push
tuple.push('a');
// 但是无法通过索引读取
console.log(tuple[3]); // ❌ Tuple type '[number, string, boolean]' of length '3' has no element at index '3'.

// 可以通过迭代器访问添加的元素
tuple.forEach((item) => {
  console.log(item); // 7, "hello", true, 'a'
});
```

## 元组的结构

和数组一样，你可以用`...`对元组的其余部分进行解构，以得到一个子元组：

```typescript
let tuple: [number, string, boolean] = [7, 'hello', true];
let [a, ...b] = tuple; // b: ["hello", true]
let [a, b, c, ...d] = tuple; // d: []
```

当然我们也可以忽略尾部元素，或者忽略其他元素：

```typescript
let tuple: [number, string, boolean] = [7, 'hello', true];
let [a] = tuple; // a: 7
let [, b] = tuple; // b: "hello"
```

## 元组的元素别名

> 元组类型在严格类型检查的 API 中非常有用，其中每个元素的含义都是 "显而易见 "的。这给了我们灵活性，当我们对变量进行解构时，我们可以对其进行任何命名。在上面的例子中，我们能够将元素 0 和 1 命名为我们想要的任何东西。

```typescript
// tuple[0] 的别名是 age，tuple[1]的别名是 hasPartner
const tuple: [age: number, hasPartner: boolean] = [18, false];
// 无法通过别名访问到具体的值
console.log('tuple.age:', tuple['age']); // tuple.age: undefined
```

唯一的用处，就是在编辑器中会弹出提示，提示这个元素代表着什么意思:

<iframe height="480" style="width: 100%;" scrolling="no" src="https://www.typescriptlang.org/zh/play?#code/PTAEBcFcAcBsFMDaAGAuqQIW6GolQsCqHozUAQwHN5AYf6jiQEZVt9QALQgZwAVCAncAO3k4BQAYwD2PFuAgwEALlCIS8OT0gBbAEb8ANE1YdufTnPUiRCQj3QBeedQAcOgGaFYLeKgDcwsSzPwAdLAixAAUAOSUCP6KMmE6kUhoAJQeQA" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

由于不是每个用户都对元组持有肯定的态度，所以是否使用元组需重新考虑一下，使用具有描述性属性名称的对象是否对你的 API 更好。

::: warning 元组与数组的区别

1. 在 TypeScript 中，定义数组时，无需指定数组的长度。元组是一个长度固定的的数组。
2. 数组与元组都能指定不同子元素类型，区别在于数组子元素的类型与索引无关，元组必须按照索引给出的类型去声明子元素的类型。
3. 元组另一个区别于数组的地方，就是元组的每一个元素，都可以设定别名。

:::
