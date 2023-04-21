# 基础类型

## Boolean

最基本的数据类型就是简单的 true/false 值，在 JavaScript 和 TypeScript 里叫做 boolean。

```TypeScript
let isDone: boolean = false;
```

## Number

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数或者大整数。这些浮点数的类型是 number， 而大整数的类型则是 bigint。除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015 中引入的二进制和八进制字面量。

```TypeScript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
let bigLiteral: bigint = 100n;
```

## String

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。像其它语言里一样，我们使用 string 表示文本数据类型。和 JavaScript 一样，可以使用双引号（"）或单引号（'）表示字符串。

```TypeScript
let name: string = "bob";
name = "smith";
```

你还可以使用**模版字符串**，它可以定义多行文本和内嵌表达式。这种字符串是被反引号包围 （\`\`），并且以 ${ expr } 这种形式嵌入表达式

```TypeScript
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${name}.I'll be ${age + 1} years old next month.`;
```

这与下面定义 sentence 的方式效果相同：

```TypeScript
let sentence: string = "Hello, my name is " + name + ".\n\n" + "I'll be " + (age + 1) + " years old next month.";
```

## Symbol

```TypeScript
let s = Symbol();
console.log(typeof s); // "symbol"
```

## Array

TypeScript 像 JavaScript 一样可以操作数组元素。有两种方式可以定义数组。第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：

```TypeScript
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，Array<元素类型>：

```TypeScript
let list: Array<number> = [1, 2, 3];
```

## Tuple

> [元组](/typescript/tuple)类型是一种另类的数组类型，它确切地知道它包含多少个元素，以及它在特定位置元素的类型。

比如，你可以定义一对值分别为 string 和 number 类型的元组。

::: code-group

```TypeScript
let x: [string, number] =  [ 'hello', 0 ];
```

```Javascript
"use strict";
let x = ['hello', 0]; // 由此可以看出元组本质上（或者说编译后）是一个特殊数组。
```

:::

## Enum

> [Enum](/typescript/enum) 类型是对 JavaScript 标准数据类型的一个补充。使用枚举类型可以为一组数值赋予友好的名字。可以简单的理解为一组具有名字的常量集合。

```TypeScript
enum Color{ Green, Red, Blue }
```

## Unknown

当我们在写应用的时候可能会需要描述一个我们还不知道其类型的变量。这些值可以来自动态内容，例如从用户获得，或者我们想在我们的 API 中接收所有可能类型的值。在这些情况下，我们想要让编译器以及未来的用户知道这个变量可以是任意类型。这个时候我们会对它使用 unknown 类型。

```TypeScript
let notSure: unknown = 4;
notSure = "maybe a string instead";
// OK, definitely a boolean
notSure = false;
```

如果你有一个 unknwon 类型的变量，你可以通过进行 typeof 、比较或者更高级的类型检查来将其的类型范围缩小：

```TypeScript
declare const maybe: unknown; // 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;
if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
}
if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  const aBoolean: boolean = maybe;
}
```

## Any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。那么我们可以使用 any 类型来标记这些变量：

```TypeScript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

在对现有代码进行改写的时候，any 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。你可能认为 Object 有相似的作用，就像它在其它语言中那样。但是 Object 类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：

```TypeScript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

::: warning 注意

应避免使用 Object，而是使用非原始 object 类型，正如 Do's and Don'ts 里所讲的那样。

:::

当你只知道一部分数据的类型时，any 类型也是有用的。比如，你有一个数组，它包含了不同的类型的数据：

```TypeScript
let list: any[] = [1, true, "free"];

list[1] = 100;
```

## Null 和 Undefined

TypeScript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 null。 和 void 相似，它们的本身的类型用处不是很大：

```TypeScript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。

然而，当你指定了--strictNullChecks 标记，null 和 undefined 只能赋值给 any 和它们各自的类型（有一个例外是 undefined 还可以赋值给 void 类型）。这能避免**很多**常见的问题。也许在某处你想传入一个 string 或 null 或 undefined，你可以使用联合类型 string | null | undefined。

联合类型是高级主题，我们会在以后的章节里讨论它。

::: warning 注意

我们鼓励尽可能地使用--strictNullChecks，但在本手册里我们假设这个标记是关闭的。

:::

## Void

> 一个未定义的子类型，旨在作为返回类型使用。

当一个函数没有返回值时（返回的值是 undefined），你通常会见到其返回值类型是 void：

```TypeScript
function warnUser(): void {
  console.log("This is my warning message");
}
```

声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 null（只在--strictNullChecks 未指定时）和 undefined：

```TypeScript
let unusable: void = undefined;
```

## Never

never 类型表示的是那些永不存在的值的类型。例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。

never 类型是任何类型的子类型，也可以赋值给任何类型；然而，**没有**类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。即使 any 也不可以赋值给 never。

下面是一些返回 never 类型的函数：

```TypeScript
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为 never
function fail() {
  return error("Something failed");
}

// 返回 never 的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}
```

:link: [TypeScript never 类型](https://cloud.tencent.com/developer/article/1594872)<br />

:link: [Never 类型](https://jkchao.github.io/TypeScript-book-chinese/typings/neverType.html)

## Object

object 表示非原始类型，也就是除 number，string，boolean，bigint，symbol，null 或 undefined 之外的类型。

使用 object 类型，就可以更好的表示像 Object.create 这样的 API。例如：

```TypeScript
declare function create(o: object | null): void;

create({prop: 0}); // OK
create(null); // OK
create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

## 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。TypeScript 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。其一是“尖括号”语法：

```TypeScript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
另一个为 as 语法：
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

两种形式是等价的。至于使用哪个大多数情况下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。

## 关于 let

你可能已经注意到了，我们使用 let 关键字来代替大家所熟悉的 JavaScript 关键字 var。 let 是 ES2015 引入的关键字，它比 var 更加安全，因此被看做是声明变量的标准方式。 我们会在以后详细介绍它，很多常见的问题都可以通过使用 let 来解决，所以尽可能地使用 let 来代替 var 吧。

## 关于 Number, String, Boolean, Symbol 和 Object

我们很容易会认为 Number、 String、 Boolean、Symbol 以及 Object 这些类型和我们以上推荐的小写版本的类型是一样的。但这些类型不属于语言的基本类型，并且几乎在任何时候都不应该被用作一个类型：

```TypeScript
// @errors: 2339
function reverse(s: String): String {
  return s.split("").reverse().join("");
}

reverse("hello world");
```

相对地，我们应该使用 number、string、boolean、object 和 symbol

```TypeScript
function reverse(s: string): string {
  return s.split("").reverse().join("");
}

reverse("hello world");
```
