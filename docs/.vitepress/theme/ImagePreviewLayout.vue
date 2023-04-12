<template>
  <image-preview :list="list" v-model:visible="visibleRef" v-model:image="image" />
</template>
<script setup lang="ts">
  import ImagePreview from '../../components/ImagePreview.vue';
  import { ref, onMounted, onUnmounted } from 'vue';
  const visibleRef = ref(false);
  const image = ref<{ src: string; alt: string } | null>(null);
  const list = ref<Array<{ src: string; alt: string }>>([]);

  const previewImage = async (e: Event) => {
    if (visibleRef.value) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      const currentTarget = e.currentTarget as HTMLElement;
      const imgs = currentTarget.querySelectorAll<HTMLImageElement>('.content-container .main img');
      const index = Array.from(imgs).findIndex((el) => el === target);
      image.value = target as HTMLImageElement;
      list.value = Array.from(imgs);
      visibleRef.value = true;
    }
  };
  // #region 生命周期
  onMounted(() => {
    const docDomContainer = document.querySelector('#VPContent .content-container .main');
    docDomContainer?.addEventListener('click', previewImage);
  });
  onUnmounted(() => {
    const docDomContainer = document.querySelector('#VPContent .content-container .main');
    docDomContainer?.removeEventListener('click', previewImage);
  });
  // #endregion
</script>
<style lang="scss" scoped></style>
