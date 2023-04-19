# 接口

## 什么是接口

> 在面向对象语言中，接口（Interface）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
>
> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

接口是对 JavaScript 本身的随意性进行约束，通过定义一个接口，约定了变量、类、函数等应该按照什么样的格式进行声明，实现多人合作的一致性。TypeScript 编译器依赖接口用于类型检查，最终编译为 JavaScript 后，接口将会被移除。

## 声明方式

使用 interface 关键字进行声明，假如我们定义一个商品的接口，商品普遍的属性有颜色、形状、大小、价格等。

```Typescript
interface IGoods{
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

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。我们把这一部分的属性称之为可选属性，带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

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
    if(pet.nickname) {
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
