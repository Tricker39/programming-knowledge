<template>
  <div class="question-box">
    <div class="question-box__hd">
      <span class="question-title">{{ props.title }}</span>
      <div class="question-date">
        <span>{{ props.date }} </span>
        <span class="question-action" @click="contentVisible = !contentVisible">
          <i v-if="!contentVisible" class="i-icon-park-outline:double-down"></i>
          <i v-else class="i-icon-park-outline:double-up"></i>
          {{ contentVisible ? '点我收起' : '点我展开' }}</span
        >
      </div>
    </div>
    <div class="question-box__bd" v-show="contentVisible">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  interface Props {
    title: string;
    date: string;
  }

  const props = defineProps<Props>();

  const contentVisible = ref(true);
</script>
<style lang="scss" scoped>
  .question {
    &-box {
      padding: 32px 0;
      width: 100%;
      border-bottom: 1px solid var(--vp-c-divider);
      // & + & {
      //   margin-top: 30px;
      // }
      &__hd {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    &-title {
      font-size: 18px;
      font-weight: bold;
    }
    &-date {
      flex-shrink: 0;
      font-size: 12px;
    }
    &-action {
      margin-left: 16px;
      font-size: 14px;
      cursor: pointer;
      color: var(--vp-c-brand-lighter);
    }
  }
</style>
