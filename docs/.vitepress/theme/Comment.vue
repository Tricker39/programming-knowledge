<template>
  <div class="comment">
    <component
      v-if="isDark"
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="tricker39/programming-knowledge"
      data-repo-id="R_kgDOJT_O9g"
      data-category="General"
      data-category-id="DIC_kwDOJT_O9s4CV9Bn"
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
      data-repo="tricker39/programming-knowledge"
      data-repo-id="R_kgDOJT_O9g"
      data-category="General"
      data-category-id="DIC_kwDOJT_O9s4CV9Bn"
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
  const { isDark } = useData();
</script>
<style lang="scss" scoped>
  .comment {
    margin-top: 16px;
  }
</style>
