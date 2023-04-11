<template>
  <div class="link-box">
    <a
      class="link-item"
      v-for="item in props.links"
      :key="item.title"
      :target="item.target"
      :href="withBase(item.url)"
    >
      <img :src="item.media" :alt="item.title" class="media" @click.stop="_bindEmpty" />
      <div class="title">{{ item.title }} </div>
    </a>
  </div>
</template>
<script setup lang="ts">
  import { withBase } from 'vitepress';
  interface NavLink {
    media: string;
    title: string;
    url: string;
    target: '_blank' | '_self';
  }
  const props = defineProps({
    links: Array<NavLink>,
  });

  const _bindEmpty = (e) => {
    return;
  };
</script>
<style lang="scss" scoped>
  .link-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 32px 0;
    .link-item {
      display: flex;
      align-items: center;
      padding: 16px;
      cursor: pointer;
      color: var(--vp-c-text-1);
      text-decoration: none;
      transition: transform 0.5s;
      border-radius: 8px;
      background: var(--vp-c-bg-alt);
      box-shadow: var(--vp-shadow-2);
      .media {
        flex-shrink: 0;
        margin-right: 16px;
        width: 48px;
        height: 48px;
        border: 2px solid var(--vp-c-brand-dark);
        border-radius: 100%;
        box-shadow: var(--vp-shadow-2);
      }
      &:hover {
        transform: translateY(-8px);
        .media {
          animation: spin 2s 0.2s infinite linear;
        }
      }
    }
  }
  @media (min-width: 960px) and (max-width: 1279px) {
    .link-box {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 960px) and (max-width: 1080px) {
    .link-box {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 768px) and (max-width: 959px) {
    .link-box {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .link-box {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 640px) {
    .link-box {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
