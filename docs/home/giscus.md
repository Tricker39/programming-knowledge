# vitepress 集成 giscus 评论系统

> 由 GitHub Discussions 驱动的评论系统。让访客借助 GitHub 在你的网站上留下评论和反应吧！本项目受 [utterances](https://github.com/utterance/utterances) 强烈启发。

## 如何申请

在申请 giscus 请有三个准备步骤：

1. 此仓库是公开的（如果没有开源项目，无法集成该评论系统，请转身离开），否则访客将无法查看 discussion。
2. [giscus app](https://github.com/apps/giscus) 已安装否则访客将无法评论和回应。
3. Discussions 功能已在你的仓库中启用。

## 安装 giscus app

进入 [giscus app](https://github.com/apps/giscus) ，点击 install 按钮进行安装。

![安装 giscus app](https://s1.ax1x.com/2023/04/22/p9VJ1jf.png)

## 开启 Discussions

![开启 Discussions](https://s1.ax1x.com/2023/04/22/p9VJlgP.png)

![开启 Discussions](https://s1.ax1x.com/2023/04/22/p9VJ8u8.png)

进入你的开源项目，按照以下步骤操作：

1. 点击 Settings 按钮，进入设置界面。
2. 下滑找到 Features 配置项。
3. 在 Features 配置项里面找到 Discussions 配置，勾选 Discussions 配置，这样就开启了 Discussions。

## 申请评论系统的 key

在完成上面的准备后，进入 [giscus](https://giscus.app/zh-CN) 评论系统。

![申请评论系统的 key](https://s1.ax1x.com/2023/04/22/p9VJGDS.png)

![申请评论系统的 key](https://s1.ax1x.com/2023/04/22/p9VJQ3t.png)

![申请评论系统的 key](https://s1.ax1x.com/2023/04/22/p9VJJHg.png)

进入评论系统，按照以下步骤操作申请评论系统的 key：

1. 下滑找到配置项。
2. 选择评论系统的语言（就是评论系统界面显示的语言）。
3. 在仓库中输入你的用户名和仓库名，格式(myusername/myrepo)，例如：`tricker39/programming-knowledge` 。
4. 选择（页面 ↔️ discussion 映射关系），有兴趣的自己去找找看都有什么用（如果不懂就选择默认）。
5. 选择 Discussion 分类，我的选择是 General，至于选择什么看你自己。
6. 选择特性（如果不懂就选择默认）。
7. 主题（可以不选，之后会做主题切换，适配深/浅主题）。
8. 复制你得到的那串 key。

```javascript
<script
  src="https://giscus.app/client.js"
  data-repo="[在此输入仓库]"
  data-repo-id="[在此输入仓库 ID]"
  data-category="[在此输入分类名]"
  data-category-id="[在此输入分类 ID]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme" // 主题
  data-lang="zh-CN"
  crossorigin="anonymous"
  async
></script>
```

## 集成到 VitePress 文档

### 第一种方式

::: warning 注意

这种方法有一点 bug，偶尔会出现深浅主题切换不生效的情况，因此推荐使用第二种方式。

:::

#### 创建 comment.vue 组件

在 `/docs/.vitepress/theme` 文件夹下，创建 `Comment.vue` 的文件。拷贝粘贴以下代码（修改你的组件路径）。

```vue
<template>
  <div class="comment">
    <component
      v-if="isDark"
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="[在此输入仓库]"
      data-repo-id="[在此输入仓库 ID]"
      data-category="[在此输入分类名]"
      data-category-id="[在此输入分类 ID]"
      data-mapping="pathname"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="dark"
      data-lang="zh-CN"
      crossorigin="anonymous"
      data-loading="eager"
      async
    >
    </component>
    <component
      v-else
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="[在此输入仓库]"
      data-repo-id="[在此输入仓库 ID]"
      data-category="[在此输入分类名]"
      data-category-id="[在此输入分类 ID]"
      data-mapping="pathname"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="light"
      data-lang="zh-CN"
      crossorigin="anonymous"
      data-loading="eager"
      async
    >
    </component>
  </div>
</template>
<script setup lang="ts">
  import { useData } from 'vitepress';
  // 获取当前配色方案
  const { isDark } = useData();
</script>
<style lang="scss" scoped>
  .comment {
    margin-top: 16px;
  }
</style>
```

#### 挂载到文档中

在 `/docs/.vitepress` 文件夹下，创建 `theme`文件夹，然后创建 `index.js` 的文件。拷贝粘贴以下代码（修改你的组件路径）。

```javascript
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
// 导入刚才创建好的组件
import Comment from './Comment.vue';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Comment),
    });
  },
};
```

如果对上面的代码有疑问的话，请查阅 [Extending the Default Theme 文档](https://vitepress.dev/guide/extending-default-theme#layout-slots)

### 第二种方式 (推荐)

使用 `vitepress-plugin-comment-with-giscus` 插件集成 giscus 评论系统。

#### 安装 `vitepress-plugin-comment-with-giscus` 插件。

```bash
// npm
npm i vitepress-plugin-comment-with-giscus
// yarn
yarn add vitepress-plugin-comment-with-giscus
```

#### 挂载到文档中

修改 `/docs/.vitepress/theme/index.js` 文件

```javascript{12-39}
export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-top': () => h(Weather),
      'aside-outline-after': () => h(Donate),
      'doc-top': () => h(ImagePreviewLayout),
      'doc-before': () => h(Music),
      // 'doc-after': () => h(Comment),
    });
  },
  setup() {
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    giscusTalk(
      {
        repo: '[在此输入仓库]',
        repoId: '[在此输入仓库 ID]',
        category: '[在此输入分类名]', // 默认: `General`
        categoryId: '[在此输入分类 ID]',
        mapping: 'pathname', // 默认: `pathname`
        inputPosition: 'bottom', // 默认: `top`
        lang: 'zh-CN', // 默认: `zh-CN`
        lightTheme: 'light', // 默认: `light`
        darkTheme: 'dark', // 默认: `transparent_dark`
        loading: 'eager',
      },
      {
        frontmatter,
        route,
      },
      // 是否全部页面启动评论区。
      // 默认为 true，表示启用，此参数可忽略；
      // 如果为 false，表示不启用。
      // 可以在页面使用 `comment: true` 前言单独启用
      true
    );
  },
};
```

[vitepress-plugin-comment-with-giscus 源码](https://github.com/T-miracle/vitepress-plugin-comment-with-giscus)

## 参考资料

::: tip 参考资料

[粥里有勺糖：一个简约风的 vitepress 博客主题](https://theme.sugarat.top/)

:::
