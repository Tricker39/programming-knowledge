# 接口

## 什么是接口

> 在面向对象语言中，接口（Interface）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
>
> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

接口是对 JavaScript 本身的随意性进行约束，通过定义一个接口，约定了变量、类、函数等应该按照什么样的格式进行声明，实现多人合作的一致性。TypeScript 编译器依赖接口用于类型检查，最终编译为 JavaScript 后，接口将会被移除。

## 声明方式

使用 `interface` 关键字进行声明，假如我们定义一个商品的接口，商品普遍的属性有颜色、形状、大小、价格等。

```Typescript
interface IGoods {
  color: string;
  shape: string;
  size: number;
  price: number;
}
```

::: tip Tips

1. 定义接口要首字母大写（推荐首字母使用 I 来定义接口，可以更加直观的知道这是一个接口）。
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
interface IPosition {
  readonly longitude: number;
  readonly latitude: number;
}
```

你可以通过赋值一个对象字面量来构造一个 `Position`。赋值后，`longitude` 和 `latitude` 再也不能被改变了。

```TypeScript
interface IPosition {
  readonly longitude: number;
  readonly latitude: number;
}
const beijing: IPosition = { longitude: 116.397128, latitude: 39.916527 }
beijing.longitude = 115.397128; // Cannot assign to 'longitude' because it is a read-only property.
```

使用 readonly 修饰符并不一定意味着一个值是完全不可改变的--或者换句话说，它的内部内容不能被改变。它只是意味着该属性本身不能被重新写入。

```TypeScript
interface IPosition {
  longitude: number;
  latitude: number;
}

interface ReadonlyIPosition {
  readonly longitude: number;
  readonly latitude: number;
}

let writablePosition: IPosition = {
  longitude: 116.397128,
  latitude: 39.916527
};

let readonlyPosition: ReadonlyIPosition = writablePosition;

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

索引签名属性仅允许某些类型：`string`、`number`、`symbol`、`模板字符串模式`以及仅包含这些的联合类型。

虽然字符串索引签名是描述 "dictionary" 模式的强大方式，但它们还强制所有属性与其返回类型匹配。这是因为字符串索引声明 `obj.property` 也可用作 `obj["property"]`。在下面的例子中，`name` 的类型与字符串索引的类型不匹配，类型检查器给出错误：

```TypeScript
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok
  name: string; // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

但是，如果索引签名是属性类型的联合，则可以接受不同类型的属性：

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

## 参考资料

:::tip 参考资料

[对象类型](https://www.typescriptlang.org/docs/handbook/interfaces.html)

:::
