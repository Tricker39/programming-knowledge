import { defineConfig } from 'vitepress';
// import { SearchPlugin } from 'vitepress-plugin-search';
// import { pagefindPlugin, chineseSearchOptimize } from 'vitepress-plugin-pagefind';
const baseUrl = process.env.NODE_ENV == 'production' ? '/programming-knowledge' : '';
export default defineConfig({
  base: `${baseUrl}/`,
  lang: 'zh',
  lastUpdated: true,
  title: '前端编程基础知识',
  description: '人之为学，不可自小，又不可自大',

  cleanUrls: 'without-subfolders',
  vite: {
    plugins: [
      // 使用 vitepress 自带的 search
      // SearchPlugin({
      //   // 更好的实现方式参考 https://github.com/emersonbottero/vitepress-plugin-search/issues/11
      //   lang: 'zh',
      //   optimize: true,
      //   encode: false,
      //   tokenize: 'full',
      //   previewLength: 100,
      //   buttonLabel: '搜索',
      //   placeholder: '请输入要搜索的内容',
      // }),
      // pagefindPlugin({
      //   // 可参考 https://theme.sugarat.top/
      //   excludeSelector: ['img', 'a.header-anchor', 'div.aside', 'link', 'script', 'style'],
      //   btnPlaceholder: '搜索文档',
      //   placeholder: '输入要搜索的内容',
      //   emptyText: '我醉欲眠卿且去，明朝有意抱琴来。',
      //   heading: '共: {{searchResult}} 条结果',
      //   forceLanguage: 'zh-cn',
      //   customSearchQuery: chineseSearchOptimize,
      // }),
    ],
  },

  head: [
    ['link', { rel: 'icon', href: `${baseUrl}/favicon.ico` }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['script', { src: `${baseUrl}/snow.js` }],
  ],

  markdown: {
    theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    lineNumbers: true,
    headers: {
      level: [0, 0],
    },
  },
  // 国际化配置
  locales: {
    root: {
      label: 'Chinese',
      lang: 'zh',
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    outline: [2, 3],
    outlineTitle: '当前目录',
    lastUpdatedText: '上次修改时间',
    darkModeSwitchLabel: '配色方案',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '语言切换',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                displayDetails: '显示详情',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
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
    editLink: {
      pattern: 'https://github.com/Tricker39/programming-knowledge/tree/master/docs/:path',
      text: '去 GitHub 上修改',
    },
    nav: [
      { text: '主页', link: '/home/introduction' },
      {
        text: '友情链接',
        items: [{ text: 'vitepress', link: 'https://vitepress.vuejs.org/' }],
      },
      {
        text: '实用工具',
        items: [
          { text: '路过图床', link: 'https://imgse.com' },
          { text: '聚合图床', link: 'https://www.superbed.cn' },
          { text: 'gitmind 思维导图', link: 'https://gitmind.cn' },
          { text: 'Alien GPT', link: 'https://chat.waixingyun.cn/#/home' },
          { text: 'ChatMind AI', link: 'https://chatmindai.cn/#/chat' },
          { text: '文心一言', link: 'https://chat.waixingyun.cn/#/home' },
        ],
      },
    ],
    sidebar: {
      '/home/': sidebarHome(),
      '/interview/': sidebarInterview(),
      '/network/': sidebarNetwork(),
      '/typescript/': sidebarTypeScript(),
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
        { text: '目录', link: '/home/introduction' },
        { text: '本地文档搜索', link: '/home/local-search' },
        { text: 'giscus 评论系统', link: '/home/giscus' },
        { text: '部署到 github pages', link: '/home/github-pages' },
        { text: '天气图标', link: '/home/weather-icon' },
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

function sidebarTypeScript() {
  return [
    {
      text: 'TypeScript',
      collapsed: true,
      items: [
        { text: 'TypeScript 介绍', link: '/typescript/intro' },
        { text: '基础类型', link: '/typescript/basic-types' },
        { text: '元组类型', link: '/typescript/tuple' },
        { text: '枚举类型', link: '/typescript/enum' },
        { text: '接口', link: '/typescript/interface' },
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
      text: 'html 代码片段',
      collapsed: true,
      items: [
        {
          text: '按钮',
          items: [
            { text: '彩虹按钮', link: '/codes/front/button/rainbow-button' },
            { text: '新拟态风格按钮', link: '/codes/front/button/neumorphism-button' },
          ],
        },
      ],
    },
  ];
}
