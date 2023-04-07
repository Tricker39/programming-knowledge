<template>
  <div class="img-box" v-if="visibleRef">
    <div class="media-modal" id="image-preview-container">
      <div class="modal-mask" @click="_bindToggleVisible"></div>
      <div class="tools">
        <div class="tools-wrap">
          <svg
            class="item"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
              fill="none"
              stroke="#fff"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M15 21L27 21"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M33.2216 33.2217L41.7069 41.707"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            class="item"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
              fill="none"
              stroke="#fff"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              d="M21 15L21 27"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.0156 21.0156L27 21"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M33.2216 33.2217L41.7069 41.707"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            class="item"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="_bindResetMultiple"
          >
            <path
              d="M42 7H6C4.89543 7 4 7.89543 4 9V39C4 40.1046 4.89543 41 6 41H42C43.1046 41 44 40.1046 44 39V9C44 7.89543 43.1046 7 42 7Z"
              fill="none"
              stroke="#fff"
              stroke-width="4"
            />
            <path
              d="M12 20.5799L16 18V30"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M31 20.5799L35 18V30"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M24 20V21" stroke="#fff" stroke-width="4" stroke-linecap="round" />
            <path d="M24 27V28" stroke="#fff" stroke-width="4" stroke-linecap="round" />
          </svg>
          <svg
            class="item"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34 6.67564C39.978 10.1337 44 16.5972 44 24M34 6.67564V14M34 6.67564H41.3244M41.3244 34C37.8663 39.978 31.4028 44 24 44M41.3244 34H34M41.3244 34V41.3244M14 41.3244C8.02199 37.8663 4 31.4028 4 24M14 41.3244V34M14 41.3244H6.67564M6.67564 14C10.1337 8.02199 16.5972 4 24 4M6.67564 14H14M6.67564 14V6.67564"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M41.3244 34C37.8663 39.978 31.4028 44 24 44M41.3244 34H34M41.3244 34V41.3244"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 41.3244C8.02199 37.8663 4 31.4028 4 24M14 41.3244V34M14 41.3244H6.67564"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.67578 14C10.1339 8.02199 16.5973 4 24.0001 4M6.67578 14H14.0001M6.67578 14V6.67564"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M34 6.67578C39.978 10.1339 44 16.5973 44 24.0001M34 6.67578V14.0001M34 6.67578H41.3244"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            class="item"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6.67578C8.02198 10.1339 4 16.5973 4 24.0001M14 6.67578V14.0001M14 6.67578H6.67564"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.67564 34C10.1337 39.978 16.5972 44 24 44M6.67564 34H14M6.67564 34V41.3244"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M34 41.3244C39.978 37.8663 44 31.4028 44 24M34 41.3244V34M34 41.3244H41.3244"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M41.3242 14C37.8661 8.02199 31.4027 4 23.9999 4M41.3242 14H33.9999M41.3242 14V6.67564"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            class="item"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="_bindToggleVisible"
          >
            <path
              d="M8 8L40 40"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 40L40 8"
              stroke="#ffffff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="modal-box">
        <img
          class="media"
          :src="previewImageInfo.image?.src"
          :alt="previewImageInfo.image?.alt"
          :style="{ transform: `scale(${multiple})` }"
        />
      </div>
      <div class="indicator">
        <div class="indicator-wrap">
          <div
            :class="['item', { active: index == previewImageInfo.current }]"
            :style="{ backgroundImage: `url(${item.src})` }"
            v-for="(item, index) in previewImageInfo.list"
            @click="_bindChangeImage(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, watch, onMounted, onUnmounted, nextTick } from 'vue';

  const visibleRef = ref<boolean>(false);
  const multiple = ref<number>(1);
  const previewImageInfo = reactive<{
    image: HTMLImageElement | null;
    list: HTMLImageElement[];
    current: number;
  }>({
    image: null,
    list: [],
    current: 0,
  });

  // #region 事件处理
  const _bindToggleVisible = () => {
    visibleRef.value = !visibleRef.value;
  };
  const _bindChangeImage = (index) => {
    multiple.value = 1;
    previewImageInfo.image = previewImageInfo.list[index];
    previewImageInfo.current = index;
  };
  const _bindResetMultiple = () => {
    multiple.value = 1;
  };
  const _bindWheelScroll = (event) => {
    event.preventDefault();
    if (event.wheelDelta > 0 && multiple.value < 5) {
      multiple.value += 0.1;
    } else if (event.wheelDelta < 0 && multiple.value > 0.5) {
      multiple.value -= 0.1;
    }
  };
  const previewImage = (e: Event) => {
    if (visibleRef.value) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      visibleRef.value = true;
      const currentTarget = e.currentTarget as HTMLElement;
      const imgs = currentTarget.querySelectorAll<HTMLImageElement>('.content-container .main img');
      const index = Array.from(imgs).findIndex((el) => el === target);
      previewImageInfo.image = target as HTMLImageElement;
      previewImageInfo.list = Array.from(imgs);
      previewImageInfo.current = index;
    }
  };
  // #endregion

  watch(visibleRef, async (val) => {
    await nextTick();
    let _dom = document.getElementById('image-preview-container');
    if (val) {
      console.log('显示');
      _dom?.addEventListener('mousewheel', _bindWheelScroll);
      // 火狐浏览器没有onmousewheel事件，用DOMMouseScroll代替(滚轮事件)
      document.body.addEventListener('DOMMouseScroll', _bindWheelScroll);
      // 禁止火狐浏览器下拖拽图片的默认事件
      document.ondragstart = function () {
        return false;
      };
    } else {
      console.log('不显示');
      _dom?.removeEventListener('mousewheel', _bindWheelScroll);
      // 移除火狐浏览器下的鼠标滚动事件
      document.body.removeEventListener('DOMMouseScroll', _bindWheelScroll);
      //恢复火狐及Safari浏览器下的图片拖拽
      document.ondragstart = null;
    }
  });

  // #region 生命周期
  onMounted(() => {
    const docDomContainer = document.querySelector('#VPContent');
    docDomContainer?.addEventListener('click', previewImage);
  });
  onUnmounted(() => {
    const docDomContainer = document.querySelector('#VPContent');
    docDomContainer?.removeEventListener('click', previewImage);
  });
  // #endregion
</script>
<style lang="scss" scoped>
  :root {
    --mask-bg: rgba(255, 255, 255, 0.4);
  }
  .dark {
    --mask-bg: rgba(0, 0, 0, 0.4);
  }
  .img-box {
    width: 100%;
  }
  .media-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    .modal-mask {
      position: fixed;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      background: var(--mask-bg);
    }
    .modal-box {
      position: absolute;
      width: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .media {
        max-width: 100%;
      }
    }
    .tools {
      position: absolute;
      top: 20px;
      display: flex;
      justify-content: center;
      width: 100%;
      z-index: 2;
      .tools-wrap {
        display: flex;
        padding: 20px 16px;
        border-radius: 50px;
        background: rgba(0, 0, 0, 0.5);
        font-size: 20px;
        .item {
          margin: 0 16px;
          cursor: pointer;
        }
      }
    }
    .indicator {
      position: absolute;
      bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .indicator-wrap {
        display: flex;
        padding: 20px 16px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        .item {
          margin: 0 16px;
          width: 60px;
          height: 30px;
          transition: transform 0.3s;
          cursor: pointer;
          border-radius: 4px;
          background-size: cover;
          background-position: center;
          &.active,
          &:hover {
            transform: scale(1.3);
            border: 2px solid #fff;
          }
        }
      }
    }
  }
</style>
