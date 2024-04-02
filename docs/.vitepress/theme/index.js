import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Donate from './Donate.vue';
import ImagePreviewLayout from './ImagePreviewLayout.vue';
import Music from '../../components/Music.vue';
import Weather from '../../components/Weather.vue';
import Comment from './Comment.vue';
import './custom.scss';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { toRefs } from 'vue';

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
  // enhanceApp(ctx) {
  //   DefaultTheme.enhanceApp(ctx);
  // },
  setup() {
    // 获取前言和路由
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    // 评论组件 - https://giscus.app/
    giscusTalk(
      {
        repo: 'tricker39/programming-knowledge',
        repoId: 'R_kgDOJT_O9g',
        category: 'General', // 默认: `General`
        categoryId: 'DIC_kwDOJT_O9s4CV9Bn',
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
