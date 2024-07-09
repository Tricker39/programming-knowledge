<template>
  <div class="book-grid" v-if="layout === 'grid'">
    <div class="book-grid-item" v-for="book in books" :key="book.title" @click="goPage(book.url)">
      <div class="book-grid-item__left">
        <img :src="book.media" class="book-grid-item__media" />
      </div>
      <div class="book-grid-item__right">
        <div class="title">{{ book.title }}</div>
        <div class="fs-12px color-grey">{{ book.author }}</div>
        <div class="fs-12px color-grey">{{ book.year }}</div>
        <div>
          <span class="tag">{{ book.type }}</span>
        </div>
      </div>
    </div>
  </div>
  <table class="book-table" v-else>
    <thead>
      <tr>
        <th width="45%">书名</th>
        <th width="25%">类型</th>
        <th width="15%">作者</th>
        <th width="15%">出版时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.title">
        <td width="45%"
          ><a :href="withBase(book.url)">{{ book.title }}</a></td
        >
        <td width="25%"
          ><span class="tag">{{ book.type }}</span></td
        >
        <td width="15%">{{ book.author }}</td>
        <td width="15%">{{ book.year }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
  import { withBase } from 'vitepress';
  interface BookItem {
    media: string;
    title: string;
    type: string;
    author: string;
    year: string;
    summary?: string;
    url: string;
  }
  withDefaults(
    defineProps<{
      books: Array<BookItem>;
      layout: 'grid' | 'list';
    }>(),
    {
      layout: 'grid',
    }
  );
  const goPage = (url: string) => {
    window.location.href = withBase(url);
  };

  const _bindEmpty = (e) => {
    return;
  };
</script>
<style lang="scss" scoped>
  .dark {
    .book-grid {
      --theme-bg-color: rgba(0, 0, 0, 0.3);
      --book-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
    }
  }
  .book-grid {
    --theme-bg-color: rgba(176, 184, 250, 0.3);
    --book-shadow: 0 2px 16px rgba(102, 113, 185, 0.3);

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    margin: 20px 0;
    &-item {
      display: flex;
      padding: 16px;
      width: 100%;
      height: 152px;
      backdrop-filter: blur(2x);
      background: var(--theme-bg-color);
      &:hover {
        transform: scale(1.02);
        box-shadow: var(--book-shadow);
      }
      &__left {
        margin-right: 16px;
        width: 80px;
        height: 120px;
        overflow: hidden;
      }
      &__right {
        flex: 1;
        .title {
          display: -webkit-box;
          height: 48px;
          line-height: 24px;
          text-align: justify;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      &__media {
        width: 80px;
      }
    }
  }
  .book-table {
    display: table;
    width: 100%;
    thead,
    tbody,
    tr {
      width: 100%;
    }
  }
  .tag {
    padding: 4px 8px;
    font-size: 12px;
    color: #fff;
    background: var(--vp-c-brand);
  }
  .fs-12px {
    font-size: 12px;
    line-height: 20px;
  }
  .color-grey {
    color: #827f93;
  }
</style>
