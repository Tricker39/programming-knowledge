# 从零开始开发一个基于 Vue3 的开发模板（二）

## vue-router 路由集成

根据上一节，我们已经搭建一个基础的开发框架，接下来我们需要集成路由模块，实现页面的切换。

### 安装 vue-router

```bash:no-line-numbers
$ pnpm add vue-router
```

### 创建视图组件

在 `src` 目录下创建 `views` 目录，并在其中创建三个视图组件 `home.vue`、`about.vue`、`contact.vue`。

`home.vue` 文件内容如下：

```vue
<template>
  <div>{{ msg }}</div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const msg = ref('home');
</script>
<style scoped></style>
```

`about.vue` 文件内容如下：

```vue
<template>
  <div>{{ msg }}</div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const msg = ref('about');
</script>
<style scoped></style>
```

`contact.vue` 文件内容如下：

```vue
<template>
  <div>{{ msg }}</div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const msg = ref('contact');
</script>
<style scoped></style>
```

### 配置路由

在 `src` 目录下创建 `router` 文件夹，并在其中创建 `index.ts` 文件，内容如下：

```ts
import { App } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router';

import Home from '@/views/home.vue';
import About from '@/views/about.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: () => import('@/views/contact.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
```

### 注册路由

在 `src/main.ts` 文件中，注册路由：

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router'; // [!code ++]
import './style.css';

async function bootstrap() {
  const app = createApp(App);

  // 注册路由
  setupRouter(app); // [!code ++]

  // 挂载
  app.mount('#app', true);

  console.log('🚀 ~ bootstrap ~ vue3 app 加载完成！');
}

void bootstrap();
```

### 路由切换

修改 `src/App.vue` 文件, 将内容替换为以下内容：

```vue
<template>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    | <RouterLink to="/about">Go to About</RouterLink> |
    <RouterLink to="/contact">Go to Contact</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<script setup lang="ts"></script>
<style scoped></style>
```

点击按钮可以切换页面。

## 路由守卫

在 `src/router` 文件夹下创建 `guards.ts` 文件，内容如下：

```ts
import { Router } from 'vue-router';

export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    //...
    next();
  });

  router.afterEach((to, from) => {
    //...
  });
  router.onError((error) => {
    console.error(error);
  });
}
```

在 `src/router/index.ts` 文件中，注册路由守卫：

```ts
import { App } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router';
import { createRouterGuards } from './guards'; // [!code ++]

import Home from '@/views/home.vue';
import About from '@/views/about.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: () => import('@/views/contact.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
  createRouterGuards(router); // [!code ++]
}

export default router;
```

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 集成 nprogress 进度条

```bash:no-line-numbers
$ pnpm add nprogress
$ pnpm add @types/nprogress -D
```

在 `src/router/guards.ts` 文件中，注册 nprogress 进度条：

```ts
import { Router } from 'vue-router';
import NProgress from 'nprogress'; // [!code ++]

NProgress.configure({ showSpinner: false }); // [!code ++]

export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    NProgress.start(); // [!code ++]
    //...
    next();
  });

  router.afterEach((to, from) => {
    //...
    NProgress.done(); // [!code ++]
  });
  router.onError((error) => {
    console.error(error);
  });
}
```

在 `src/main.ts` 文件中，导入并注册 nprogress 样式：

```ts:no-line-numbers
import 'nprogress/nprogress.css';
```

修改 `src/style.css` 文件，添加以下内容：

```css:no-line-numbers
/* ... */

/* nprogress */
#nprogress .bar {  /* [!code ++] */
  background: #646cff;  /* [!code ++] */
}  /* [!code ++] */
#nprogress .spinner-icon { /* [!code ++] */
  border-top-color: #646cff; /* [!code ++] */
  border-left-color: #646cff; /* [!code ++] */
} /* [!code ++] */
```

至此，我们已经完成了基于 vue-router 的路由模块的集成，实现了页面的切换，并集成了路由守卫和 nprogress 进度条。

## 参考资料

::: details 参考资料

[Vue Router](https://router.vuejs.org/zh/)

[nprogress](https://github.com/rstacruz/nprogress)

:::
