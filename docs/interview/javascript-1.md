<script setup>
import Question from '../../components/Question.vue';
</script>

# JavaScript 每日积累

<question title="javascript 函数中 this 的指向问题" date="2024-09-20">

创建执行上下文的时候来确定 this 的指向（this 的指向取决于调用函数的方式）。

| 调用方式         |      示例      | 函数中的 this 指向 |
| ---------------- | :------------: | -----------------: |
| 通过 new 调用    |  new Method()  |             新对象 |
| 直接调用         |    method()    |           全局对象 |
| 通过对象调用     |  obj.method()  |       前面的的对象 |
| call、apply 调用 | func.call(ctx) |         第一个参数 |
| 箭头函数         | 没有 this 指向 |         词法作用域 |

```javascript
function Fn() {
  console.log(this);
}

new Fn(); // 新对象 Fn {}
Fn(); // 全局对象 (window 或{})
const obj = { method: Fn };
obj.method(); // 前面的对象 obj {}
Fn.call(obj); // 第一个参数 obj {}
const arrowFn = () => console.log(this);
arrowFn(); // 词法作用域 window 或 {}
```

</question>
