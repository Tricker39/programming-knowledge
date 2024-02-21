# 函数

> 函数是任何应用程序的基本构建块，无论它们是本地函数、从另一个模块导入的函数，还是类中的方法。它们也是值，就像其他值一样，TypeScript 有很多方法来描述如何调用函数。

## 函数声明

在 Typescript 中，函数的声明主要有以下四种方式。

```typescript
// 方法一 （函数类型表达式）
function add(x: number, y: number): number {
  return x + y;
}
// 方法二 （箭头函数）
const add = (x: number, y: number): number => {
  return x + y;
};
// 方法三 （类型别名）
type Add = (x: number, y: number) => number;
const add: Add = (x, y) => {
  return x + y;
};
// 方法四 （接口）
interface Add {
  (x: number, y: number): number;
}
const add: Add = (x, y) => {
  return x + y;
};
```
