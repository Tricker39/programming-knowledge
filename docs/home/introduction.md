---
aside: false
lastUpdated: false
---

<script setup>
import NavLink from '../../components/NavLink.vue';
const links=[{
    media: 'https://s1.ax1x.com/2023/04/11/ppOYs9x.jpg',
    title: '代码片段',
    url: '/codes/intro',
    target: '_self'
},{
    media: 'https://s1.ax1x.com/2023/04/11/ppOY1Nn.png',
    title: 'TypeScript 学习笔记',
    url: '/typescript/intro', 
    target: '_self'
},{
    media: 'https://s1.ax1x.com/2023/04/11/ppOtSCq.png',
    title: '计算机网络',
    url: '/network/http', 
    target: '_self'
},{
    media: 'https://s1.ax1x.com/2023/04/11/ppOtCvT.png',
    title: '前端面试题',
    url: '/interview/vue', 
    target: '_self'
},{
    media: 'https://s1.ax1x.com/2023/04/11/ppOt1qe.jpg',
    title: 'Markdown 语法',
    url: 'https://markdown.com.cn', 
    target: '_blank'
},{
    media: 'https://s21.ax1x.com/2024/06/01/pk8vGk9.jpg',
    title: 'webpack 学习笔记',
    url: '/webpack/index',
    target: '_self'
},{
    media: 'https://s21.ax1x.com/2024/06/01/pk8vUl6.jpg',
    title: '开发模板',
    url: '/scaffold/chapter-1',
    target: '_self'
}]
</script>

# 目录

<nav-link :links="links"/>
