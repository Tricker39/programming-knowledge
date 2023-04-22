<template>
  <div class="weather-wrap">
    <div class="left">
      <div class="top">{{ weather?.city }}</div>
      <div class="mid"
        >{{ weather?.type }} <span class="wind">{{ weather?.wind }}</span></div
      >
      <div class="bottom">{{ weather?.date }}</div>
    </div>
    <div class="right">
      <div class="top" :style="{ backgroundImage: `url(${weather?.icon})` }"> </div>
      <div class="bottom">{{ weather?.temperature }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import WeatherJson from './weather.json';
  interface IWeather {
    icon?: string;
    city: string;
    date: string;
    type: string;
    wind: string;
    temperature: string;
  }
  const weather = ref<IWeather>();

  // #region 接口
  /**
   * 获取网易云音乐热歌榜
   * @param flag 上一曲/下一曲标志 -1:上一曲 1:下一曲
   */
  const _getWeather = () => {
    fetch('https://api.vvhan.com/api/weather')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          weather.value = {
            icon: WeatherJson[data.info.type],
            city: data.city,
            date: `${data.info.date} ${data.info.week}`,
            type: data.info.type,
            wind: `${data.info.fengxiang} ${data.info.fengli}`,
            temperature: `${data.info.low} ~ ${data.info.high}`,
          };
        }
      })
      .catch(console.error);
  };
  // #endregion

  // #region Vue API
  onMounted(() => {
    _getWeather();
  });
  // #endregion
</script>
<style lang="scss" scoped>
  .weather-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px;
    color: #fff;
    line-height: 12px;
    font-size: 12px;
    border-radius: 4px;
    background: var(--vp-c-brand);
    .left {
      flex: 1;
      .mid {
        margin: 8px 0;
        font-size: 24px;
        line-height: 24px;
        .wind {
          margin-left: 8px;
          font-size: 12px;
        }
      }
    }
    .right {
      .top {
        margin: 0 auto;
        height: 56px;
        width: 56px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  .dark {
    .weather-wrap {
      background: var(--vp-c-green-dimm-3);
    }
  }
</style>
