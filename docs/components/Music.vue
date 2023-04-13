<template>
  <div class="music-box">
    <div class="media">
      <img :src="music?.picUrl" :alt="music?.name" />
    </div>
    <div class="info">
      <div class="name">{{ music?.name }}</div>
      <div class="auther">{{ music?.auther }}</div>
    </div>
    <div>
      <div class="tools">
        <div class="controls">
          <div class="control-btn"
            ><img src="https://s1.ax1x.com/2023/04/14/ppxXaPP.png" alt=""
          /></div>
          <div class="switch"><img src="https://s1.ax1x.com/2023/04/14/ppxLsSS.png" alt="" /></div>
          <div class="control-btn"
            ><img src="https://s1.ax1x.com/2023/04/14/ppxX6Vs.png" alt=""
          /></div>
        </div>
        <div class="time">00:00/04:05</div>
      </div>
      <div class="progress">
        <div class="bar" :style="{ width: `${200}px` }"></div>
        <div class="dot" :style="{ transform: `translateX(${200}px)` }"></div>
      </div>
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
  @mixin neuomorphism($key) {
    border: 1px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    box-shadow: var($key);
  }
  @mixin box-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .music-box {
    @include neuomorphism(--music-shadow);
    --music-bg: #29292e;

    display: flex;
    align-items: center;
    position: sticky;
    top: 63px;
    z-index: 5;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 16px;
    background-image: var(--music-bg),
      linear-gradient(170deg, rgba(255, 255, 255, 0.3), transparent 60%);
    .media {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
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
    .info {
      margin-left: 16px;
      flex: 1;
      font-family: 'LXGWWenKai';
      .name {
        color: #fff;
        font-size: 18px;
      }
      .auther {
        color: #666;
        font-size: 12px;
      }
    }
    .tools {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 24px;
      .control-btn {
        @include neuomorphism(--music-shadow-small);
        @include box-center;
        margin: 0 8px;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        cursor: pointer;
        background-image: var(--music-bg),
          linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent 60%);
        img {
          width: 24px;
          height: 24px;
        }
      }
      .switch {
        @include neuomorphism(--music-shadow-small);
        @include box-center;

        margin: 0 8px;
        width: 48px;
        height: 48px;
        cursor: pointer;
        border-radius: 100%;
      }
    }
    .progress {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 8px;
      margin-left: 16px;
      padding: 0 4px;
      width: 500px;
      height: 24px;
      border: 1px solid transparent;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      border-radius: 24px;
      background-image: var(--music-bg),
        linear-gradient(179deg, rgba(255, 255, 255, 0.3), transparent 60%);
      box-shadow: var(--music-shadow-small), -6px -6px 20px 0px #3c3c43 inset,
        4px 4px 20px 0px #0f0f11 inset;
      .bar {
        height: 12px;
        border-radius: 8px;
        background: var(--vp-c-brand);
      }
      .dot {
        @include box-center;
        position: absolute;
        left: -18px;
        width: 36px;
        height: 36px;
        border-radius: 36px;
        border: 1px solid transparent;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        border-radius: 36px;
        background-image: var(--music-bg),
          linear-gradient(179deg, rgba(255, 255, 255, 0.3), transparent 60%);
        box-shadow: var(--music-shadow-small), -6px -6px 20px 0px #3c3c43 inset,
          4px 4px 20px 0px #0f0f11 inset;
        &::after {
          content: '';
          display: block;
          width: 18px;
          height: 18px;
          border-radius: 18px;
          cursor: pointer;
          background: linear-gradient(145deg, #63f1c2, #0ea774);
        }
      }
    }
    .time {
      margin-left: 16px;
      padding-right: 4px;
      font-size: 12px;
    }
  }
  .dark .music-box {
    --music-shadow: -6px -6px 20px 0px #3c3c43, 4px 4px 20px 0px #0f0f11;
    --music-shadow-small: -3px -3px 10px 0px #3c3c43, 2px 2px 10px 0px #0f0f11;
    --music-bg: linear-gradient(170deg, #2c2c31, #252529);
  }
</style>
