<template>
  <div class="music-box">
    <div class="media">
      <img :src="music?.picUrl" :alt="music?.name" />
    </div>
    <div class="controls">
      <div class="control-btn"></div>
      <div class="switch"></div>
      <div class="control-btn"></div>
    </div>
    <!-- <audio :src="music?.mp3url" controls id="music"></audio> -->
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const music = ref();
  fetch('https://api.vvhan.com/api/rand.music?type=json&sort=热歌榜')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        music.value = data.info;
      }
    })
    .catch(console.error);
</script>
<style lang="scss" scoped>
  @mixin neuomorphism($angle) {
    border: 1px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: var(--music-bg),
      linear-gradient($angle + 'deg', rgba(255, 255, 255, 0.3), transparent 60%);
    box-shadow: var(--music-shadow);
  }
  .music-box {
    --music-bg: #29292e;

    display: flex;
    align-items: center;
    position: sticky;
    top: 63px;
    z-index: 5;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 16px;
    @include neuomorphism(170);
    // border: 1px solid transparent;
    // background-clip: padding-box, border-box;
    // background-origin: padding-box, border-box;
    // background-image: var(--music-bg),
    //   linear-gradient(170deg, rgba(255, 255, 255, 0.3), transparent 60%);
    // box-shadow: var(--music-shadow);
    .media {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      background: url('https://s1.ax1x.com/2023/04/13/ppxDD2D.png');
      background-size: 100%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
      }
    }
    .controls {
      display: flex;
      align-items: center;
      .control-btn {
        margin: 0 8px;
        width: 36px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid transparent;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: var(--music-bg),
          linear-gradient(170deg, rgba(255, 255, 255, 0.3), transparent 60%);
        box-shadow: var(--music-shadow);
      }
    }
  }
  .dark .music-box {
    --music-shadow: -6px -6px 20px 0px #3c3c43, 4px 4px 20px 0px #0f0f11;
    --music-bg: linear-gradient(170deg, #2c2c31, #252529);
  }
</style>
