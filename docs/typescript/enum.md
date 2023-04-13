<script setup>
import MTag from '../components/MTag.vue';
</script>

# 枚举

## 声明方式

枚举类型的声明方式是使用 `enum` 关键字 ，然后声明枚举类型的名称（一般以大写字母开头）

```Typescript
enum Color {Red, Green, Blue}
```

## 枚举类型的值

默认情况下，从 0 开始为元素编号，之后的每个值依次递增。

```Typescript
enum Color {Red, Green, Blue}
let c1: Color = Color.Red;
let c2: Color = Color.Green;
let c3: Color = Color.Blue;
console.log(c1); // 0
console.log(c2); // 1
console.log(c3); // 2
```

你也可以手动的指定成员的数值。例如，我们将上面的例子改成从 1 开始编号：

```Typescript
enum Color {Red = 1, Green, Blue}
let c1: Color = Color.Red;
let c2: Color = Color.Green;
let c3: Color = Color.Blue;
console.log(c1); // 1
console.log(c2); // 2
console.log(c3); // 3
```

或者，全部都采用手动赋值：

```Typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c1: Color = Color.Red;
let c2: Color = Color.Green;
let c3: Color = Color.Blue;
console.log(c1); // 1
console.log(c2); // 2
console.log(c3); // 4
```

一种特殊情况，枚举类型的值是相同的，容易造成混淆，所以在定义时要多加注意

```Typescript
// ❌ 不推荐
enum Color {Red = 1, Green = 2, Black, Orange, Blue = 4, Pink = 10, White }
console.log(Color.Black); // 3
console.log(Color.Orange); // 4
console.log(Color.Blue); // 4
console.log(Color.Pink); // 10
console.log(Color.White); // 11
```

以上的代码表明了两点（一般不建议使用以上的声明方式）：

- 每个值依次递增（以上一个值为基础）
- 枚举的选项值是可以相同的

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为 2，但是不确定它映射到 Color 里的哪个名字，我们可以查找相应的名字：

```Typescript
enum Color {Red = 1, Green, Blue}

let colorName: string = Color[2];

console.log(colorName); // 显示'Green'因为上面代码里它的值是 2
```

枚举在运行环境下被编译成一个对象

```Typescript
enum Color {Red, Green, Blue}
console.log(Color); //{ '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
```

从上述代码我们可以看出，我们既可以使用枚举的名称来访问，也可以用枚举的值来访问。我们称之为 <m-tag type='tip'>反向映射</m-tag>。

以下是枚举反向映射的实现方式：

::: code-group

```Typescript [Typescript]
enum Color {Red, Green, Blue}
```

```Javascript [Javascript]
"use strict";
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));

```

:::

字符串枚举

::: code-group

```Typescript [Typescript]
enum Message{
  Success = '恭喜你，成功了',
  Fail = '很遗憾，失败了',
  Ongoing='ing'
}
```

```Javascript [Javascript]
"use strict";
var Message;
(function (Message) {
    Message["Success"] = "\u606D\u559C\u4F60\uFF0C\u6210\u529F\u4E86";
    Message["Fail"] = "\u5F88\u9057\u61BE\uFF0C\u5931\u8D25\u4E86";
    Message["Ongoing"] = "ing";
})(Message || (Message = {}));
```

:::

![反向映射](/imgs/typescript/2.png)

由此我们可以看出，字符串枚举是不可以进行反向映射的。

当然我们可以把字符串枚举和数字枚举混用构成异构枚举。但在日常开发中容易造成混淆，不建议使用

```Typescript
// ❌ 不推荐
enum Message{
  Success ='恭喜你，成功了',
  Fail = 0
}
// ✔️ 推荐使用
enum Message{
  Success ='恭喜你，成功了',
  Fail = '很遗憾，失败了'
}
```

:link: [关于枚举中「反向映射」的小概念实验](https://juejin.cn/post/6844904153005686792)

## 枚举成员

枚举成员分为两种：

- 常量数值成员（const）
- 需要计算的枚举成员，就是一些表达式（computed）

::: code-group

```Typescript
enum Char{
  // const
  a,
  b = Char.a,
  c = 1 + 3,
  // computed （编译阶段不会进行计算，运行时才会计算）
  d =  Math.random(),
  e = '123'.length,
  // f Error: 枚举成员必须具有初始化表达式（在 computed 成员之后的成员需要进行赋值）
}
```

```Javascript
"use strict";
var Char;
(function (Char) {
    // const
    Char[Char["a"] = 0] = "a";
    Char[Char["b"] = 0] = "b";
    Char[Char["c"] = 4] = "c";
    // computed （编译阶段不会进行计算，运行时才会计算）
    Char[Char["d"] = Math.random()] = "d";
    Char[Char["e"] = '123'.length] = "e";
})(Char || (Char = {}));
```

:::

## 常量枚举

使用 `const` 声明的枚举就是常量枚举，常量枚举的特性是在编译阶段会被移除

::: code-group

```Typescript
const enum Month{ Jan, Feb, Mar }
```

```Javascript
"use strict";
```

:::

常量枚举的作用：当我么不需要一个对象，只需要对象的值的时候可以使用常量枚举，这样可以减少编译环境的代码。

::: code-group

```Typescript
const enum Month{ Jan, Feb, Mar }
let month = [Month.Jan, Month.Feb, Month.Mar];
```

```Javascript
"use strict";
let month = [0 /* Month.Jan */, 1 /* Month.Feb */, 2 /* Month.Mar */];
```

:::

## 枚举类型

在某些情况下，枚举和枚举成员都可以作为一个单独的类型存在。（最新版好像无法使用，有待验证）

::: code-group

```Typescript
enum E{ a, b}
enum F{ a = 0, b = 1}
enum G{ a = 'apple', b = 'banana' }

let e: E = 3; // ❌ Type '3' is not assignable to type 'E'.（最新的规范中是不可以超出枚举的值范围）
let e: E = 1; // ✔️ e 的类型就是 E.b

let g1:G;
let g2:G.a;

console.log(g1); // ❌ Variable 'g1' is used before being assigned.
console.log(g2); // ❌ Variable 'g2' is used before being assigned.
```

```Javascript
"use strict";
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var F;
(function (F) {
    F[F["a"] = 0] = "a";
    F[F["b"] = 1] = "b";
})(F || (F = {}));
var G;
(function (G) {
    G["a"] = "apple";
    G["b"] = "banana";
})(G || (G = {}));
let e = 3; // ❌ Type '3' is not assignable to type 'E'.（最新的规范中是不可以超出枚举的值范围）
let e = 1; // ✔️ e 的类型就是 E.b
let g1;
let g2;
console.log(g1); // ❌ Variable 'g1' is used before being assigned.
console.log(g2); // ❌ Variable 'g2' is used before being assigned.


```

:::
