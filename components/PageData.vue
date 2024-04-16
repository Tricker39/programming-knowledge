<template>
  <div></div>
</template>
<script setup lang="ts">
  import { useData } from 'vitepress';
  const { page } = useData();
  console.log(JSON.stringify(page.value));
</script>
<style lang="scss" scoped></style>
