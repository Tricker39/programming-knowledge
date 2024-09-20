# 第一章 变量

[JavaScript 可视化工具](https://pythontutor.com/render.html#mode=display)

[JavaScript 可视化工具合集](https://www.cnblogs.com/dearroy/p/13507450.html)

## 变量的数据类型

值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol、BigInt。

```javascript
// JavaScript 有 7 种基本的数据类型：
// 1. 数值（Number）
var num = 1;
// 2. 字符串（String）
var str = 'Hello World';
// 3. 布尔值（Boolean）
var bool = true;
// 4. null
var nullValue = null;
// 5. undefined
var undefinedValue = undefined;
// 6. symbol（ES6 新增）
var symValue = Symbol('key');
// 7. BigInt（ES10 新增）
var bigIntValue = 1234567890n;
```

引用数据类型（对象类型）：对象(Object)、数组(Array)、函数(Function)，还有两个特殊的对象：正则（RegExp）和日期（Date）。

```javascript
// 1. 对象（Object）
var obj = { name: 'John', age: 30, city: 'New York' };
// 2. 数组（Array）
var arr = [1, 2, 3, 4, 5];
// 3. 函数（Function）
function myFunction() {
  console.log('Hello World');
}
// 4. 正则（RegExp）
var regex = /hello/i;
// 5. 日期（Date）
var date = new Date();
```

### JavaScript 拥有动态类型

JavaScript 是一种动态类型语言，这意味着变量的类型可以改变。

```javascript
var x = 5;
x = true;
console.log(x); // Output: true
console.log(typeof x); // Output: "boolean"
x = 'Hello World';
console.log(x); // Output: "Hello World"
console.log(typeof x); // Output: "string"
```

### null 和 undefined 的区别

null 和 undefined 都是特殊的关键字，它们的含义不同。

- null 表示“空值”，即变量声明了，赋值为 “空值”。
- undefined 表示“未定义”，即变量声明了，但没有赋值。

```javascript
var x = null;
var y;
console.log(x); // Output: null
console.log(y); // Output: undefined
```

### symbol

[理解 JavaScript 基本数据类型 symbol](https://blog.csdn.net/xcg132566/article/details/108109837)

## 变量的命名规则

变量名必须以字母、数字、下划线(\_)或美元符号($)开头，不能以数字开头。

```javascript
var name1 = 'John';
var age2 = 30;
var _name3 = 'Jane';
var $salary4 = 5000;
```

变量名的命名规则：

- 变量名必须以字母、数字、下划线(\_)或美元符号($)开头。
- 变量名不能以数字开头。
- 变量名区分大小写。
- 变量名不能包含空格、标点符号、特殊字符。
- 变量名不能与 JavaScript 关键字冲突。

## 变量的声明

变量声明有三种方式：

- var 声明
- let 声明
- const 声明

### var 声明

```javascript
var x = 5;
```

var 声明的变量会在全局作用域或函数作用域中声明，并且可以重复声明。

#### 变量提升

JavaScript 引擎在执行代码前，会将变量声明(var)和函数声明(function)提升到当前作用域的最前面。

::: code-group

```javascript [变量声明]
console.log(x); // Output: undefined
var x = 5;

sayHello();

function sayHello() {
  console.log('Hello World');
}
```

```javascript [变量提升]
var x;
function sayHello() {
  console.log('Hello World');
}
// 由于变量提升，在 console.log 时，变量 x 已经声明，但未进行赋值，所以输出 undefined
console.log(x); // Output: undefined
x = 5;

// 由于函数声明提升，所以可以直接调用函数
sayHello();
```

```javascript [无变量提升]
console.log(x); // Output: ReferenceError: x is not defined
let x = 5;
// or
console.log(y); // Output: ReferenceError: y is not defined
const y = 10;

// 以上代码导致的异常，我们称之为暂时死区(TDZ)
```

:::

### let 声明

```javascript
let y = 10;
```

let 声明的变量只在当前代码块中有效，不能重复声明。

### const 声明

```javascript
const z = 15;
```

const 声明的变量的值不能改变，只能在声明时赋值。

### 作用域

JavaScript 有两种作用域：全局作用域和函数作用域。

- 全局作用域：全局作用域中的变量可以被所有代码访问，包括函数内部。
- 函数作用域：函数作用域中的变量只能在函数内部访问。

```javascript
// 全局作用域
var x = 5;

function myFunction() {
  // 函数作用域
  var y = 10;
  console.log(x + y); // Output: 15
}

myFunction();
```

#### 函数作用域的变量提升

函数作用域的变量声明会被提升到函数作用域的最前面，但函数声明不会被提升。

::: code-group

```javascript [类型一]
var x = 5;
function myFunction() {
  console.log(x); // Output: undefined
  var x = 10;
}
myFunction();
console.log(x); // Output: 5
```

```javascript [类型二]
var x = 5;
function myFunction() {
  if (false) {
    var x = 10;
  }
  console.log(x); // Output: undefined
}

myFunction();
console.log(x); // Output: 5
```

:::

#### 块级作用域

JavaScript 也支持块级作用域，使用 let 或 const 声明的变量只在当前代码块中有效。

```javascript
{
  // 块级作用域
  let x = 5; // or const x = 5;
}
console.log(x); // Output: ReferenceError: x is not defined

{
  // 函数级作用域
  var y = 10;
}
console.log(y); // Output: 10
```

### var，let，const 三者的特点和区别

一、var 的特点

1、存在变量提升

```javascript
console.log(a); // undefined
var a = 10;

// 编译过程
var a;
console.log(a); // undefined
a = 10;
```

2、一个变量可多次声明，后面的声明会覆盖前面的声明

```javascript
var a = 10;
var a = 20;
console.log(a); // 20
```

3、在函数中使用 var 声明变量的时候，该变量是局部的

```javascript
var a = 10;
function change() {
  var a = 20;
}
change();
console.log(a); // 10
```

而如果在函数内不使用 var，该变量是全局的

```javascript
var a = 10;
function change() {
  a = 20;
}
change();
console.log(a); // 20
```

二、let 的特点

1、不存在变量提升，let 声明变量前，该变量不能使用（暂时性死区）。

```javascript
console.log(a); // ReferenceError: a is not defined
let a = 10;
```

2、let 命令所在的代码块内有效，在块级作用域内有效

```javascript
{
  let a = 10;
}
console.log(a); // ReferenceError: a is not defined
```

3、let 不允许在相同作用域中重复声明，注意是相同作用域，不同作用域有重复声明不会报错

```javascript
let a = 10;
let a = 20;
// Uncaught SyntaxError: Identifier 'a' has already been declared

let a = 10;
{
  let a = 20;
}
// ok
```

三、const 的特点

1、const 声明一个只读的变量，声明后，值就不能改变

```javascript
const a = 10;
a = 20; // TypeError: Assignment to constant variable.
```

2、const 必须初始化

```javascript
const a;  // SyntaxError: Missing initializer in const declaration
const a = 10; // ok
```

3、const 并不是变量的值不能改动，而是变量指向的内存地址所保存的数据不得改动

```javascript
const obj = {
  age: 17,
};
obj.age = 18; // ok

obj = {
  age: 18,
};
//  SyntaxError: Identifier 'obj' has already been declared
```

4、let 该有的特点 const 都有

四、区别

变量提升

> var 声明的变量存在变量提升，即变量可以在声明之前调用，值为 undefined
>
> let 和 const 不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

块级作用域

> var 不存在块级作用域
>
> let 和 const 存在块级作用域

重复声明

> var 允许重复声明变量
>
> let 和 const 在同一作用域不允许重复声明变量

修改声明的变量

> var 和 let 可以
>
> const 声明一个只读的常量。一旦声明，常量的值就不能改变，但对于对象和数据这种引用类型，内存地址不能修改，可以修改里面的值。

五、使用

能用 const 的情况下尽量使用 const，大多数情况使用 let，避免使用 var。

const > let > var

const 声明的好处，一让阅读代码的人知道该变量不可修改，二是防止在修改代码的过程中无意中修改了该变量导致报错，减少 bug 的产生。let 声明没有产生预编译和变量提升的问题，先声明再使用可以让代码本身更加规范，let 是个块级作用域，也不会污染到全局的变量声明。最后说一点就是使用的场景说明：let 一般应用于基本数据类型；const 一般应用于引用数据类型，也就是函数对象等。
