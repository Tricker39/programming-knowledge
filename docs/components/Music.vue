<template>
  <div class="music-box">
    <div class="media">
      <img
        :src="music?.picUrl"
        :alt="music?.name"
        :class="{ play: !pauseRef }"
        v-if="music?.picUrl"
      />
      <div :class="['media-btn', { play: !pauseRef }]" @click="_bindTogglePuase"></div>
    </div>
    <div class="info">
      <div class="name">{{ music?.name }}</div>
      <div class="auther">{{ music?.auther }}</div>
      <div class="volume-wrap">
        <div class="volume" id="volume-box">
          <div class="bar" :style="{ width: `${volumeRef * 100}%` }"></div>
          <div
            class="dot"
            :style="{ left: `${volumeRef * 100}%` }"
            @mousedown="_bindChangeVolume"
          ></div>
        </div>
        <div class="volume-text">{{ Math.floor(volumeRef * 100) }}</div>
      </div>
    </div>
    <div class="music-btn-group">
      <div class="tools">
        <div class="music-btn">
          <!-- <span :class="['button like', { active: likeRef }]" @click="_bindToggleLike"></span> -->
          <span
            :class="['button mode', { single: singleRef }]"
            @click="_bindToggleChangeSingleMode"
          ></span>
        </div>
        <div class="controls">
          <div class="control-btn prev" @click="_bindPrevSong"><span class="button"></span></div>
          <div class="switch" @click="_bindTogglePuase"
            ><span :class="['button', { pause: pauseRef }]"></span
          ></div>
          <div class="control-btn next" @click="_bindNextSong"><span class="button"></span></div>
        </div>
        <div class="time">{{ currentTimestampRef }}/{{ totalTimestamp }}</div>
      </div>
      <div class="progress">
        <div class="bar" :style="{ width: `${currentTimeRef}%` }"></div>
        <!-- <div class="dot" :style="{ left: `${currentTimeRef}%` }"></div> -->
      </div>
    </div>

    <!-- <audio :src="music?.mp3url" controls id="music"></audio> -->
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, computed, watchEffect, onMounted, unref } from 'vue';
  const playList = ref<any[]>([]);
  const music = ref();
  const currentIndex = ref(-1);
  const likeRef = ref(false);
  const pauseRef = ref(true);
  const singleRef = ref(true);
  const durationRef = ref(0);
  const currentTimeRef = ref(0);
  const currentTimestampRef = ref('00:00');
  const volumeRef = ref(0.3);
  let audio = new Audio();
  let timer = 0,
    volX = 0,
    currentVol = 0;

  // #region  音频相关
  // 更多开发细节请参考 https://blog.csdn.net/qq_47703624/article/details/107556369
  // 初始化音量
  audio.volume = volumeRef.value;
  // 初始化循环播放状态
  audio.loop = true;
  audio.addEventListener('canplaythrough', (event) => {
    /* the audio is now playable; play it if permissions allow */
    durationRef.value = audio?.duration ?? 0;
    // 自动播放
    pauseRef.value = false;
  });
  audio.addEventListener('ended', (event) => {
    if (!singleRef.value) {
      pauseRef.value = true;
      _bindNextSong();
    }
  });
  audio.addEventListener('play', (event) => {
    _getCurrentTime();
  });
  audio.addEventListener('pause', (event) => {
    console.log('pause');
    if (timer) {
      clearInterval(timer);
    }
  });
  audio.addEventListener('error', (event) => {
    pauseRef.value = true;
  });
  // #endregion

  // #region 私有方法

  const _getCurrentTime = () => {
    timer = setInterval(() => {
      const persent = audio.currentTime / durationRef.value;
      currentTimeRef.value = Math.floor(persent * 100);
      currentTimestampRef.value = _formatTimestamp(audio.currentTime);
      if (persent >= 1) {
        clearInterval(timer);
      }
    }, 1000);
  };
  const _formatTimestamp = (seconds: number): string => {
    return seconds > 0
      ? `${Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}:${Math.ceil(seconds % 60)
          .toString()
          .padStart(2, '0')}`
      : '00:00';
  };

  const _resetPlayer = () => {
    clearInterval(timer);
    currentTimestampRef.value = '00:00';
    currentTimeRef.value = 0;
    pauseRef.value = true;
  };
  const _setMusic = (index: number) => {
    currentIndex.value = index;
    music.value = playList.value[index];
    audio.src = music.value.mp3url;
    audio.load();
  };
  // #endregion

  // #region Vue API
  onMounted(() => {
    _getMusic();
  });
  const totalTimestamp = computed(() => {
    return _formatTimestamp(durationRef.value);
  });
  // 控制音量
  watch(volumeRef, (val) => {
    audio.volume = val;
  });
  // 控制播放状态
  watchEffect(
    () => {
      if (pauseRef.value) {
        audio?.pause();
      } else {
        audio?.play().catch((err) => {
          pauseRef.value = true;
          throw err;
        });
      }
    },
    { flush: 'post' }
  );
  // #endregion

  // #region 接口
  /**
   * 获取网易云音乐热歌榜
   * @param flag 上一曲/下一曲标志 -1:上一曲 1:下一曲
   */
  const _getMusic = (flag = 1) => {
    fetch('https://api.vvhan.com/api/rand.music?type=json&sort=热歌榜')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          music.value = data.info;
          if (data.info.mp3url.endsWith('\.mp3')) {
            audio.src = data.info.mp3url;
            if (flag > -0) {
              playList.value.push(data.info);
              currentIndex.value += 1;
            } else {
              playList.value.unshift(data.info);
            }
          } else {
            _getMusic(1);
          }
        }
      })
      .catch(console.error);
  };
  // #endregion

  // #region 交互
  const _bindToggleLike = () => {
    // TODO: 暂时取消收藏功能
    likeRef.value = !likeRef.value;
  };
  const _bindTogglePuase = () => {
    pauseRef.value = !pauseRef.value;
  };
  const _bindToggleChangeSingleMode = () => {
    singleRef.value = !singleRef.value;
    audio.loop = singleRef.value;
  };

  const _bindChangeVolume = (event: MouseEvent) => {
    switch (event.type) {
      case 'mousedown':
        volX = event.clientX;
        currentVol = unref(volumeRef);
        document.body.addEventListener('mousemove', _bindChangeVolume);
        document.body.addEventListener('mouseup', _bindChangeVolume);
        break;
      case 'mousemove':
        // 计算鼠标移动距离
        let distanceX = event.clientX - volX;
        // 获取音量条宽度
        const boxWidth = document.getElementById('volume-box')?.offsetWidth || 1;
        console.log(distanceX);
        // 计算音量百分比
        let percent = distanceX / boxWidth;
        // 判断音量是否超出范围
        if (currentVol + percent > 1) {
          percent = 1 - currentVol;
        } else if (currentVol + percent <= 0) {
          percent = -currentVol;
        }
        // 更新音量
        volumeRef.value = currentVol + percent;
        break;
      case 'mouseup':
        document.body.removeEventListener('mousemove', _bindChangeVolume); // 移除鼠标移动事件监听器
        break;
    }
  };
  const _bindPrevSong = () => {
    // 重置播放器状态
    _resetPlayer();
    if (currentIndex.value == 0) {
      _getMusic(-1);
    } else {
      _setMusic(currentIndex.value - 1);
    }
  };
  const _bindNextSong = () => {
    //  重置播放器状态
    _resetPlayer();
    if (currentIndex.value == playList.value.length - 1) {
      _getMusic(1);
    } else {
      _setMusic(currentIndex.value + 1);
    }
  };
  // #endregion
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
    --music-bg: linear-gradient(145deg, #f3feff, #ccd5de);
    --music-bg2: linear-gradient(170deg, rgb(255, 255, 255), #ccd5de 60%);
    --music-shadow: -6px -6px 20px 0px #fff, 4px 4px 20px 0px #6f8cb0;
    --music-shadow-small: -3px -3px 10px 0px #fff, 2px 2px 10px 0px #6f8cb0;
    --music-like-position: -67px -69px;
    --music-volume-bg: #a5aebd;
    --music-progress-shadow-inset: -6px -6px 20px 0px #fff inset, 4px 4px 20px 0px #6f8cb0 inset;

    display: flex;
    align-items: center;
    position: sticky;
    top: 63px;
    z-index: 15;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 16px;
    background-image: var(--music-bg), var(--music-bg2);
    .media {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      margin: 0 auto;
      width: 80px;
      height: 80px;
      background: url('https://s1.ax1x.com/2023/04/13/ppxDD2D.png');
      background-size: 100%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        &.play {
          animation: spin 20s linear infinite;
        }
      }
      .media-btn {
        position: absolute;
        display: none;
        width: 34px;
        height: 34px;
        background: url('https://s1.ax1x.com/2023/04/17/p9CjHaD.png');
        background-position: 0 0;
        cursor: pointer;
        &.play {
          background-position: -68px 0;
        }
      }
    }
    .info {
      margin-left: 16px;
      width: 160px;
      font-family: 'LXGWWenKai';
      .name {
        font-size: 18px;
      }
      .auther {
        color: #666;
        font-size: 12px;
      }
      .volume-wrap {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .volume-text {
          margin-left: 8px;
        }
      }
      .volume {
        position: relative;
        width: 100px;
        height: 8px;
        border-radius: 8px;
        background-color: var(--music-volume-bg);
        .bar {
          height: 100%;
          border-radius: 8px;
          background-color: var(--vp-c-brand);
        }
        .dot {
          position: absolute;
          top: -6px;
          left: 0;
          width: 19px;
          height: 19px;
          transform: translateX(-50%);
          cursor: pointer;
          user-select: none;
          border-radius: 20px;
          border: 1px solid var(--vp-c-brand);
          background: #fff;
        }
      }
    }
    .music-btn-group {
      margin-left: 36px;
      flex: 1;
    }
    .tools {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button {
        display: block;
        width: 34px;
        height: 34px;
        cursor: pointer;
        background: url('/music-button-group.png');
        background-size: 238px 170px;
      }
      .music-btn {
        display: flex;
        .button {
          margin-right: 16px;
          width: 24px;
          height: 24px;
          background-size: 168px 120px;
          &.like {
            background-position: var(--music-like-position);
            &.active {
              background-position: -133px -69px;
            }
          }
          &.mode {
            background-position: 0px 24px;
            &.single {
              background-position: -48px 24px;
            }
          }
        }
      }
    }
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
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
        .button {
          width: 34px;
          height: 34px;
          background-size: 238px 170px;
          background-position: -66px 0;
          &.pause {
            background-position: 1px 0;
          }
        }
      }
      .prev {
        .button {
          background-position: -89px 5px;
          background-size: 168px 120px;
        }
      }
      .next {
        .button {
          background-position: -135px 5px;
          background-size: 168px 120px;
        }
      }
    }
    .progress {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 8px;
      padding: 0 4px;
      width: 100%;
      height: 24px;
      border: 1px solid transparent;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      border-radius: 24px;
      background-image: var(--music-bg),
        linear-gradient(179deg, rgba(255, 255, 255, 0.3), transparent 60%);
      box-shadow: var(--music-shadow-small), var(--music-progress-shadow-inset);
      .bar {
        height: 12px;
        border-radius: 8px;
        background: var(--vp-c-brand);
      }
      .dot {
        @include box-center;
        position: absolute;
        left: 0;
        width: 36px;
        height: 36px;
        transform: translateX(-18px);
        transition: left 0.5s linear;
        user-select: none;
        border-radius: 36px;
        border: 1px solid transparent;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        border-radius: 36px;
        background-image: var(--music-bg),
          linear-gradient(179deg, rgba(255, 255, 255, 0.3), transparent 60%);
        box-shadow: var(--music-shadow-small), var(--music-progress-shadow-inset);
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
    --music-bg2: linear-gradient(170deg, rgba(255, 255, 255, 0.3), transparent 60%);
    --music-like-position: 0px -69px;
    --music-volume-bg: #1f1f23;
    --music-progress-shadow-inset: -6px -6px 20px 0px #3c3c43 inset, 4px 4px 20px 0px #0f0f11 inset;
  }
  @media (width <= 1080px) {
    // .music-box {
    //   display: block;
    //   .media {
    //     margin-bottom: 16px;
    //     width: 160px;
    //     height: 160px;
    //     img {
    //       width: 100px;
    //       height: 100px;
    //     }
    //   }
    //   .info {
    //     margin: 0;
    //     width: 100%;
    //     text-align: center;
    //     .volume-wrap {
    //       justify-content: center;
    //     }
    //   }
    //   .music-btn-group {
    //     margin: 0;
    //     margin-top: 16px;
    //   }
    // }
    .music-box {
      position: fixed;
      right: 12px;
      top: 120px;
      padding: 8px;
      height: 76px;
      z-index: 5;
      .media {
        width: 60px;
        height: 60px;
        img {
          width: 40px;
          height: 40px;
        }
        .media-btn {
          display: block;
        }
      }
      .info {
        display: none;
      }
      .music-btn-group {
        display: none;
      }
    }
  }
</style>
