<template>
  <image-preview :list="list" v-model:visible="visibleRef" v-model:image="image" />
</template>
<script setup lang="ts">
  import ImagePreview from '../../components/ImagePreview.vue';
  import { ref, onMounted, onUnmounted } from 'vue';
  const visibleRef = ref(false);
  const image = ref<{ src: string; alt?: string } | null>(null);
  const list = ref<Array<{ src: string; alt?: string }>>([]);

  const previewImage = async (e: Event) => {
    if (visibleRef.value) {
      return;
    }
    /*
     * currentTarget永远指向的是事件所绑定的元素（这里点击事件直接绑定在 .main 元素上）。
     * 但是target则不同，它指向的是事件实际执行所在的元素
     */
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      const currentTarget = e.currentTarget as HTMLElement;
      const imgList = currentTarget.querySelectorAll<HTMLImageElement>(
        '.content-container .main img'
      );
      // const index = Array.from(imgs).findIndex((el) => el === target);
      image.value = target as HTMLImageElement;
      list.value = Array.from(imgList);
      visibleRef.value = true;
    }
  };
  // #region 生命周期
  const docDomContainer = ref<HTMLDivElement | null>(null);
  onMounted(() => {
    docDomContainer.value = document.querySelector('#VPContent .content-container .main');
    docDomContainer.value?.addEventListener('click', previewImage);
  });
  onUnmounted(() => {
    if (docDomContainer.value) {
      docDomContainer.value.removeEventListener('click', previewImage);
    }
  });
  // #endregion
</script>
<style lang="scss" scoped></style>
