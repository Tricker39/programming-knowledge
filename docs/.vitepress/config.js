import { defineConfig } from 'vitepress';
import { SearchPlugin } from 'vitepress-plugin-search';
import { pagefindPlugin } from 'vitepress-plugin-pagefind';

export default defineConfig({
  lastUpdated: true,
  title: '前端编程基础知识',
  description: '人之为学，不可自小，又不可自大',

  cleanUrls: 'without-subfolders',
  vite: {
    plugins: [
      // SearchPlugin({
      //   // 更好的实现方式参考 https://github.com/emersonbottero/vitepress-plugin-search/issues/11
      //   encode: false,
      //   tokenize: 'full',
      //   previewLength: 62,
      //   buttonLabel: '搜索',
      //   placeholder: '请输入要搜索的内容',
      // }),
      pagefindPlugin({
        // 可参考 https://theme.sugarat.top/
        btnPlaceholder: '搜索文档',
        placeholder: '输入要搜索的内容',
        emptyText: '我醉欲眠卿且去，明朝有意抱琴来。',
        heading: '共: {{searchResult}} 条结果',
      }),
    ],
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
  ],

  markdown: {
    theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    lineNumbers: true,
    headers: {
      level: [0, 0],
    },
  },

  themeConfig: {
    outline: [2, 3],
    outlineTitle: '本页目录',
    lastUpdatedText: '上次修改时间',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '语言切换',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    logo: '/logo.svg',
    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="128" height="128" viewBox="0 0 128 128"><defs><clipPath id="master_svg0_18_181"><rect x="0" y="0" width="128" height="128" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_18_181)"><g><path d="M64,128C28.6528,128,0,99.3473,0,64C0,28.6527,28.6528,0,64,0C99.3473,0,128,28.6528,128,64C128,99.3473,99.3473,128,64,128ZM96.3936,56.8896L60.0511,56.8896C58.3051,56.8897,56.8896,58.3052,56.8896,60.0513L56.8864,67.952C56.8864,69.696,58.3008,71.1136,60.0448,71.1136L82.1728,71.1136C83.92,71.1136,85.3344,72.528,85.3344,74.272L85.3344,75.8528C85.3344,81.0893,81.0893,85.3344,75.8528,85.3344L45.824,85.3344C44.0792,85.3326,42.6656,83.9176,42.6656,82.1728L42.6656,52.1504C42.6656,46.9151,46.9087,42.6705,52.144,42.6688L96.3873,42.6688C98.1321,42.6669,99.5456,41.252,99.5456,39.5073L99.5553,31.6064C99.5553,29.8615,98.1417,28.4465,96.3968,28.4448L52.144,28.4448C39.054,28.443,28.4415,39.0569,28.4415,52.1504L28.4415,96.3938C28.4415,98.1409,29.856,99.5554,31.6033,99.5554L78.2207,99.5554C90.0017,99.5554,99.552,90.005,99.552,78.2241L99.552,60.048C99.5502,58.3032,98.1352,56.8896,96.3904,56.8896L96.3936,56.8896Z" fill="#C71D23" fill-opacity="1"/></g></g></svg>',
        },
        link: 'https://gitee.com/MascotSky/programming-knowledge',
      },
      {
        icon: 'github',
        link: 'https://github.com/Tricker39/programming-knowledge',
      },
    ],
    nav: [{ text: '主页', link: '/home/introduction' }],
    sidebar: {
      '/home/': sidebarHome(),
      '/interview/': sidebarInterview(),
      '/network/': sidebarNetwork(),
      '/typescript/': sidebarTypescript(),
      '/codes': sidebarCode(),
    },
  },
});

function sidebarHome() {
  return [
    {
      text: '主页',
      collapsed: true,
      items: [
        { text: '简介', link: '/home/introduction' },
        { text: 'Emoji 表情', link: '/home/emoji' },
      ],
    },
  ];
}

function sidebarInterview() {
  return [
    {
      text: '前端面试题',
      collapsed: true,
      items: [{ text: 'Vue', link: '/interview/vue' }],
    },
  ];
}

function sidebarNetwork() {
  return [
    {
      text: '计算机网络',
      collapsed: true,
      items: [
        { text: 'HTTP', link: '/network/http' },
        { text: 'HTTP 请求响应过程', link: '/network/require' },
      ],
    },
  ];
}

function sidebarTypescript() {
  return [
    {
      text: 'Typescript',
      collapsed: true,
      items: [
        { text: 'Typescript 介绍', link: '/typescript/intro' },
        { text: '基础类型', link: '/typescript/basic-types' },
        { text: '元组类型', link: '/typescript/tuple' },
        { text: '枚举类型', link: '/typescript/enum' },
      ],
    },
  ];
}

function sidebarCode() {
  return [
    {
      text: '简介',
      collapsed: true,
      items: [
        { text: '为什么要做这个？', link: '/codes/intro' },
        { text: '如何使用？', link: '/codes/how-to-use' },
      ],
    },
    {
      text: '前端代码展示',
      collapsed: true,
      items: [
        { text: '按钮', items: [{ text: '彩虹按钮', link: '/codes/front/button/rainbow-button' }] },
      ],
    },
  ];
}
