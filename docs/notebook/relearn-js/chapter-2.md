# 运算符和流程控制

## 运算符

- 算术运算符：`+` `-` `*` `/` `%` `**`
- 赋值运算符：`=` `+=` `-=` `*=` `/=` `%=` `**=`
- 关系运算符：`==` `===` `!=` `!==` `<` `>` `<=` `>=`
- 逻辑运算符：`&&` `||` `!`
- 条件运算符：`condition? true_value : false_value`
- 位运算符：`&` `|` `^` `~` `<<` `>>` `>>>`
- 其他运算符：`typeof` `instanceof` `void` `delete`

除了以上运算符，还有一些特殊的运算符，如`++` `--` `?.` `?.()` `?.[]` `()` `[]` `new` `function` `this` `arguments` `super` `yield` `await` `async` `await*` `=>` `...` 等。

### 运算符优先级

运算符的优先级决定了表达式的执行顺序。优先级高的运算符会先被执行，优先级低的运算符则会被放到等级更高的运算符的后面等待执行。

JavaScript 运算符的优先级从高到低依次是：

- 后缀运算符：`()` `[]` `.` `++` `--` `!` `typeof` `void` `delete` `~` `+` `-` `typeof` `void` `delete` `~`
- 一元运算符：`++` `--` `!` `typeof` `void` `delete` `~` `+` `-`
- 乘除运算符：`*` `/` `%`
- 加减运算符：`+` `-`
- 位运算符：`<<` `>>` `>>>` `&` `|` `^`
- 关系运算符：`==` `===` `!=` `!==` `<` `>` `<=` `>=`
- 相等运算符：`==` `===` `!=` `!==`
- 逻辑运算符：`&&` `||`
- 条件运算符：`condition? true_value : false_value`
- 赋值运算符：`=` `+=` `-=` `*=` `/=` `%=` `**=`
- 逗号运算符：`,`

> [!important] 注意
>
> `=` `+=` `-=` `*=` `/=` `%=` `**=` 等赋值运算符的优先级比其他运算符低，因此它们只能在赋值表达式的左侧使用。

### 运算符的使用

```javascript
// 算术运算符
console.log(2 + 3); // 5
console.log(2 - 3); // -1
console.log(2 * 3); // 6
console.log(2 / 3); // 0.6
console.log(2 % 3); // 2
console.log(2 ** 3); // 8

// 赋值运算符
let a = 1;
a += 2; // a = a + 2
console.log(a); // 3
a -= 2; // a = a - 2

// 关系运算符
console.log(2 == 3); // false
console.log(2 === 3); // false
console.log(2 != 3); // true
console.log(2 !== 3); // true
console.log(2 < 3); // true
console.log(2 <= 3); // true

// 逻辑运算符
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false

// 条件运算符
console.log(true ? 1 : 2); // 1

// 位运算符
console.log(0b1010 & 0b1100); // 0b1000
console.log(0b1010 | 0b1100); // 0b1110
console.log(0b1010 ^ 0b1100); // 0b0110
console.log(~0b1010); // -0b1011
console.log(0b1010 << 2); // 0b101000
console.log(0b1010 >> 2); // 0b0010
console.log(0b1010 >>> 2); // 0b0010

// 其他运算符
console.log(typeof 123); // "number"
console.log(typeof '123'); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function () {}); // "function"
console.log(typeof Math.max); // "function"
```

### 比较运算符的注意事项

JavaScript 中的比较运算符有两种：`==` 和 `===`。

- `==` 运算符会自动转换数据类型再比较，可能会导致一些问题。
- `===` 运算符不会自动转换数据类型，如果数据类型不同，则返回 `false`。

```javascript
console.log(1 == '1'); // true  '1' 会被自动转换为 1
console.log(1 === '1'); // false
```

### 逻辑运算符的短路求值

逻辑运算符 `&&` 和 `||` 都具有短路求值特性，即如果第一个操作数可以确定整个表达式的值，则不会计算第二个操作数。

```javascript
let a = 1;
let b = 0;
let c = a && b && b + 1;
console.log(c); // 0

let d = 0;
let e = 2;
let f = d || e || e + 1;
console.log(f); // 2
```

## 流程控制

- `if` `else` `switch` `case` `default` `for` `while` `do-while` `break` `continue` `return` `try-catch-finally` 等

### 流程控制的使用

```javascript
// 密码强度检查
function checkPassword(password) {
  let strength = '';

  if (password.length < 8) {
    strength = '密码强度弱';
  } else if (password.length >= 8 && password.length <= 12) {
    strength = '密码强度中等';
  } else if (password.length > 12) {
    strength = '密码强度高';
  }
  return strength;
}
```

### switch 的注意事项

```javascript
// 打招呼
function sayHello(name) {
  switch (name) {
    case 'John':
      console.log('Hello John');
      break;
    case 'Mary':
      console.log('Hello Mary');
      break;
    default:
      console.log('Hello stranger');
      break;
  }
}

// 错误处理
function handleError(error) {
  switch (error.code) {
    case 'notice': // 如果没有 break，则会执行下一个 case
    case 'warning':
      console.log('这是一条提示信息');
      break;
    case 'error':
    default:
      console.log('这是一条错误信息');
      break;
  }
}

// 特殊用法
function ageRange(age) {
  let range = '';
  switch (true) {
    case age < 18:
      range = '未成年';
      break;
    case age >= 18 && age < 60:
      range = '成年';
      break;
    case age >= 60:
      range = '老年';
      break;
    default:
      range = '未知';
      break;
  }
  return range;
}
```

### for 循环

```javascript
// 打印 1 到 10
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// 打印杨辉三角
function printPascalTriangle(row) {
  let result = '';
  for (var i = 1; i <= row; i++) {
    result += ' '.repeat(row - i);
    result += '*'.repeat(2 * i - 1);

    // 换行
    result += '\n';
  }
  console.log(result);
}

function printPascalTriangle(row) {
  let result = '';
  for (var i = 1; i <= row; i++) {
    // 打印空格
    for (var j = 0; j < row - i; j++) {
      result += ' ';
    }

    // 打印 *
    for (var j = 0; j < 2 * i - 1; j++) {
      result += '*';
    }

    // 换行
    result += '\n';
  }
  console.log(result);
}
```

### break、continue 和 label

```javascript
// 打印 1 到 5
for (let i = 1; i <= 10; i++) {
  console.log(i);
  if (i === 5) {
    break;
  }
}

// 打印 1 到 10，跳过 5
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}

// 打印 1 到 10，跳过 5
outer: for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    if (i === 5) {
      continue outer;
    }
    console.log(i, j);
  }
}
```

### for...in 和 for...of

```javascript
// for...in
let obj = { name: 'John', age: 30, city: 'New York' };
for (let key in obj) {
  console.log(key, obj[key]);
}

// for...of
let arr = [1, 2, 3, 4, 5];
for (let value of arr) {
  console.log(value);
}
```

> [!important] for..in 和 for...of 的区别
>
> 1.`for...in` 可以用于遍历`对象`和`数组`，`for...of` `无法`遍历`对象`，只能用于遍历`数组`。
>
> 2.`for...in` 用于遍历对象的（`key`）和数组的（`index`），`for...of` 用于遍历数组的（`value`）。

## 参考

- [MDN 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)
- [MDN 流程控制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements)

```

```
