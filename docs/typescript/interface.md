# 接口

## 什么是接口

> 在面向对象语言中，接口（Interface）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
>
> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

接口是对 JavaScript 本身的随意性进行约束，通过定义一个接口，约定了变量、类、函数等应该按照什么样的格式进行声明，实现多人合作的一致性。TypeScript 编译器依赖接口用于类型检查，最终编译为 JavaScript 后，接口将会被移除。

## 声明方式

使用 `interface` 关键字进行声明，假如我们定义一个商品的接口，商品普遍的属性有颜色、形状、大小、价格等。

```Typescript
interface Goods {
  color: string;
  shape: string;
  size: number;
  price: number;
}
```

::: tip Tips

1. 定义接口要首字母大写。
2. 如果没有特殊声明，定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的，赋值的时候，变量的属性值必须和接口定义的属性值保持一致。

:::

## 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。我们把这一部分的属性称之为可选属性，带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

下面是应用了“option bags”的例子：

```TypeScript
interface Pet {
  swim?: boolean;
  fly?: boolean;
  run?: boolean;
  nickname?: string;
}

function bugAPet(pet: Pet): Pet {
  let dog = { nickname: '花花', run: true };
  if (pet.nickname) {
    dog.nickname = pet.nickname
  }
  return dog;
}

let myPet = bugAPet({ nickname: "小白" });
```

可选属性的好处：

1. 可以对可能存在的属性进行预定义，
2. 可以捕获引用了不存在的属性时的错误。

<!-- <iframe height="320" style="width: 100%;" scrolling="no" src="https://stackblitz.com/edit/typescript-rvboxf?embed=1&file=index.ts&theme=dark&view=editor" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe> -->

<iframe height="480" style="width: 100%;" scrolling="no" src="https://www.typescriptlang.org/zh/play?#code/JYOwLgpgTgZghgYwgAgAoTMg3gKGf5AZwHdgBbAfgC5kAjAe3oBsI4QBuPAmJgT2rqMWbTgWRQAriAENmrDl3whgCANYg4ZCAMJgooAOacAvjhwJ6IXXQkGAgukwBeZAAoADhhqOAlN4zITgB82IrILJgAJvQG-s7YyMpqGlo0AOSA5JqA1sppADTiUjR6EhD5tHBQqkWSKMaiBFAYElAgyNFGOMZAA" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```TypeScript
interface Position {
  readonly longitude: number;
  readonly latitude: number;
}
```

你可以通过赋值一个对象字面量来构造一个 `Position`。赋值后，`longitude` 和 `latitude` 再也不能被改变了。

```TypeScript
interface Position {
  readonly longitude: number;
  readonly latitude: number;
}
const beijing: Position = { longitude: 116.397128, latitude: 39.916527 }
beijing.longitude = 115.397128; // Cannot assign to 'longitude' because it is a read-only property.
```

使用 readonly 修饰符并不一定意味着一个值是完全不可改变的--或者换句话说，它的内部内容不能被改变。它只是意味着该属性本身不能被重新写入。

```TypeScript
interface Position {
  longitude: number;
  latitude: number;
}

interface ReadonlyPosition {
  readonly longitude: number;
  readonly latitude: number;
}

let writablePosition: Position = {
  longitude: 116.397128,
  latitude: 39.916527
};

let readonlyPosition: ReadonlyPosition = writablePosition;

console.log(readonlyPosition.longitude); // 116.397128
writablePosition.longitude = 115.397128
console.log(readonlyPosition.longitude); // 115.397128
```

使用[映射修饰符](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers)，你可以删 `readonly` 属性。

<iframe height="480" style="width: 100%;" scrolling="no" src="https://www.typescriptlang.org/play?#code/PTAECUFMFsHsDdIGdQHIBOkCGATWA7AGwE9VQsAXC9ASwCMBXC5UAM3VmnNAuIAdIqFHw4D0FGsgBQvAaADCmSpACyTLHUKQAPABV+kAHygAvKADeU0KCV4ixUAG0ACqMjiHNfKADWkYrCsoPoCALoAXMEGLm4eoQDcUgC+iTIGoAAysADGfjgAgtnZsAz4FKYWVjbYdiSgNDiRSNReAOaJ1rYEdfhY0JBNLfjtyamykKAAqkQ5eYXFpeVmitjMahQaWtpZuZAFRSVlhvFAA" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## 索引签名

有时你并不知道类型属性的所有名称，但你确实知道值的类型。

```TypeScript
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
```

上面，我们有一个 `StringArray` 接口，它有一个索引签名。这个索引签名表明当一个 `StringArray` 被一个 `number` 索引时，它将返回一个 `string`。

索引签名属性仅允许某些类型：`string`、`number`、`symbol`、`模板字符串模式`以及仅包含这些的交叉类型。

虽然字符串索引签名是描述 "dictionary" 模式的强大方式，但它们还强制所有属性与其返回类型匹配。这是因为字符串索引声明 `obj.property` 也可用作 `obj["property"]`。在下面的例子中，`name` 的类型与字符串索引的类型不匹配，类型检查器给出错误：

```TypeScript
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok
  name: string; // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

但是，如果索引签名是属性类型的交叉，则可以接受不同类型的属性：

```TypeScript
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

最后，你可以制作索引签名 `readonly` 以防止分配给它们的索引：

```TypeScript
declare function getReadOnlyStringArray(): ReadonlyStringArray;
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory"; // error: Index signature in type 'ReadonlyStringArray' only permits reading.
```

您不能设置 `myArray[2]`，因为索引签名是 `readonly`。

当然我们还可以定义一个字符串索引

<iframe height="600" style="width: 100%;" scrolling="no" src="https://www.typescriptlang.org/zh/play?ssl=20&ssc=9&pln=19&pc=16#code/JYOwLgpgTgZghgYwgAgHJwLYQM7IN4BQyyA2iJhAFzLZhSgDmAutbfSAwNxHID0vyAJ6UQAVwwAjaHwEAFKAHsADtDCDkAckEbkCmMjUrNYydB3BcIBWGRxs2YA3ISANijALNbRuZAATCAAPA0EjDW8ODQA6Hn5SUADA6hMpKBZkFOk4jUyoX0SQsNzzS2tbe0dnNwNPcLofZASgwpQ69gZo5EAgzUAc81JyLFZ6jnS4EEFuYhImpIzxVPSIhgIAXwICUEhYRBR0LGwAJnweMgoh9tHxyfj-IOT56HTcmWRAA7VALjk50yhkQHozW3GyEAIW6ABW1AGNpgBh-wACRoBTuUAvwGAfE1AP7ygApXQCb8YBZz0AnaaAeH1AA8agDgzVbrBAKEC0WzUPY4ZAAXmOxA0AAsmRpqBoAIwHADMGgANDwAAzsuASBAaYkEUnkmwSKkUQ50hmaUXikVi-lC6hc7nEoA" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## 接口继承（扩展类型）

有一些类型可能是其他类型的更具体的版本，这是很常见的。例如，我们可能有一个 `BasicGoods` 类型，它定义了一件商品的基本属性。

```TypeScript
interface BasicGoods {
  name: string;
  size: number;
  shape: string;
  weight: number;
  color: string;
  price: number;
}
```

在某些情况下，这就足够了，但是在某些特定的商品中可能需要其他的属性。我们就可创建一个 `GoodsWithBatchNo` 的类型。

```TypeScript
interface GoodsWithBatchNo{
  batchNo: string;
  name: string;
  size: number;
  shape: string;
  weight: number;
  color: string;
  price: number;
}
```

我们重新创建了一个 `GoodsWithBatchNo` 类型来实现我们的需求，但这里的缺点是，当我们的变化只是单纯的在 `BasicGoods` 的基础上增加属性时，我们不得不重复定义 `BasicGoods` 所包含的属性。这时我们会想是否有什么解决方式可以让我避免这些重复的定义。而在 TypeScript 中提供了 `extends` 操作符来实现这一点。

```TypeScript
interface BasicGoods {
  name: string;
  size: number;
  shape: string;
  weight: number;
  color: string;
  price: number;
}

interface GoodsWithBatchNo extends BasicGoods {
  batchNo: string;
}
```

接口上的 `extends` 关键字允许我们有效地从类型中复制属性，并添加我们想要的任何新属性。这对于减少我们的代码量使代码更加简洁和优雅，同时也利于代码复用性的管理，提升了代码的可维护性。

接口也可以继承多个类型。

```TypeScript
interface BasicGoods {
  name: string;
  size: number;
  shape: string;
  weight: number;
  color: string;
  price: number;
}

interface BatchNo {
  batchNo: string;
}
interface Ball extends BasicGoods, BatchNo {
  brand: string;
}
const basketball: Ball = {
  batchNo: '20230101102533',
  name: "basketball",
  size: 24.5,
  shape: 'ball',
  weight: 550,
  color: '',
  price: 150,
  brand: "SPALDING",
}
```

## 交叉类型

接口允许我们通过扩展其他类型建立起新的类型。TypeScript 提供了另一种结构，称为交叉类型，主要用于组合现有的对象类型。

交叉类型是用 `&` 运算符定义的。

```TypeScript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

在这里，我们将 `Colorful` 和 `Circle` 进行组合，产生了一个新的类型，它拥有 `Colorful` 和 `Circle` 的所有属性。

## 接口继承 VS 交叉类型

我们刚刚看了两种组合类型的方法，它们很相似，但实际上有细微的不同。对于接口，我们可以使用 `extends` 子句来扩展其他类型，而对于交集，我们也可以做类似的事情，并用类型别名来命名结果。两者之间的主要区别在于如何处理冲突，而这种区别通常是你在接口和交叉类型的类型别名之间选择一个的主要原因之一。

<iframe height="600" style="width: 100%;" scrolling="no" src="https://www.typescriptlang.org/zh/play?#code/JYOwLgpgTgZghgYwgAgEJwM7AQcQPZ4AmGyA3gFDLIhwC2EAXMhmFKAOYDclyADm0iYgArrQBG0bgF9y5UJFiIU+IhgDqwMAAt0YBFoByeMjzFw9hvExZsQXHv2yNmrDtNlgAnrxToANn7IALxomNgqxMgAZMgR6po65vpGcuDQ8EihAQBMyBAAHpAgkehYuATEADSxFfHausnGpMgy5H4QYMgwBGBmAUz+gSEUVDT0TADkZhgA1h19fhOVpkmWk9kADNkAzBsAjPsH2QCs20sOAs4TezvnVI6CyBvkUkA" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

## 接口的实现

与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```TypeScript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor() {}
}
```

接口定义了类的公共部分，不包含私有部分。 它不会帮你检查类是否具有某些私有属性。

## 混合类型

先前我们提过，接口能够描述 JavaScript 里丰富的类型。 因为 JavaScript 其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时作为函数和对象使用，并带有额外的属性。

```TypeScript
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function(start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

## 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

<iframe height="480" style="width: 100%;" scrolling="no" src="https://www.typescriptlang.org/zh/play?#code/JYOwLgpgTgZghgYwgAgMIBsD2CDWrMgDOYUArgmJlMgN4BQyyIEA7gBQAWmpUAXE6QC2AI2gAaZINClI-EENFQAlPwBumYABM6AXzp0E6OIUJosuZMEEAHdBEERwpjNjwFiZClVoNkCHlCOYAAqVhD8ACJwkADcvgjuJOSUUJxyCuKS6SLQSrTIejpAA" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
</iframe>

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 `constructor` 存在于类的静态部分，所以不在检查的范围内。

因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口，`ClockConstructor` 为构造函数所用和 `ClockInterface` 为实例方法所用。 为了方便我们定义一个构造函数 `createClock`，它用传入的类型创建实例。

```TypeScript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

因为 `createClock` 的第一个参数是 `ClockConstructor` 类型，在 `createClock(AnalogClock, 7, 32)` 里，会检查 `AnalogClock` 是否符合构造函数签名。

另一种简单方式是使用类表达式：

```TypeScript
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};
```

## 接口继承 class

当接口继承了一个 `class` 类型时，它会继承类的属性但不包括其实现。就好像接口声明了所有类中存在的属性，但并没有提供具体实现一样。接口同样会继承到类的 `private` 和 `protected` 属性。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的属性的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 除了继承自基类，子类之间不必相关联。 例：

```TypeScript
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

class ImageControl implements SelectableControl {
// Error: Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
//  Types have separate declarations of a private property 'state'.
  private state: any;
  select() {}
}
```

在上面的例子里，`SelectableControl` 包含了 `Control` 的所有属性，包括私有属性 `state`。因为 `state` 是私有属性，所以只能够是 `Control` 的子类们才能实现 `SelectableControl` 接口。 因为只有 `Control` 的子类才能够拥有一个声明于 `Control` 的私有属性 `state`，这对私有属性的兼容性是必需的。

在 `Control` 类内部，是允许通过 `SelectableControl` 的实例来访问私有属性 `state` 的。 实际上，`SelectableControl` 就像 `Control` 一样，并拥有一个 `select` 方法。 `Button` 和 `TextBox` 类是 `SelectableControl` 的子类（因为它们都继承自 `Control` 并有 `select` 方法）。而对于 `ImageControl` 类，它有自身的私有属性 `state` 而不是通过继承 `Control` 得来的，所以它不可以实现 `SelectableControl` 。

## 参考资料

:::tip 参考资料

[对象类型](https://www.typescriptlang.org/docs/handbook/2/objects.html)

[接口](http://www.patrickzhong.com/TypeScript/zh/handbook/interfaces.html)

:::
