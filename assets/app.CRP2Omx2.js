import{j as o,ag as p,ah as u,ai as l,aj as c,ak as f,al as d,am as m,an as h,ao as g,ap as A,Y as P,d as _,u as v,l as R,z as w,aq as y,ar as C,as as E,a5 as T}from"./chunks/framework.BVPdqVqB.js";import{R as b}from"./chunks/theme.CGzOrOxI.js";function i(e){if(e.extends){const a=i(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=i(b),S=_({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=v();return R(()=>{w(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&y(),C(),E(),s.setup&&s.setup(),()=>T(s.Layout)}});async function j(){globalThis.__VITEPRESS__=!0;const e=L(),a=D();a.provide(u,e);const t=l(e.route);return a.provide(c,t),a.component("Content",f),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function D(){return h(S)}function L(){let e=o,a;return g(t=>{let n=A(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=P(()=>import(n),[])),o&&(e=!1),r},s.NotFound)}o&&j().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{j as createApp};
