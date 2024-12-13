# JavaScript 值类型使用

## 类型判断

### typeof 运算符

`typeof` 表示“获取变量的数据类型”

```javascript
typeof 1; // 'number'
typeof '1'; //'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof null; // 'object'
typeof {}; // 'object'
typeof []; // 'object'
typeof function () {}; // 'function'
```

### instanceof 运算符

`instanceof` 是用来检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```javascript
[] instanceof Array; // true
{} instanceof Object; // true

function () {} instanceof Function; // true
function User() {
    this.name = 'Tricker';
    this.age = 18;
}
let user = new User();
user instanceof User; // true
```

[手写 instanceof](https://www.jb51.net/javascript/284891c8f.htm)

> [!important] typeof 和 instanceof 的区别
>
> 相同点：
>
> - JavaScript 中 typeof 和 instanceof 常用来判断一个变量是否为空， 或者是什么类型的。
>
> 不同点
>
> - 返回值不同：`typeof` 返回的是字符串，而 `instanceof` 返回的是布尔值。
> - `typeof` 可以准确的检测基本类型，对于复杂的对象一律返回 object。
> - `instanceof` 用于判断一个变量是否属于某个对象的实例（变量是否在该对象的原型链上）。

### Object.prototype.toString.call() 方法

```javascript
Object.prototype.toString.call(1); // '[object Number]'
Object.prototype.toString.call('1'); // '[object String]'
Object.prototype.toString.call(true); // '[object Boolean]'
Object.prototype.toString.call(undefined); // '[object Undefined]'
Object.prototype.toString.call(null); // '[object Null]'
Object.prototype.toString.call({}); // '[object Object]'
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call(function () {}); // '[object Function]'
function User() {
  this.name = 'Tricker';
  this.age = 18;
}
let user = new User();
Object.prototype.toString.call(user); // '[object Object]'
```

## String 类型

### 字符串转义

使用 `\` 转义字符。

```javascript
let str = "I'm Tricker";
console.log(str); // I'm Tricker

// \n 表示换行
// \r 表示回车
// \t 表示制表符
// \b 表示退格
// \f 表示换页
// \s 表示空格
// ...
```

### 字符串模板

使用反引号 ` `` ` 标识。

#### 字符串模板的基本用法

```javascript
let name = 'Tricker';
let age = 18;
let message = `My name is ${name}, and I'm ${age} years old.`;
console.log(message); // My name is Tricker, and I'm 18 years old.

// 模板字符串中可以换行
let message = `My name is ${name},
and I'm ${age} years old.`;
console.log(message); // My name is Tricker,
// and I'm 18 years old.

// 模板字符串中可以使用表达式
let message = `My name is ${name},
and I'm ${age + 1} years old.`;
console.log(message); // My name is Tricker,
// and I'm 19 years old.

// 模板字符串中可以使用函数调用
let message = `My name is ${getName()},
and I'm ${getAge() + 1} years old.`;
function getName() {
  return 'Tricker';
}
function getAge() {
  return 18;
}
console.log(message); // My name is Tricker,
// and I'm 19 years old.
```

#### 模板字符串的嵌套

```javascript
let workList = [
  { day: '星期一', work: '写代码' },
  { day: '星期二', work: '写博客' },
  { day: '星期三', work: '写小说' },
  { day: '星期四', work: '写代码' },
  { day: '星期五', work: '学习' },
  { day: '星期六', work: '去公园' },
  { day: '星期日', work: '休息' },
];

let workListHtml = `
  <ul>
    ${workList
      .map(
        (item) => `
      <li>
        <span>${item.day}</span>
        <span>${item.work}</span>
      </li>
    `
      )
      .join('')}
  </ul>
`;
console.log(workListHtml);
```

#### 标签模板

```javascript
let name = 'Tricker';
let age = 18;
let message = tag`My name is ${name}, and I'm ${age} years old.`;
console.log(message); // My name is Tricker, and I'm 18 years old.

function tag(strings, ...values) {
  console.log(strings); // ['My name is ', ', and I\'m ', 'years old.']
  console.log(values); // ['Tricker', 18]
  return strings.reduce((result, string, index) => {
    return result + string + (values[index] || '');
  }, '');
}
```

使用案例

```javascript
let scoreList = [
  { name: '张三', score: 90 },
  { name: '李四', score: 62 },
  { name: '王五', score: 70 },
  { name: '赵六', score: 56 },
  { name: '陈七', score: 45 },
  { name: '周八', score: 80 },
  { name: '吴九', score: 59 },
  { name: '郑十', score: 85 },
  { name: '冯十一', score: 72 },
];

var template = `<ul>
  ${scoreList
    .map(
      (item) => handleScore`
    <li>
      <span>${item.name}：</span>
      <span>${item.score}</span>
    </li>
  `
    )
    .join('')}
</ul>
`;

function handleScore(strings, ...values) {
  return strings.reduce((result, string, index) => {
    if (isNaN(values[index])) {
      return result + string + (values[index] || '');
    } else {
      let color = values[index] >= 60 ? 'green' : 'red';
      return result + string + `<font color="${color}">${values[index]}</font>`;
    }
  }, '');
}

document.write(template);
```

### 常用方法

#### ES5 常用方法

```javascript
// `charAt(index)`：返回指定位置的字符。
console.log('hello'.charAt(0)); // 'h'

// concat(...str)`：连接一个或多个字符串。
console.log('hello'.concat(' world', ', welcome!')); // 'hello world, welcome!'

// `indexOf(searchString, position)`：返回指定字符串第一次出现的位置。
console.log('hello world'.indexOf('l')); // 2
console.log('hello world'.indexOf('l', 3)); // 9

// `lastIndexOf(searchString, position)`：返回指定字符串最后一次出现的位置。
console.log('hello world'.lastIndexOf('l')); // 9
console.log('hello world'.lastIndexOf('l', 3)); // 2

// `match(regex)`：匹配字符串。
console.log('hello world'.match(/l/)); // ['l']

// `replace(regex, newSubStr)`：替换字符串。
console.log('hello world'.replace('l', 'L')); // 'heLlo world'

// slice(start, end)`：截取字符串，start 和 end 为可以为负数。
console.log('hello world'.slice(3)); // 'lo world'
console.log('hello world'.slice(3, 7)); // 'lo w'
console.log('hello world'.slice(-3)); // 'rld'
console.log('hello world'.slice(-3, -1)); // 'rl'

// `split(separator, limit)`：分割字符串。
console.log('hello world'.split(' ')); // ['hello', 'world']
console.log('hello world'.split(' ', 1)); // ['hello']

// `substring(start, end)`：截取字符串，start 和 end 如果为负数，则会被自动转换为 0。
console.log('hello world'.substring(3)); // 'lo world'
console.log('hello world'.substring(3, 7)); // 'lo w'

// `substr(start, length) - 废弃`：截取字符串。
console.log('hello world'.substr(3)); // 'lo world'
console.log('hello world'.substr(3, 7)); // 'lo worl'

// `toLowerCase()`：转换为小写。
console.log('HELLO WORLD'.toLowerCase()); // 'hello world'

// `toUpperCase()`：转换为大写。
console.log('hello world'.toUpperCase()); // 'HELLO WORLD'

// `trim()`：去除首尾空格。
console.log('  hello world  '.trim()); // 'hello world'
```

[ECMAScript 5.1 参考文档](https://yanhaijing.com/es5/#369)

[w3c 参考文档](https://www.w3.org/html/ig/zh/wiki/ES5)

#### ES6 新增方法

```javascript
// `includes(str)`：判断是否包含指定字符串。
console.log('hello world'.includes('l')); // true
console.log('hello world'.includes('L')); // false

// `startsWith(str)`：判断是否以指定字符串开头。
console.log('hello world'.startsWith('he')); // true
console.log('hello world'.startsWith('el')); // false

// `endsWith(str)`：判断是否以指定字符串结尾。
console.log('hello world'.endsWith('ld')); // true
console.log('hello world'.endsWith('ld')); // false

// `padStart(num, str)`：在字符串前面补充指定字符。
console.log('hello'.padStart(10, '0')); // '00000hello'

// `padEnd(num, str)`：在字符串后面补充指定字符。
console.log('hello'.padEnd(10, '0')); // 'hello00000'

// `repeat(num)`：重复字符串。
console.log('hello'.repeat(3)); // 'hellohellohello'

// `trimStart()`：去除字符串开头的空格。
console.log('  hello world  '.trimStart()); // 'hello world  '

// `trimEnd()`：去除字符串结尾的空格。
console.log('  hello world  '.trimEnd()); // '  hello world'

// `replaceAll(regex, newStr)`：替换字符串。
console.log('hello world'.replaceAll('l', 'L')); // 'heLLo worLd'

// `codePointAt(index)`：返回指定位置的字符的 Unicode 编码。
console.log('hello'.codePointAt(0)); // 104

// `normalize(form)`：规范化字符串。
console.log('\u0065\u0301'.normalize('NFD')); // 'e\u0301'

// `matchAll(reg)`：匹配字符串。
let str = 'hello world';
let reg = /l/g;
let matches = [...str.matchAll(reg)];
console.log(matches); // [ ['l'], ['l'] ]
```
