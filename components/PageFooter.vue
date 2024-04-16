<template>
  <div>
    <div class="blank"></div>
    <div id="hitokoto" v-if="content">
      <a :href="url" id="hitokoto_text" target="_blank">『 {{ content }} 』</a>
      <div>—— {{ author }}「 {{ reference }} 」</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  let url = ref('#');
  let content = ref('');
  let author = ref('');
  let reference = ref('');
  fetch('https://v1.hitokoto.cn?c=i')
    .then((response) => response.json())
    .then((data) => {
      url.value = 'https://hitokoto.cn/?uuid=' + data.uuid;
      content.value = data.hitokoto;
      author.value = data.from_who;
      reference.value = data.from;
    })
    .catch(console.error);
</script>
<style lang="scss" scoped>
  .blank {
    width: 100%;
    height: 68px;
  }
  #hitokoto {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    text-align: center;
    // background-color: var(--vp-c-bg);
    & a:hover {
      text-decoration: underline;
    }
  }
</style>
