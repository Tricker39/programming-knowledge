<template>
  <span :class="['tag', props.type]">
    <slot></slot>
  </span>
</template>
<script setup lang="ts">
  export interface Props {
    type?: 'default' | 'tip' | 'warning' | 'danger';
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'default',
  });
</script>
<style lang="scss" scoped>
  .tag {
    margin: 0 2px;
    padding: 2px 4px;
    border-radius: 4px;
    border: 1px solid transparent;
  }
  .default {
    color: var(--vp-custom-block-info-text);
    border-color: var(--vp-custom-block-info-border);
    background-color: var(--vp-custom-block-info-bg);
  }
  .tip {
    color: var(--vp-custom-block-tip-text);
    border-color: var(--vp-custom-block-tip-border);
    background-color: var(--vp-custom-block-tip-bg);
  }
  .warning {
    color: var(--vp-custom-block-warning-text);
    border-color: var(--vp-custom-block-warning-border);
    background-color: var(--vp-custom-block-warning-bg);
  }
  .danger {
    color: var(--vp-custom-block-danger-text);
    border-color: var(--vp-custom-block-danger-border);
    background-color: var(--vp-custom-block-danger-bg);
  }
</style>
