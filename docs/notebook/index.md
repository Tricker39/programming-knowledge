---
aside: false
lastUpdated: false
---

<style lang="scss" scope>
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid;

    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      &-icon{
        cursor: pointer;
      }
    }
  }
</style>
<script setup>
import BookList from '@/BookList.vue';
import books from './books.json';
import { ref } from 'vue';

const layout = ref('grid');
const handleSwitchLayout = () => {
  layout.value = layout.value === 'grid'? 'list' : 'grid';
}
</script>
<div class="header">
  <span class="left">书籍列表</span>
  <span class="right">
    <svg class="right-icon" v-if="layout === 'grid'" @click="handleSwitchLayout"width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
    <svg class="right-icon" v-else @click="handleSwitchLayout" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.94971 11.9497H39.9497" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.94971 23.9497H39.9497" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.94971 35.9497H39.9497" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </span>
</div>
<BookList :books="books" :layout="layout" />
