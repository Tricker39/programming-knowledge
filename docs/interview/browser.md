<script setup>
import Question from '../../components/Question.vue';
</script>

# 浏览器每日积累

<question title="什么是渲染" date="2026-10-16">
通过对 html 字符串的解析，得到屏幕每个`像素点`的信息。

```javascript
function render(html) {
  // 解析 html 字符串，得到屏幕每个像素点的信息
  return pixels;
}
```

</question>

<question title="浏览器是如何渲染页面的" date="2026-10-16">
当浏览器的网络线程收到 HTML 文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。

在事件循环机制的作用下，渲染主线程会从消息队列中取出渲染任务，并开始渲染页面。

整个渲染流程分为多个阶段，包括 HTML 解析、样式计算、布局、分层、绘制、分块、光栅化、画

</question>
