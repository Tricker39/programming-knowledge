<template>
  <div class="img-box" v-if="visibleRef">
    <div
      class="media-modal"
      id="image-preview-container"
      ref="containerEl"
      @mouseup="_bindMouseEvent"
    >
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
            @click="_changeMultipleValue(-0.1)"
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
            @click="_changeMultipleValue(0.1)"
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
            @click="_bindResetImage"
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
            class="item animate-rotate-reverse"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="_changeAngle(-90)"
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
            class="item animate-rotate"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="_changeAngle(90)"
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
            class="item animate-rotate"
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
      <div
        class="modal-box"
        :style="{
          width: `${imgWidth}px`,
          height: `${imgHeight}px`,
          transform: `translate(-50%,-50%) scale(${multipleRef}) rotate(${angleRef}deg)`,
          marginTop: `${moveYRef}px`,
          marginLeft: `${moveXRef}px`,
        }"
        @mousedown="_bindMouseEvent"
      >
        <img class="media" :src="previewImageInfo.image?.src" :alt="previewImageInfo.image?.alt" />
      </div>
      <div class="indicator" v-if="previewImageInfo.list.length > 1">
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
  import { ref, reactive, unref, watch, onMounted, onUnmounted, nextTick } from 'vue';

  const visibleRef = ref<boolean>(false);
  const multipleRef = ref<number>(1);
  const angleRef = ref<number>(0);
  const moveXRef = ref<number>(0);
  const moveYRef = ref<number>(0);
  const clientXRef = ref<number>(0);
  const clientYRef = ref<number>(0);
  const containerEl = ref<HTMLDivElement | null>(null);
  const imgWidth = ref<number>(0);
  const imgHeight = ref<number>(0);
  let originX = 0,
    originY = 0;

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
  /**
   * 修改图片缩放比例
   * @param value 缩放比例
   */
  const _changeMultipleValue = (value) => {
    if ((value > 0 && multipleRef.value >= 5) || (value < 0 && multipleRef.value <= 0.5)) {
      return;
    }
    multipleRef.value += value;
  };
  /**
   * 旋转图片
   * @param angle 旋转角度
   */
  const _changeAngle = (angle) => {
    angleRef.value += angle;
  };

  const _getImageSize = (url: string): void => {
    let image = new Image();
    image.src = url;
    image.onload = function () {
      if (image.width > window.innerWidth) {
        imgWidth.value = Math.round(window.innerWidth * 0.9);
        imgHeight.value = Math.round((image.height * window.innerWidth * 0.9) / image.width);
        return;
      }
      if (image.height > window.innerHeight) {
        imgWidth.value = Math.round((image.width * window.innerHeight * 0.9) / window.innerWidth);
        imgHeight.value = Math.round(window.innerHeight * 0.9);
        return;
      }
      imgWidth.value = image.width;
      imgHeight.value = image.height;
      return;
    };
    image.onerror = function (error) {
      console.log(error);
    };
  };
  const _bindToggleVisible = () => {
    visibleRef.value = !visibleRef.value;
  };
  const _bindChangeImage = async (index) => {
    multipleRef.value = 1;
    await _getImageSize(previewImageInfo.list[index].src);
    previewImageInfo.image = previewImageInfo.list[index];
    previewImageInfo.current = index;
  };
  const _bindResetImage = () => {
    multipleRef.value = 1;
    moveXRef.value = 0;
    moveYRef.value = 0;
    angleRef.value = 0;
    originX = originY = 0;
  };
  /**
   * 鼠标滚轮处理
   * @param event
   */
  const _bindWheelScroll = (event) => {
    event.preventDefault();
    if (event.wheelDelta > 0) {
      _changeMultipleValue(0.1);
    } else if (event.wheelDelta < 0) {
      _changeMultipleValue(-0.1);
    }
  };
  const previewImage = async (e: Event) => {
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
      await _getImageSize((target as HTMLImageElement).src);
    }
  };

  const _bindMouseEvent = (e: MouseEvent) => {
    switch (e.type) {
      case 'mousedown':
        clientXRef.value = e.clientX;
        clientYRef.value = e.clientY;
        containerEl.value?.addEventListener('mousemove', _bindMouseEvent);
        break;
      case 'mousemove':
        let distanceX = e.clientX - clientXRef.value;
        let distanceY = e.clientY - clientYRef.value;
        moveXRef.value = originX + distanceX;
        moveYRef.value = originY + distanceY;
        break;
      case 'mouseup':
        containerEl.value?.removeEventListener('mousemove', _bindMouseEvent);
        originX = unref(moveXRef);
        originY = unref(moveYRef);
        break;
    }
  };
  // #endregion

  // #region 生命周期
  onMounted(() => {
    const docDomContainer = document.querySelector('#VPContent');
    docDomContainer?.addEventListener('click', previewImage);
  });
  onUnmounted(() => {
    const docDomContainer = document.querySelector('#VPContent');
    docDomContainer?.removeEventListener('click', previewImage);
  });
  watch(visibleRef, async (val) => {
    // 将图片重置
    _bindResetImage();
    await nextTick();
    let _dom = document.getElementById('image-preview-container');
    if (val) {
      console.log('显示');
      _dom?.addEventListener('mousewheel', _bindWheelScroll);
      // 火狐浏览器没有onmousewheel事件，用DOMMouseScroll代替(滚轮事件)
      document.body.addEventListener('DOMMouseScroll', _bindWheelScroll);
      //  禁止火狐浏览器下拖拽图片的默认事件
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
    user-select: none;
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
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: grab;
      &:active {
        cursor: grabbing;
      }
      .media {
        position: relative;
        max-width: 100%;
        max-height: 100%;
        cursor: grab;
        &:active {
          cursor: grabbing;
        }
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
          transition: transform 0.5s;
          &.animate-rotate:hover {
            transform: rotate(180deg);
          }
          &.animate-rotate-reverse:hover {
            transform: rotate(-180deg);
          }
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
